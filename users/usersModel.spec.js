const db = require('../data/dbConfig.js');

const { insert, remove } = require('./usersModel.js');

describe('users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('insert()', () => {
    it('should insert users', async () => {
      await insert({ name: 'Matt' });
      await insert({ name: 'Jonathan' });

      const users = await db('users');

      expect(users).toHaveLength(2);
    });

    it('should insert the provided user', async () => {
      let user = { name: 'Sam' };
      let inserted = await insert(user);
      expect(inserted.name).toBe(user.name);

      user = { name: 'Frodo' };
      inserted = await insert(user);
      expect(inserted.name).toBe(user.name);
    });
  });

  describe('remove()', () => {
    it('should remove 1 user', async () => {
      await insert({ name: 'Matt' });
      await insert({ name: 'Jonathan' });

      let users = await db('users');

      expect(users).toHaveLength(2);

      await remove("1");

      users = await db('users');

      expect(users).toHaveLength(1);
    });
    it('should remove 2 users', async () => {
      await insert({ name: 'Matt' });
      await insert({ name: 'Jonathan' });

      let users = await db('users');

      expect(users).toHaveLength(2);

      await remove("1");
      await remove("2");

      users = await db('users');

      expect(users).toHaveLength(0);
    });
  });

});
