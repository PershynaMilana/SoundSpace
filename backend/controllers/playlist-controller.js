const Playlist = require('../model/Playlist');

const createPlaylist = async (req, res) => {
  try {
    const { name, userId, imageUrl } = req.body;
    const playlist = new Playlist({ name, userId, imageUrl });
    await playlist.save();
    res.status(201).json({ message: 'Playlist created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create playlist' });
  }
};

const getPlaylists = async (req, res) => {
    try {
      const playlists = await Playlist.find();
      res.json(playlists);
    } catch (error) {
      console.error('Error getting playlists:', error);
      res.status(500).json({ error: 'Error getting playlists' });
    }
  };
  
  module.exports = {
    createPlaylist,
    getPlaylists, 
  };