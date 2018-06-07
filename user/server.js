'use strict'

const app = require('./src/app');
const { DB_URI } = require('./src/config');
const mongoose = require('mongoose');
mongoose.openUri(DB_URI);

app.listen(3000, () => {
  console.log('running on port 3000');
  console.log('--------------------------');
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
