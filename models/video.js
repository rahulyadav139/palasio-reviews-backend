const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  videoId: String,
  title: String,
  description: String,
  thumbnail: String,
  author: String,
  category: String,
  publishedAt: String,
  liked: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  disliked: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      user: String,
      comment: String,
      time: String,
    },
  ],
});

module.exports = mongoose.model('Video', videoSchema);
