const uuidv4 = require('uuid').v4;
const Task = require('../tasks/task.model');

const getAll = () => {
  return [
    {
      id: uuidv4(),
      title: 'BOARD_1',
      tasks: [new Task(uuidv4(), 'Task1', 1), new Task(uuidv4(), 'Task2', 2)]
    },
    {
      id: uuidv4(),
      title: 'BOARD_2',
      tasks: [new Task(uuidv4(), 'Task11', 1), new Task(uuidv4(), 'Task22', 2)]
    },
    {
      id: uuidv4(),
      title: 'BOARD_3',
      tasks: [
        new Task(uuidv4(), 'Task111', 1),
        new Task(uuidv4(), 'Task222', 2)
      ]
    }
  ];
};

module.exports = { getAll };
