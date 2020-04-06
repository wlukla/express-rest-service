const uuid = require('uuid').v4;

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'DESCRIPTION',
    userId = 'SOME_USERS_ID',
    boardId = 'SOME_BOARD_ID',
    columnId = 'SOME_COLUMN_ID'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, columnId, boardId } = task;
    return { id, title, order, description, userId, columnId, boardId };
  }
}

module.exports = Task;
