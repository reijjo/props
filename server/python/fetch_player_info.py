import json
import sys
from nba_api.stats.endpoints import commonplayerinfo

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No player_id provided"}))
        return

    try:
       player_id = int(sys.argv[1])
    except ValueError:
        print(json.dumps({"error": f"Invalid player_id: {sys.argv[1]}"}))
        return

    try:
        info_endpoint = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
        data = info_endpoint.get_dict()

        # The actual player header info is in resultSets[0]
        result_sets = data["resultSets"]
        common_player_info = result_sets[0]  # "CommonPlayerInfo"

        headers = common_player_info["headers"]
        row_set = common_player_info["rowSet"]

        if not row_set:
            print(json.dumps({"error": "Player not found"}))
            return

        row = row_set[0]

        info = dict(zip(headers, row, strict=True))

        print(json.dumps(info))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
