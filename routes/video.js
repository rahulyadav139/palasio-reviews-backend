const express = require('express');

const videoController = require('../controllers/video');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/new-video', videoController.postNewVideo);

router.post('/liked-disliked', isAuth, videoController.postLikedAndDisliked);

router.post('/new-comment', isAuth, videoController.postComment);

router.get('/', videoController.getAllVideos);

module.exports = router;
