const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  birthDate: {
    type: String,
    required: false,
    default: '1900-01-01',
  },
  country: {
    type: String,
    required: false,
    default: "Ukraine",
  },
  playlists: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Playlist',
    },
  ],
  imageUrl: {
    type:String
  },
  likedTracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);