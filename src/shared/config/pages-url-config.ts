class GAME {
  private root = "/game";

  SETUP = `${this.root}/setup`;
  ROUND_1 = `${this.root}/round/1`;
  ROUND_2 = `${this.root}/round/2`;
  FINAL_ROUND = `${this.root}/final-round`;
  ENDING = `${this.root}/ending`;

  QUESTION = (id: string) => `${this.root}/${id}`;
}

export const GAME_ROUTES = new GAME();
