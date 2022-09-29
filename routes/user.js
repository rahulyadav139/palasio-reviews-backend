const express = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/update-playlists', isAuth, userController.postUpdatePlaylists);

router.post('/update-history', isAuth, userController.postUpdateHistory);

router.post(
  '/add-to-liked-videos',
  isAuth,
  userController.postAddToLikedVideos
);

router.post(
  '/remove-from-liked-videos',
  isAuth,
  userController.postRemoveFromLikedVideos
);

router.post('/clear-liked-videos', isAuth, userController.postClearLikedVideos);

module.exports = router;
