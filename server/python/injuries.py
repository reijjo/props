import nbainjuries.injury as inj
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from nbainjuries._exceptions import URLRetrievalError
import json
import sys
import urllib.request
import urllib.error
import socket
import tempfile
import shutil
import os
import threading
import http.server
import atexit

# SET GLOBAL SOCKET TIMEOUT - this affects all urllib requests
socket.setdefaulttimeout(30)  # 30 seconds timeout for all network operations

ET = ZoneInfo("America/New_York")


HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://www.nba.com/",
    "Accept": "application/pdf",
}


def gen_url_with_minutes(ts: datetime) -> str:
    # ts from floor_to_15 is already naive ET.
    # If it has timezone info, convert to ET. If not, assume it is ET.
    if ts.tzinfo is not None:
        ts = ts.astimezone(ET)

    # Ensure naive for strftime to avoid confusion (and match nbainjuries expectations if any)
    ts = ts.replace(tzinfo=None, second=0, microsecond=0)

    # IMPORTANT: minutes always included -> 07_00AM, 07_45AM, 06_15PM, etc.
    stamp = ts.strftime("%Y-%m-%d_%I_%M%p")
    return f"https://ak-static.cms.nba.com/referee/injury/Injury-Report_{stamp}.pdf"


inj.gen_url = gen_url_with_minutes


def floor_to_15(ts: datetime) -> datetime:
    ts = ts.astimezone(ET).replace(tzinfo=None, second=0, microsecond=0)
    return ts - timedelta(minutes=ts.minute % 15)


def url_exists(url: str, timeout: int = 5) -> bool:
    """Check if URL exists with a HEAD request"""
    try:
        req = urllib.request.Request(url, method='HEAD', headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.status == 200
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError):
        return False




# Global server reference to reuse
_SERVER = None
_SERVER_THREAD = None
_PORT = 0
_TEMP_DIR = tempfile.mkdtemp()

def cleanup_temp():
    shutil.rmtree(_TEMP_DIR, ignore_errors=True)

atexit.register(cleanup_temp)

def start_server():
    global _SERVER, _SERVER_THREAD, _PORT
    if _SERVER:
        return

    Handler = http.server.SimpleHTTPRequestHandler
    # Serve the temporary directory
    class ParamsHandler(Handler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=_TEMP_DIR, **kwargs)

        def log_message(self, format, *args):
            return # Squelch logs

    _SERVER = http.server.HTTPServer(('127.0.0.1', 0), ParamsHandler)
    _PORT = _SERVER.server_port
    _SERVER_THREAD = threading.Thread(target=_SERVER.serve_forever, daemon=True)
    _SERVER_THREAD.start()
    print(f"[DEBUG] Local server started on port {_PORT}", file=sys.stderr)

def download_report_local(url):
    # Download to our temp dir
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            filename = "report.pdf" # Fixed name, or dynamic if we want to run parallel (not needed here)
            path = os.path.join(_TEMP_DIR, filename)
            with open(path, 'wb') as f:
                shutil.copyfileobj(response, f)
            return filename
    except Exception as e:
        raise e

def latest_report(max_steps: int = 96):  # 24h back in 15-min steps
    ts = floor_to_15(datetime.now(ET))
    print(f"[DEBUG] Starting search from: {ts}", file=sys.stderr)

    for step in range(max_steps):
        url = gen_url_with_minutes(ts)
        print(f"[DEBUG] Step {step}/{max_steps}: Checking {url}", file=sys.stderr)

        # Quick check if URL exists before trying to download
        if not url_exists(url):
            print(f"[DEBUG] URL not found (HEAD request)", file=sys.stderr)
            ts -= timedelta(minutes=15)
            continue

        print(f"[DEBUG] URL exists! Attempting to download...", file=sys.stderr)
        try:
            start_server()
            filename = download_report_local(url)
            local_url = f"http://127.0.0.1:{_PORT}/{filename}"

            # Monkeypatch gen_url to return localhost URL
            inj.gen_url = lambda _: local_url

            result = inj.get_reportdata(ts, headerparam=HEADERS)
            print(f"[DEBUG] SUCCESS at step {step}", file=sys.stderr)
            return result
        except Exception as e:
            print(f"[DEBUG] Processing FAILED: {e}", file=sys.stderr)
            ts -= timedelta(minutes=15)

    print(f"[DEBUG] Exhausted all {max_steps} attempts", file=sys.stderr)
    raise RuntimeError("No report found in last 24h")


if __name__ == "__main__":
    try:
        # Redirect any unwanted prints from the library to stderr
        # so they don't pollute the JSON output
        import io
        import contextlib

        # Capture stdout during the library call
        f = io.StringIO()
        with contextlib.redirect_stdout(f):
            injuries = latest_report()

        # The validation message goes to the captured buffer, not our output
        # Now only print the JSON to stdout
        print(injuries)
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)