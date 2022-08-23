import { sortBy } from 'lodash';
import Record from './record.js';

class RecordList {
  constructor(initLIst = []) {
    this.list = initLIst;
  }

  push({ name, score }) {
    this.list.push(new Record(name, score));
    this.list = sortBy(this.list, ['score']).reverse();
  }
}

export default RecordList;
