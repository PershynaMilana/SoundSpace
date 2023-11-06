const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type:String,
    required:true
  }
});

module.exports = mongoose.model('NewPlaylist', playlistSchema);
