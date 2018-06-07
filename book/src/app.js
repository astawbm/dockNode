'use strict'

const express = require('express');
const Book = require('./models/books_model');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/book', (req, res) => {
  Book.find({}).exec( (err, books) => {
    if (err) {
      console.log('Error:', err);
    }
    else {
      res.json(books);
    }
  });
})

app.post('/book', async (req, res) => {
  const book = new Book({
    name: req.body.name
  });
  const savedBook = await book.save();
  res.json(savedBook);
})

app.put('/book', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, 
    {$set: {name: req.body.name}}, {new: true},
    (err, book) => {
    if (err) {
      console.log(err);
    }
    res.json(book);
  });
})

app.get('/book/:bookId', async (req, res) => {
  Book.findOne({
    _id: req.params.id
  }).exec((err, book) => {
    if (err) {
      console.log('Error:', err);
    } else {
      res.json(book);
    }
  });
})

app.delete('/book/:bookId', (req, res) => {
  Book.remove({_id: req.params.id}, (err) => {
    if(err) {
      console.log(err);
    }
    else {
      res.send('book deleted!');
    }
  });
})


module.exports = app;
