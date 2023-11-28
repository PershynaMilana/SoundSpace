const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const UserRouter = require('./routes/user-routes');
const PlaylistRouter = require('./routes/playlist-routes');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());

connectToDatabase();

app.use('/api', UserRouter);
app.use('/api', PlaylistRouter);

app.get('/protected', authMiddleware.verifyToken, (req, res) => {
  return res.json({ message: 'This is a protected route.', userId: req.userId });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



  