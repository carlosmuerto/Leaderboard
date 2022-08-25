import { sortBy } from 'lodash';
import Record from './record.js';

class RecordList {
  constructor(initLIst = []) {
    this.list = initLIst;
  }

  push({ user, score }) {
    this.list.push(new Record(user, score));
    this.list = sortBy(this.list, ['score']).reverse();
  }
}

export default RecordList;
