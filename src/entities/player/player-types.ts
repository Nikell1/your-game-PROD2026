export interface IKey {
  code: string;
  label: string;
}

export interface ISetupPlayer {
  name: string;
  color: string;
  key: IKey;
  avatar?: string;
}

export interface IActivePlayer extends ISetupPlayer {
  id: number;
  score: number;
}

export interface IFinalBet {
  playerId: number;
  bet: number;
}

export interface IFinalAnsweredPlayer {
  id: number;
  isCorrect: boolean;
  answer: string;
}
