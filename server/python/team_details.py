#!/usr/bin/env python3
import json
import sys
from nba_api.stats.endpoints import teamplayerdashboard
import time

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No team_id provided"}))
        return

    try:
       team_id = int(sys.argv[1])
    except ValueError:
        print(json.dumps({"error": f"Invalid team_id: {sys.argv[1]}"}))
        return
    season = "2025-26"

    try:
        dashboard = teamplayerdashboard.TeamPlayerDashboard(
            team_id=team_id,
            season=season,
            per_mode_detailed="PerGame"
        ).get_dict()

        time.sleep(1.0)

        result_sets = dashboard["resultSets"]

        # Team stats (full)
        team_row = result_sets[0]["rowSet"][0]
        team_headers = result_sets[0]["headers"]
        team_stats = dict(zip(team_headers, team_row, strict=True))

        # Players (full)
        player_rows = result_sets[1]["rowSet"]
        player_headers = result_sets[1]["headers"]
        players = [dict(zip(player_headers, row, strict=True)) for row in player_rows]

        # Short players
        short_keys = ['PLAYER_ID', 'PLAYER_NAME', 'GP', 'MIN', 'PTS', 'REB', 'AST', 'FG3A', 'FG3M']
        players_short = [
            {k: p[k] for k in short_keys if k in p}
            for p in players
        ]

        # Short team
        team_short_keys = ['TEAM_ID', 'TEAM_NAME', 'GP', 'MIN', 'PTS', 'REB', 'AST', 'FG3A', 'FG3M']
        team_stats_short = {k: team_stats[k] for k in team_short_keys if k in team_stats}

        result = {
            "players": players,
            "players_short": players_short,
            "team_stats": team_stats,
            "team_stats_short": team_stats_short
        }

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()