import './app.module.scss';
import ScoreList from './modules/score-list.js';
import mockValues from './modules/mock-values.js';

const scoreList = new ScoreList();

const rebuildList = () => {
  const templateElement = document.getElementById('score-item-template');
  const recordListElement = document.getElementById('recent-score-list');
  recordListElement.textContent = '';
  scoreList.list.forEach((record, index) => {
    const newScoreElement = templateElement.cloneNode(true);

    newScoreElement.id = `score-item-${index}-${record.name}-${record.score}`;

    newScoreElement.dataset.name = record.name;
    newScoreElement.dataset.score = record.score;

    newScoreElement.querySelector('.full-name').textContent = record.name;
    newScoreElement.querySelector('.record').textContent = record.score;

    recordListElement.appendChild(newScoreElement);
  });
};

const init = () => {
  mockValues.forEach((mockScore) => {
    scoreList.push(mockScore);
  });
  rebuildList();
};

window.addEventListener('load', init);
