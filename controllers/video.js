const Video = require('../models/video');

exports.postNewVideo = (req, res) => {
  const video = new Video(req.body);

  video.save();

  res.send({ message: 'new video successfully!' });
};

exports.getAllVideos = async (req, res) => {
  const videos = await Video.find();

  res.send(videos);
};

exports.postLikedAndDisliked = async (req, res) => {
  const { _id, updatedLiked, updatedDisliked } = req.body;

  await Video.findOneAndUpdate(
    { _id },
    { liked: updatedLiked, disliked: updatedDisliked }
  );

  res.send({ message: 'video details updated successfully!' });
};

exports.postComment = async (req, res) => {
  const { _id, commentData } = req.body;

  await Video.findByIdAndUpdate({ _id }, { $push: { comments: commentData } });

  res.send({ message: 'comment is added successfully!' });
};
