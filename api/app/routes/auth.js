const router = require('express').Router();
const { Users } = require('../models/users');

router.get('/', (req, res) => {
  const users = Users.findAll();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = Users.findByPk(id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const id = Users.create({ username, password });
  res.json({ id });
});

router.put('/', (req, res) => {
  const { id } = req.params;
  const updatedUser = Users.update(req.body, id);
  res.json(updatedUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Users.destroy(id);
  res.sendStatus(200);
});

module.exports = router;
