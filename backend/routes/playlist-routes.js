const express = require('express');
const { createPlaylist,getPlaylists } = require('../controllers/playlist-controller');

const router = express.Router();

router.post('/playlists',createPlaylist);
router.get('/playlists',getPlaylists);

module.exports = router 