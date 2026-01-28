import json
from nba_api.stats.static import teams
import time

def main():
    all_teams = teams.get_teams()
    time.sleep(1.0)


    print(json.dumps({"teams": all_teams}))

if __name__ == "__main__":
    main()