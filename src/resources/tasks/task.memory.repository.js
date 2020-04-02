const uuidv4 = require('uuid').v4;

const getAll = () => {
  return [
    {
      id: uuidv4(),
      title: 'TASK1',
      order: 11,
      description: 'TASK_DESCRIPTION',
      userId: 'SOME_ID'
    },
    {
      id: uuidv4(),
      title: 'TASK2',
      order: 12,
      description: 'TASK_DESCRIPTION',
      userId: 'SOME_ID'
    },
    {
      id: uuidv4(),
      title: 'TASK3',
      order: 13,
      description: 'TASK_DESCRIPTION',
      userId: 'SOME_ID'
    }
  ];
};

module.exports = { getAll };
