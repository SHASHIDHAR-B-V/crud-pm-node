const express = require('express');
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} = require('../controllers/taskController');

//router instance
let taskRouter = express.Router();

taskRouter.get('/task', getTasks);
taskRouter.post('/task', createTask);
taskRouter.get('/task/:id', getTask);
taskRouter.put('/task/:id', updateTask);
taskRouter.delete('/task/:id', deleteTask);

module.exports = taskRouter;
