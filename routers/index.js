const { Router } = require('express');
const taskRouter = require('./todo.router');

// const taskController = require('../controller/task')

const router = Router();

router.use('/tasks', taskRouter);
// router.post('/tasks', taskController.createTask)

module.exports = router;
