#!/usr/bin/env python3
import json
import sys
from nba_api.stats.endpoints import teamplayerdashboard

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No team_id provided"}))
        return

    try:
        team_id = int(sys.argv[1])
    except ValueError:
        print(json.dumps({"error": "Invalid team_id"}))
        return

    season = "2025-26"

    try:
        dashboard = teamplayerdashboard.TeamPlayerDashboard(
            team_id=team_id,
            season=season,
            per_mode_detailed="PerGame"
        )

        raw = dashboard.get_dict()

        # Extract what you actually want
        result_sets = raw["resultSets"]

        # Overall team stats (first resultSet)
        team_stats = result_sets[0]["rowSet"][0] if result_sets[0]["rowSet"] else {}
        team_headers = result_sets[0]["headers"]

        # Players stats (second resultSet - usually "OverallPlayers")
        players = result_sets[1]["rowSet"]
        player_headers = result_sets[1]["headers"]

        # Build clean objects
        clean_team_stats = dict(zip(team_headers, team_stats, strict=True))

        clean_players = []
        for player_row in players:
            clean_players.append(dict(zip(player_headers, player_row, strict=True)))

        # Final clean response
        result = {
            "team_stats": clean_team_stats,
            "players": clean_players
        }

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()