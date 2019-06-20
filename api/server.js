const express = require('express');

const Users = require('../users/usersModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/users', (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete('users/:id', (req, res) => {
  const id = req.params.id;

  Users.remove(id).then(user => {
    res.status(200).json(req.user)
    .catch(err => {
      res.status(500).json({error: "User could not be removed"})
    })
  })
});

server.post("/users", (req, res) => {
  const user = req.body;

  Users.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

module.exports = server;
