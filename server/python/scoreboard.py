import json
from nba_api.live.nba.endpoints import scoreboard
import time

def main():
		games = scoreboard.ScoreBoard().games.get_dict()

		time.sleep(1.0)

		print(json.dumps({"games": games}))


if __name__ == "__main__":
    main()