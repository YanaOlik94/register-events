const express = require('express');
const eventRouter = require('./routes/eventRouter');
const bodyParser = require('body-parser');
const cors = require('cors')
const functions = require('firebase-functions');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/events', eventRouter);

module.exports = app;
