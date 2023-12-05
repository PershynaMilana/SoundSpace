const Playlist = require('../model/Playlist');
const User = require('../model/User'); 

const createPlaylist = async (req, res) => {
  try {
    const { name, description , imageUrl } = req.body;
    const userId = req.body.userId; 

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const playlist = new Playlist({ name, description, userId, imageUrl });
    await playlist.save();

    await User.findByIdAndUpdate(userId, { $push: { playlists: playlist._id } });

    res.status(201).json({ message: 'Playlist created successfully' });
  } catch (error) {
    console.error('Error creating playlist:', error);
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

const getPlaylistById = async (req, res) => {
  const playlistId = req.params.playlistId;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    res.json(playlist);
  } catch (error) {
    console.error('Error getting playlist by id:', error);
    res.status(500).json({ error: 'Error getting playlist by id' });
  }
};

const deletePlaylist = async (req,res) => {
  const playlistId = req.params.playlistId;

  try {
    const playlist = await Playlist.findByIdAndDelete(playlistId);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    await User.findByIdAndUpdate(playlist.userId, {$pull:{playlists:playlistId}});
    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ error: 'Error deleting playlist' });
  }
};

module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  deletePlaylist,
};