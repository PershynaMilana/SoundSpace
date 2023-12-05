const express = require('express');
const { createPlaylist, getPlaylists, getPlaylistById,deletePlaylist } = require('../controllers/playlist-controller');

const router = express.Router();

router.post('/playlists', createPlaylist);
router.get('/playlists', getPlaylists);
router.get('/playlists/:playlistId', getPlaylistById);
router.delete('/playlists/:playlistId', deletePlaylist);
module.exports = router;