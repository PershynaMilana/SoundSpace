const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const UserRouter = require('./routes/user-routes');
const PlaylistRouter = require('./routes/playlist-routes');
require('dotenv').config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());

connectToDatabase();

app.use('/api', UserRouter);
app.use('/api', PlaylistRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  
