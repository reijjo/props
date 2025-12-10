import json
from nba_api.stats.static import teams

def main():
    all_teams = teams.get_teams()
    print(json.dumps({"teams": all_teams}))

if __name__ == "__main__":
    main()