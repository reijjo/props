import json
import sys
from nba_api.stats.endpoints import playerdashboardbygamesplits

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
        # Helper function to extract OverallPlayerDashboard
        def get_overall_stats(dashboard_data):
            result_sets = dashboard_data["resultSets"]
            for rs in result_sets:
                if rs["name"] == "OverallPlayerDashboard" and rs["rowSet"]:
                    headers = rs["headers"]
                    row = rs["rowSet"][0]
                    return dict(zip(headers, row, strict=True))
            return {}

        # 1. Full season average
        season_dashboard = playerdashboardbygamesplits.PlayerDashboardByGameSplits(
            player_id=player_id,
            season=season,
            per_mode_detailed="PerGame",
            season_type_playoffs="Regular Season"
            # No last_n_games = full season
        )
        season_avg = get_overall_stats(season_dashboard.get_dict())

        # 2. Last 10 games average
        last_10_dashboard = playerdashboardbygamesplits.PlayerDashboardByGameSplits(
            player_id=player_id,
            season=season,
            per_mode_detailed="PerGame",
            season_type_playoffs="Regular Season",
            last_n_games=10
        )
        last_10_avg = get_overall_stats(last_10_dashboard.get_dict())

        # 3. Last 5 games average
        last_5_dashboard = playerdashboardbygamesplits.PlayerDashboardByGameSplits(
            player_id=player_id,
            season=season,
            per_mode_detailed="PerGame",
            season_type_playoffs="Regular Season",
            last_n_games=5
        )
        last_5_avg = get_overall_stats(last_5_dashboard.get_dict())

        result = {
            "season_avg": season_avg,
            "last_10_avg": last_10_avg,
            "last_5_avg": last_5_avg
        }

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
