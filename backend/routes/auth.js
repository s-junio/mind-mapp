const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation, updateValidation } = require('../validation');
const auth = require('../tokenCheck');

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
  res.header('auth-token', token).send('Success!');
});


router.get('/userInfo', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send('User not found');
  res.status(200).send({
    userName: user.userName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
  });
});



router.patch('/userInfo', auth, async (req, res) => {
  const { error, value } = updateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send('User not found');

  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      firstName: value.firstName || user.firstName,
      lastName: value.lastName || user.lastName,
      email: value.email || user.email,
      avatar: value.avatar || user.avatar,
    },
    async function (err, doc) {
      if (err) return res.send(500, { error: err });
      const user = await User.findById(req.user._id);
      return res.send({
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      });
    }
  );
});

module.exports = router;
