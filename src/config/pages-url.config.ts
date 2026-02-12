class GAME {
  private root = "/game";

  CREATE = `${this.root}/create`;
  PREPARE = `${this.root}/prepare`;
  ROUNDS = `${this.root}/rounds`;
  FINAL_ROUND = `${this.root}/final-round`;
  ENDING = `${this.root}/ending`;
}

export const GAME_ROUTES = new GAME();
