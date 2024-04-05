let Task = require('../models/Task');

let getTasks = async (req, res) => {
  try {
    let tasks = await Task.find();
    if (!tasks) {
      return res.status(400).json({
        status: 'fail',
        message: 'ther is  no task to display',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

let createTask = async (req, res) => {
  console.log(req.body);
  try {
    let { task } = req.body;
    if (!task) {
      return res.status(400).json({
        status: 'fail',
        message: 'task is required',
      });
    }
    // let newTask = await Task.create({
    //   task: task,
    // });

    //or----
    let newTask = new Task({
      task: task,
    });
    await newTask.save();
    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

let getTask = async (req, res) => {
  // console.log(req.params.id);
  try {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({
        status: 'fail',
        message: 'there is  no task to display',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

//update task
let updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    let updatedTasks = await Task.findByIdAndUpdate(
      id,
      { task: task },
      { new: true }
    );
    if (!updatedTasks) {
      return res.status(400).json({
        status: 'fail',
        message: 'ther is  no task to display',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        updateTask,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
let deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    let deletedTasks = await Task.findByIdAndDelete(id);
    if (!deletedTasks) {
      return res.status(400).json({
        status: 'fail',
        message: 'ther is  no task to display',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        deletedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'deleted',
    });
  }
};
module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
