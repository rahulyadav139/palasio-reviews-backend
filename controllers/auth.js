const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).send({ message: 'User not found!' });
    return;
  }

  const isMatched = await bcryptjs.compare(password, user.password);

  if (!isMatched) {
    res.status(401).send({ message: 'Invalid password!' });
    return;
  }

  const token = jwt.sign(
    { user: user.fullName, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: 30 * 60 }
  );

  res.send({
    message: 'You have successfully logged in!',
    token,
    userId: user._id.toString(),
    playlists: user.playlists,
    history: user.history,
    likedVideos: user.likedVideos,
    username: user.fullName,
  });
};

exports.putSignup = async (req, res, next) => {
  const { email, password, fullName } = req.body;

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    res
      .status(409)
      .send({ message: 'User is already registered with same email!' });
    return;
  }

  const encryptedPassword = await bcryptjs.hash(password, 12);

  const user = new User({
    email: email,
    password: encryptedPassword,
    fullName: fullName,
    playlists: [{ title: 'watch later', videos: [] }],
  });

  user.save();

  const token = jwt.sign(
    { user: user.fullName, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: 30 * 60 }
  );

  res.send({
    message: 'Congratulation! you have successfully created an account.',
    token,
    userId: user._id.toString(),
    playlists: user.playlists,
    history: user.history,
    likedVideos: user.likedVideos,
    username: user.fullName,
  });
};
