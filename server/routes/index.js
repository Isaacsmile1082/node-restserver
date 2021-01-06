const express = require('express');

const bcrypt = require('bcrypt');

const app = express();

app.use( require('./usuario'));
app.use( require('./login'));

module.exports = app;