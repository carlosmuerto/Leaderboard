import './app.module.scss';
import LeaderboardAPI from './modules/leaderboard-api.js';
import gameId from './modules/game-id.js';

const showListMessage = (message) => {
  const templateElement = document.getElementById('score-list-message-template');
  const recordListElement = document.getElementById('recent-score-list');

  const newScoreElement = templateElement.cloneNode(true);

  newScoreElement.id = 'score-list-message';

  newScoreElement.dataset.message = message;
  newScoreElement.textContent = message;

  recordListElement.textContent = '';

  recordListElement.appendChild(newScoreElement);
};

const rebuildList = (scoreList) => {
  const templateElement = document.getElementById('score-item-template');
  const recordListElement = document.getElementById('recent-score-list');
  recordListElement.textContent = '';
  if (scoreList.list.length > 0) {
    scoreList.list.forEach((record, index) => {
      const newScoreElement = templateElement.cloneNode(true);

      newScoreElement.id = `score-item-${index}-${record.user}-${record.score}`;

      newScoreElement.dataset.user = record.user;
      newScoreElement.dataset.score = record.score;

      newScoreElement.querySelector('.full-name').textContent = record.user;
      newScoreElement.querySelector('.record').textContent = record.score;

      recordListElement.appendChild(newScoreElement);
    });
  } else {
    showListMessage('NO SCORES YET');
  }
};

const FetchRecordsAndRepopulate = async () => {
  showListMessage('FETCHING');
  const scoreList = await LeaderboardAPI.fetchRecords(gameId);
  rebuildList(scoreList);
};

const initRefreshBtn = () => {
  const refreshBtnElement = document.getElementById('refresh-recent-score-list');
  refreshBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    FetchRecordsAndRepopulate();
  });
};

const init = () => {
  FetchRecordsAndRepopulate();
  initRefreshBtn();
};

window.addEventListener('load', init);
