export interface MatchupEntry {
  assists: number;
  champ: string;
  champ_level: number;
  cs: number;
  damage_dealt_to_objectives: number;
  damage_taken: number;
  deaths: number;
  first_blood_assist: boolean;
  first_blood_kill: boolean;
  gold_earned: number;
  heal: number;
  items: number[];
  jungle_minions_killed: number;
  killing_spree_streak: number;
  kills: number;
  overall_damage: number;
  performance_rank: number;
  performance_score: number;
  quadra_kills: number;
  result: string;
  role: string;
  sight_wards_bought: number;
  summoner: string;
  timeline: { participantId: number; lane: string; role: string };
  total_champ_damage: number;
  total_damage_taken: number;
  triple_kills: number;
  turret_kills: number;
  unreal_kills: number;
  vision: number;
  vision_wards_bought: number;
  wards_killed: number;
  win: boolean;
}

export type Matchup = [MatchupEntry, MatchupEntry];
export interface GameMatchups {
  BOTTOM: Matchup;
  JUNGLE: Matchup;
  MIDDLE: Matchup;
  TOP: Matchup;
  SUPPORT: Matchup;
}

export interface Match {
  winning_team_color: string;
  date: string;
  game_duration: string;
  performance_scores: { [summoner: string]: { score: number; rank: number } };
  matchups: GameMatchups;
}
