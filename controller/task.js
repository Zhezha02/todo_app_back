const createError = require('http-errors');
const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const task = await Task.create(body);

    if (!task) {
      return next(createError(400, "Task can't be create"));
    }

    res.status(201).send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return next(createError(404, 'Task not found'));
    }

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getTasks = async (req, res, next) => {
  try {
    const { pagination = {} } = req;

    const tasks = await Task.findAll({ ...pagination });

    if (!tasks.length) {
      return next(createError(404, 'Tasks not found'));
    }

    res.send(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { taskId },
    } = req;

    const [affectedRows, [updatedTask]] = await Task.update(body, {
      where: { id: taskId },
      returning: true,
    });

    if (affectedRows !== 1) {
      return next(createError(400, "Task can't be updated"));
    }

    res.send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const affectedRows = await Task.destroy({ where: { id: taskId } });

    if (affectedRows !== 1) {
      return next(createError(404, "Task doesn't exist"));
    }

    res.send({ data: affectedRows });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTasks = async (req, res, next) => {
  try {
    const affectedRows = await Task.destroy({ where: {} });
    if (!affectedRows) {
      return next(createError(404, 'Tasks cant be deleted'));
    }
    res.send({ data: affectedRows });
  } catch (err) {
    next(err);
  }
};
