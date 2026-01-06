import nbainjuries.injury as inj
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from nbainjuries._exceptions import URLRetrievalError

ET = ZoneInfo("America/New_York")

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://www.nba.com/",
    "Accept": "application/pdf",
}

def gen_url_with_minutes(ts: datetime) -> str:
    # nbainjuries compares naive datetimes internally, so pass naive ET wall-clock
    ts = ts.astimezone(ET).replace(tzinfo=None, second=0, microsecond=0)

    # IMPORTANT: minutes always included -> 07_00AM, 07_45AM, 06_15PM, etc.
    stamp = ts.strftime("%Y-%m-%d_%I_%M%p")
    return f"https://ak-static.cms.nba.com/referee/injury/Injury-Report_{stamp}.pdf"

inj.gen_url = gen_url_with_minutes

def floor_to_15(ts: datetime) -> datetime:
    ts = ts.astimezone(ET).replace(tzinfo=None, second=0, microsecond=0)
    return ts - timedelta(minutes=ts.minute % 15)

def latest_report(max_steps: int = 96):  # 24h back in 15-min steps
    ts = floor_to_15(datetime.now(ET))
    for _ in range(max_steps):
        try:
            return inj.get_reportdata(ts, headerparam=HEADERS)
        except URLRetrievalError:
            ts -= timedelta(minutes=15)
    raise RuntimeError("No report found in last 24h")

print(latest_report())
