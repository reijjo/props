#!/usr/bin/env python3
import json
import sys
from nba_api.stats.endpoints import playergamelog


def calculate_season_avg(games, headers):
    """Calculate season averages from all game logs"""
    if not games:
        return None

    num_games = len(games)

    # Map header names to indices
    idx_map = {header: i for i, header in enumerate(headers)}

    stats = {}
    stat_fields = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'TOV', 'FGM', 'FGA',
                   'FG3M', 'FG3A', 'FTM', 'FTA', 'OREB', 'DREB', 'PF', 'PLUS_MINUS', 'MIN']

    for field in stat_fields:
        if field in idx_map:
            idx = idx_map[field]
            total = sum(game[idx] or 0 for game in games)
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

    # Count wins/losses from WL column
    if 'WL' in idx_map:
        wl_idx = idx_map['WL']
        wins = sum(1 for game in games if game[wl_idx] == 'W')
        losses = sum(1 for game in games if game[wl_idx] == 'L')
        stats['W'] = wins
        stats['L'] = losses
        stats['W_PCT'] = round(wins / num_games, 3) if num_games > 0 else 0.0

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

        # Use game log - much more reliable
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
            result = {"season_avg": None}
        else:
            print(f"DEBUG: Found {len(games)} games", file=sys.stderr)
            season_avg = calculate_season_avg(games, headers)
            print(f"DEBUG: Season avg calculated successfully", file=sys.stderr)
            result = {"season_avg": season_avg}

        print(json.dumps(result))

    except Exception as e:
        print(f"DEBUG: Exception: {type(e).__name__}: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        print(json.dumps({"error": str(e)}))


if __name__ == "__main__":
    main()
