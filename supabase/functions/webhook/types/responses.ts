export type APIResponse<M> = {
  success: boolean;
  data: M;
  notifications: string[];
};

export type ScoreTaskResponse = {
  delta: number;
  _tmp: Record<string, string | number>;
  hp: number;
  mp: number;
  exp: number;
  gp: number;
  lvl: number;
  class: string;
  points: null;
  str: number;
  con: number;
  int: number;
  per: number;
  buffs: {
    str: number;
    con: number;
    int: number;
    per: number;
    stealth: number;
    streaks: boolean;
    snowball: boolean;
    spookySparkles: boolean;
    shinySeed: boolean;
    seafoam: boolean;
  };
  training: {
    str: number;
    con: number;
    int: number;
    per: number;
  };
};
