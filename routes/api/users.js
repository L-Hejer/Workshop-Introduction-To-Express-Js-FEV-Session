// 1- Require express
const express = require('express');

// 2- Require uuid()
const uuid = require('uuid');

// 3- Get the Router method from express
const router = express.Router();

// 4- Require Users array
let users = require('../../Users');

// 5- Get all users
// @route GET api/users
// @desc Display all users
// @method GET
router.get('/', (req, res) => {
  res.send(users);
});

// 6- Create user
// @route POST api/users/add_user
// @desc Add A user
// @method POST
router.post('/add_user', (req, res) => {
  const newUser = {
    ...req.body,
    id: uuid.v4(),
  };
  
    if (!newUser.name || !newUser.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  users.push(newUser);
  console.log(req.body);

  res.send({ msg: 'User Added', users });
});

// 7- Update user
// @route PUT api/users/:id
// @desc Edit a user by id
// @method PUT
router.put('/:id', (req, res) => {
  //Get the user id
  const id = req.params.id;
  // Find the user to edit
  let userToEdit = users.find((user) => user.id.toString() === id);
  if (!userToEdit) {
    return res.status(404).send('User Not Found!');
  }
  userToEdit = { ...userToEdit, ...req.body };
  users = users.map((user) => (user.id.toString() === id ? userToEdit : user));

  res.send({ msg: 'User Edited', users });
});

// 8- Delete user
// @route DELETE api/users/:id
// @desc Delete a user by id
// @method DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id.toString() !== id);
  res.send({ msg: 'User Deleted', users });
});

module.exports = router;
