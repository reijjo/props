import json
from nba_api.stats.static import teams

all_teams = teams.get_teams()
print(json.dumps({"teams": all_teams}))