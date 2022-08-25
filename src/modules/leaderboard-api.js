import ScoreList from './score-list.js';

export default class LeaderboardAPI {
  static baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net';

  static getFullReq(gameKey) { return `${this.baseURL}/api/games/${gameKey}/scores/`; }

  static async fetchRecords(gameKey) {
    const scoreList = new ScoreList();

    const options = { method: 'GET', headers: { 'content-type': 'application/json' } };

    const fetchScores = await fetch(this.getFullReq(gameKey), options)
      .then((response) => response.json())
      .then((response) => response.result);

    fetchScores.forEach((Scores) => {
      scoreList.push(Scores);
    });

    return scoreList;
  }

  static async SubmitRecord(gameKey, user, score) {
    score = parseInt(score, 10);
    const options = {
      method: 'POST',
      body: JSON.stringify({ user, score }),
      headers: { 'content-type': 'application/json' },
    };

    const result = await fetch(this.getFullReq(gameKey), options)
      .then((response) => response.json())
      .then((response) => response.result);

    return result;
  }
}
