'use strict'

const express = require('express');
const User = require('./models/users_model');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/user', (req, res) => {
  User.find({}).exec( (err, users) => {
    if (err) {
      console.log('Error:', err);
    }
    else {
      res.json(users);
    }
  });
})

app.post('/user', async (req, res) => {
  const user = new User({
    name: req.body.name
  });
  const savedUser = await user.save();
  res.json(savedUser);
})

app.put('/user', (req, res) => {
  User.findByIdAndUpdate(req.params.id, 
    {$set: {name: req.body.name}}, {new: true},
    (err, user) => {
    if (err) {
      console.log(err);
    }
    res.json(user);
  });
})

app.get('/user/:userId', async (req, res) => {
  User.findOne({
    _id: req.params.id
  }).exec((err, user) => {
    if (err) {
      console.log('Error:', err);
    } else {
      res.json(user);
    }
  });
})

app.delete('/user/:userId', (req, res) => {
  User.remove({_id: req.params.id}, (err) => {
    if(err) {
      console.log(err);
    }
    else {
      res.send('user deleted!');
    }
  });
})


module.exports = app;
