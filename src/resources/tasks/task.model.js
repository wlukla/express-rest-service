const uuid = require('uuid').v4;

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'DESCRIPTION',
    userId = 'SOME_USERS_ID'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
  }
}

module.exports = Task;
