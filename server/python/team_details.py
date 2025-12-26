import json
import sys
from nba_api.stats.endpoints import teamplayerdashboard

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No team_id provided"}))
        sys.exit(1)
        return

    team_id = int(sys.argv[1])
    season = "2025-26"
    try:
        dashboard = teamplayerdashboard.TeamPlayerDashboard(
            team_id=team_id,
            season=season
        ).get_dict()

        print(json.dumps(dashboard))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()