const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const mongoURI = 'mongodb://127.0.0.1:27017/SoundSpaceDatabase';
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = connectToDatabase;
