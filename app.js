const express = require('express');
const taskRouter = require('./routes/taskRouter');

const db = require('./config/db');
db();

let app = express();


//middle ware
app.use(express.json());

app.use('/api/v1/taskRouter', taskRouter);

module.exports = app;
