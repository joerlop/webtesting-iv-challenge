const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

function insert(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      return db('users')
        .where({ id: ids[0] })
        .first();
    });
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}

async function update(id, changes) {
  return undefined;
}

function getAll() {
  return db('hobbits');
}

function findById(id) {
  return null;
}
