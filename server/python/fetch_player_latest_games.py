import json
import sys
import time
from nba_api.stats.endpoints import playergamelog

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No player_id provided"}))
        return

    try:
       player_id = int(sys.argv[1])
    except ValueError:
        print(json.dumps({"error": f"Invalid player_id: {sys.argv[1]}"}))
        return
    season = "2025-26"

    try:
      gamelog = playergamelog.PlayerGameLog(
          player_id=player_id,
          season=season,
          season_type_all_star="Regular Season"
      )

      data = gamelog.get_dict()
      time.sleep(1.0)


      result_sets = data["resultSets"]

      headers = result_sets[0]["headers"]
      rows = result_sets[0]["rowSet"]

      games = [dict(zip(headers, row, strict=True)) for row in rows[:10]]

      games_short_keys = ['AST', 'FG3A', 'FG3M', 'GAME_DATE', 'Game_ID', 'MATCHUP', 'MIN', 'PTS', 'Player_ID', 'REB', 'SEASON_ID', 'WL']
      games_short = [
            {k: g[k] for k in games_short_keys if k in g}
            for g in games
        ]

      result = {
            "player_latest": games,
            "player_latest_short": games_short
        }

      print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()