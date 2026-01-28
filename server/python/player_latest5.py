#!/usr/bin/env python3
import json
import sys
from nba_api.stats.endpoints import playerdashboardbylastngames, playergamelog


def get_overall_stats(dashboard_data) -> dict | None:
    """Extract stats from GameNumberPlayerDashboard result set"""
    result_sets = dashboard_data.get("resultSets", [])
    for rs in result_sets:
        if rs.get("name") in ["GameNumberPlayerDashboard", "OverallPlayerDashboard"] and rs.get("rowSet"):
            headers = rs["headers"]
            if len(rs["rowSet"]) > 0:
                row = rs["rowSet"][0]
                return dict(zip(headers, row, strict=True))
    return None


def calculate_avg_from_games(games, headers, max_games=5):
    """Calculate averages from available games (fallback for players with < 5 games)"""
    if not games:
        return None

    # Take up to max_games
    recent_games = games[:min(len(games), max_games)]
    num_games = len(recent_games)

    # Map header names to indices
    idx_map = {header: i for i, header in enumerate(headers)}

    stats = {}
    stat_fields = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'TOV', 'FGM', 'FGA',
                   'FG3M', 'FG3A', 'FTM', 'FTA', 'OREB', 'DREB', 'PF', 'PLUS_MINUS', 'MIN']

    for field in stat_fields:
        if field in idx_map:
            idx = idx_map[field]
            total = sum(game[idx] or 0 for game in recent_games)
            stats[field] = round(total / num_games, 1)

    # Calculate percentages
    if stats.get('FGA', 0) > 0:
        stats['FG_PCT'] = round(stats['FGM'] / stats['FGA'], 3)
    else:
        stats['FG_PCT'] = 0.0

    if stats.get('FG3A', 0) > 0:
        stats['FG3_PCT'] = round(stats['FG3M'] / stats['FG3A'], 3)
    else:
        stats['FG3_PCT'] = 0.0

    if stats.get('FTA', 0) > 0:
        stats['FT_PCT'] = round(stats['FTM'] / stats['FTA'], 3)
    else:
        stats['FT_PCT'] = 0.0

    stats['GP'] = num_games
    stats['W'] = 0
    stats['L'] = 0

    return stats


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
        print(f"DEBUG: Requesting player {player_id}, season {season}", file=sys.stderr)

        # Try the optimized endpoint first
        try:
            last_5_dashboard = playerdashboardbylastngames.PlayerDashboardByLastNGames(
                player_id=player_id,
                season=season,
                per_mode_detailed="PerGame",
                season_type_playoffs="Regular Season",
                last_n_games=5
            )

            last_5_data = last_5_dashboard.get_dict()
            last_5_avg = get_overall_stats(last_5_data)

            if last_5_avg:
                print(f"DEBUG: LAST_5_AVG: Success - {len(last_5_avg)} fields", file=sys.stderr)
                result = {"last_5_avg": last_5_avg}
                print(json.dumps(result))
                return

        except Exception as e:
            print(f"DEBUG: PlayerDashboardByLastNGames failed: {e}, trying fallback", file=sys.stderr)

        # Fallback: Use game log for players with < 5 games
        print(f"DEBUG: Using game log fallback", file=sys.stderr)
        game_log = playergamelog.PlayerGameLog(
            player_id=player_id,
            season=season,
            season_type_all_star="Regular Season"
        )

        data = game_log.get_dict()
        result_sets = data["resultSets"][0]
        headers = result_sets["headers"]
        games = result_sets["rowSet"]

        if not games:
            print(f"DEBUG: No games found for player", file=sys.stderr)
            result = {"last_5_avg": None}
        else:
            num_games = len(games)
            print(f"DEBUG: Found {num_games} games, calculating average", file=sys.stderr)
            last_5_avg = calculate_avg_from_games(games, headers, max_games=5)
            result = {"last_5_avg": last_5_avg}

        print(json.dumps(result))

    except Exception as e:
        print(f"DEBUG: Exception: {type(e).__name__}: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        print(json.dumps({"error": str(e)}))


if __name__ == "__main__":
    main()
