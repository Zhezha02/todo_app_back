const { Router } = require('express');
const paginate = require('../middlewares/paginate.mw');
const taskController = require('../controller/task');

const taskRouter = Router();

taskRouter
  .route('/')
  .post(taskController.createTask)
  .get( taskController.getTasks)
  .delete(taskController.deleteTasks);

taskRouter
  .route('/:taskId')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = taskRouter;
