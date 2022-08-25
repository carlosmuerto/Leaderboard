import mockValues from './mock-values.js';
import ScoreList from './score-list.js';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class LeaderboardAPI {
  static async fetchRecords(apiKey) {
    const scoreList = new ScoreList();
    if (apiKey) {
      const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net';
      const req = `${baseURL}/api/games/${apiKey}/scores/`;
      const options = { method: 'GET', headers: { 'content-type': 'application/json' } };

      const fetchScores = await fetch(req, options)
        .then((response) => response.json())
        .then((response) => response.result);

      fetchScores.forEach((Scores) => {
        scoreList.push(Scores);
      });
    } else {
      await delay(5000);
      const initScores = JSON.parse(mockValues);
      initScores.forEach((mockScore) => {
        scoreList.push(mockScore);
      });
    }
    return scoreList;
  }
}
