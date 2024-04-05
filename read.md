// step 1 creating a server.js and create a server------

const http = require('http');

const server = http.createServer();

server.listen(5000, () => {
console.log('server running in 5k');
});

//-------------------------------------

//step 2 create app.js-----

const express = require('express');

let app = express();

module.exports = app;

//server.js
//require app in server.js
//const server = http.createServer(app);

//server.js
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(5000, () => {
console.log('server running in 5k');
});

//-----------------------------------------

//step 3-----
//now create 3 folder
//models , taskController, routes ,

// models - task.js--
//install mongoose
//require mongoose
//create a taskSchema

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
task: {
type: string,
},
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

//controller - taskController

let Task = require('../models/task');

let getTasks = async () => {
try {
let tasks = await Task.find();
if (!tasks) {
return res.status(400).json({
status: 'fail',
message: 'there is no task to display',
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

module.exports = { getTasks };

//routes - taskRouter.js

const express = require('express');
const { getTasks } = require('../controllers/taskController');

let taskRouter = express.Router();

taskRouter.get('/task', getTasks);

//----------------------------------------

//step 4 ---
//create a config folder and db.js file
//for mongo db connectivity

const mongoose = require('mongoose');

async function db() {
try {
await mongoose.connect('mongodb://127.0.0.1:27017/newTaskManager');
console.log('db connected');
} catch (error) {
console.log(error.message);
}
}

module.exports = db;

//step 5

const express = require('express');
const taskRouter = require('./routes/taskRouter');

const db = require('./config/db');
db();

let app = express();

//middleware

app.use(express.json());
//The app.use(express.json()) middleware in Express.js is used to parse incoming request bodies in JSON format. It allows your Express application to automatically parse JSON data included in the body of incoming requests, making it available as req.body in your route handlers.

app.use('/api/v1/taskManager', taskRouter);

module.exports = app;

//--------------------------

//step 6------------------------

after this go to postman and paste url
http://localhost:8000/api/v1/taskManager/task

if any data present it will show or else empty array will display

//step 7 ----- develop other crud operations

//createTask//create task

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

module.exports = { getTasks, createTask };

//postman url http://localhost:8000/api/v1/taskManager/task

schema to type in body-raw-json

{
"task": "shashi"
}

//----------------------------------

//step 8 get single task by id

//getTask------------

let getTask = async (req, res) => {
try {
const { id } = req.params;
console.log(id);
let task = await Task.findById(id);
if (!task) {
return res.status(400).json({
status: 'fail',
message: 'there is no task to display',
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

module.exports = { getTasks, createTask, getTask };

//--------------------------------------------

//step 9-----------------------
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

//step 10 Deleted Task

//delete task
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
