'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { getCollection } = require('./exercises/exercise-1-2');
const { batchImport } = require('./batchImport');
const { createGreeting,
  getGreeting,
  getGreetings
} = require('./exercises/exercise-2');
const PORT = process.env.PORT || 8000;

express()
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // exercise 1
  .get('/ex-1/:dbName/:collection', getCollection)
  // exercise 2
  .post('/ex-2/greeting', createGreeting)
  // handle 404s
  .get('/ex-2/greeting/:_id', getGreeting)
  .get('/ex-2/greeting', batchImport)
  .use((req, res) => res.status(404).type('txt').send('🤷‍♂️'))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
