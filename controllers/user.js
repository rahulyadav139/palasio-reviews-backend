const User = require('../models/user');
const Video = require('../models/video');

exports.postUpdatePlaylists = async (req, res) => {
  const userId = req.userId;

  const updatedPlaylists = req.body;

  await User.findByIdAndUpdate(
    { _id: userId },
    { playlists: updatedPlaylists }
  );

  res.send({ message: 'playlists updated!' });
};

exports.postUpdateHistory = async (req, res) => {
  const userId = req.userId;

  const updatedHistory = req.body;

  await User.findByIdAndUpdate({ _id: userId }, { history: updatedHistory });

  res.send({ message: 'history updated!' });
};

exports.postAddToLikedVideos = async (req, res) => {
  const userId = req.userId;

  const { likedVideo } = req.body;

  await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { likedVideos: likedVideo } }
  );

  res.send({ message: 'liked videos updated!' });
};

exports.postRemoveFromLikedVideos = async (req, res) => {
  const userId = req.userId;

  const { videoId } = req.body;

  await User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { likedVideos: { _id: videoId } } }
  );

  await Video.findByIdAndUpdate({ _id: videoId }, { $pull: { liked: userId } });

  res.send({ message: 'liked videos updated!' });
};
exports.postClearLikedVideos = async (req, res) => {
  const userId = req.userId;

  await User.findByIdAndUpdate({ _id: userId }, { likedVideos: [] });

  await Video.updateMany(
    { $in: { liked: userId } },
    { $pull: { liked: userId } }
  );

  res.send({ message: 'liked videos updated!' });
};
