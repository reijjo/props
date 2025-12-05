export type NbaToday = {
  id: string;
  uid: string;
  date: string;
  competitions: NbaMatch[];
};

export type NbaMatch = {
  id: string;
  uid: string;
  date: string;
  competitors: NbaMatchTeam[];
  status: NbaMatchStatus;
  odds: NbaMatchOdds[];
};

export type NbaMatchTeam = {
  id: string;
  uid: string;
  homeAway: string;
  team: NbaMatchTeamDetails;
  score: string;
  records: NbaMatchTeamRecord[];
};

export type NbaMatchTeamDetails = {
  location: string;
  name: string;
  abbreviation: string;
  logo: string;
};

export type NbaMatchTeamRecord = {
  name: string;
  abbreviation?: string;
  type: string;
  summary: string;
};

export type NbaMatchStatus = {
  clock: number;
  displayClock: string;
  period: number;
  type: NbaMatchStatusType;
};

export type NbaMatchStatusType = {
  type: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
};

export type NbaMatchOdds = {
  details: string;
  overUnder: number;
};
