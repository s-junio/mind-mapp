const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  const { error, value } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExists = await User.findOne({ userName: req.body.userName });

  if (userExists) return res.status(400).send('User already exists');

  //PW Hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  value.password = hashedPassword;
  const user = new User(value);
  try {
    const savedUser = await user.save();
    res.send({
      userName: savedUser.userName,
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { error, value } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) return res.status(400).send('User or password do not match');

  //Check PW
  const validPass = await bcrypt.compare(value.password, user.password);
  if (!validPass) return res.status(400).send('User or password do not match');

  //Create JSON Web Token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
