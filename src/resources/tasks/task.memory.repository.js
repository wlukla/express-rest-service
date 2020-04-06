const tasks = [];

const getAll = () => {
  return tasks;
};

const addTask = task => {
  tasks.push(task);
};

const updateTask = (taskId, boardId, data) => {
  const taskIdx = tasks.findIndex(
    task => task.id === taskId && task.boardId === boardId
  );
  if (taskIdx > -1) {
    tasks[taskIdx] = { ...tasks[taskIdx], ...data };
  }
};

const deleteTask = (taskId, boardId) => {
  const taskIdx = tasks.findIndex(
    task => task.id === taskId && task.boardId === boardId
  );
  if (taskIdx > -1) {
    tasks.splice(taskIdx, 1);
  }
};

module.exports = { getAll, addTask, updateTask, deleteTask };
