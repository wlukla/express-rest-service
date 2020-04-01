const uuid = require('uuid').v4;
const Task = require('../tasks/task.model');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [new Task()] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
