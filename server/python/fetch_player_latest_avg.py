import json
import sys
import time
from nba_api.stats.endpoints import playerdashboardbygamesplits

# Increase delay to 2 seconds
API_DELAY = 1.0


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
        def get_overall_stats(dashboard_data) -> dict:
            result_sets = dashboard_data["resultSets"]
            for rs in result_sets:
                if rs["name"] == "OverallPlayerDashboard" and rs["rowSet"]:
                    headers = rs["headers"]
                    row = rs["rowSet"][0]
                    return dict(zip(headers, row, strict=True))
            return {}

        print(f"DEBUG: Requesting player {player_id}, season {season}", file=sys.stderr)

        # 1. Full season average
        season_dashboard = playerdashboardbygamesplits.PlayerDashboardByGameSplits(
            player_id=player_id,
            season=season,
            per_mode_detailed="PerGame",
            season_type_playoffs="Regular Season"
        )
        season_data = season_dashboard.get_dict()
        season_avg = get_overall_stats(season_data)
        print(f"DEBUG: SEASON_AVG: {season_avg}", file=sys.stderr)

        time.sleep(API_DELAY)  # Increased to 2.0

        # 2. Last 10 games average
        # last_10_dashboard = playerdashboardbygamesplits.PlayerDashboardByGameSplits(
        #     player_id=player_id,
        #     season=season,
        #     per_mode_detailed="PerGame",
        #     season_type_playoffs="Regular Season",
        #     last_n_games=10
        # )
        # last_10_data = last_10_dashboard.get_dict()
        # last_10_avg = get_overall_stats(last_10_data)
        # print(f"DEBUG: LAST_10_AVG: {last_10_avg}", file=sys.stderr)

        # time.sleep(API_DELAY)  # Increased to 2.0

        # 3. Last 5 games average
        # last_5_dashboard = playerdashboardbygamesplits.PlayerDashboardByGameSplits(
        #     player_id=player_id,
        #     season=season,
        #     per_mode_detailed="PerGame",
        #     season_type_playoffs="Regular Season",
        #     last_n_games=5
        # )
        # last_5_data = last_5_dashboard.get_dict()
        # last_5_avg = get_overall_stats(last_5_data)
        # print(f"DEBUG: LAST_5_AVG: {last_5_avg}", file=sys.stderr)

        result = {
            "season_avg": season_avg,
            # "last_10_avg": last_10_avg,
            # "last_5_avg": last_5_avg
        }

        print(json.dumps(result))

    except Exception as e:
        print(f"DEBUG: Exception: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        print(json.dumps({"error": str(e)}))


if __name__ == "__main__":
    main()
