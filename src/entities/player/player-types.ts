export interface IKey {
  code: string;
  label: string;
}

export interface ISetupPlayer {
  name: string;
  color: string;
  key: IKey;
  customSettings?: string; // изменить
}

export interface IActivePlayer extends ISetupPlayer {
  id: number;
  score: number;
}
