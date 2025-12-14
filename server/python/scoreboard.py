import json
from nba_api.live.nba.endpoints import scoreboard

def main():
		games = scoreboard.ScoreBoard().games.get_dict()
		print(json.dumps({"games": games}))


if __name__ == "__main__":
    main()