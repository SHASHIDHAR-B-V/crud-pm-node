//mf.js file or app.js

const express = require('express');

let mf = express();

//method 1----------------------------
/* 
const express = require('express');

let mf = express();

function auth(req, res, next) {
  console.log('this is auth');
  next();
}

mf.get('/home', (req, res) => {
  res.send('i am home');
});

module.exports = mf;

*/

//method 2---------------------------
/* 
const express = require('express');

let mf = express();

function auth(req, res, next) {
  console.log('this is auth');
  next();
}

function parse(req, res, next) {
  console.log('this is parse');
  next();
}

mf.get('/home', (req, res) => {
  res.send('i am home');
});

module.exports = mf;

*/

//methods 3-----------------------

/*

const express = require('express');

let mf = express();
function auth(req, res, next) {
  console.log('this is auth');
  next();
}

function parse(req, res, next) {
  console.log('this is parse');
  next();
}

mf.use(parse);
mf.use(auth);


mf.get('/home', (req, res) => {
  res.send('i am home');
});

module.exports = mf;
 */

//method 4------------

/*

const express = require('express');

let mf = express();

mf.use(function parse(req, res, next) {
  console.log('this is parse');
  next();
});
//we can also use arrow function
mf.use((req, res, next) => {
  console.log('this is auth');
  next();
});

mf.get('/home', (req, res) => {
  res.send('i am home');
});

module.exports = mf;


*/

//method 5 -----------

/*

const express = require('express');

let mf = express();

function auth(req, res, next) {
  console.log('this is auth');
  next();
}

function parse(req, res, next) {
  console.log('this is parse');
  next();
}

mf.use(function parse(req, res, next) {
  console.log('this is parse');
  next();
});
//we can also use arrow function
mf.use((req, res, next) => {
  console.log('this is auth');
  next();
});

//or----we can pass parse and auth here also in
mf.get('/home', parse, auth, (req, res) => {
  res.send('i am home');
});

module.exports = mf;

*/

//Method 6 ---------------

/*
//we can pass functions also in app.get
const express = require('express');

let mf = express();

mf.get(
  '/home',
  function parse(req, res, next) {
    console.log('this is parse');
    next();
  },
  (req, res, next) => {
    console.log('this is auth');
    next();
  },
  (req, res) => {
    res.send('i am home');
  }
);

module.exports = mf;

*/

module.exports = mf;

//mfserver.js file or server.js

const http = require('http');
const app = require('./mf.js');
let server = http.createServer(app);

server.listen(8000, () => {
  console.log('server running successfully on port 8k');
});
