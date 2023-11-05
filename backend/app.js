const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const router = require('./routes/user-routes');
require('dotenv').config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());

connectToDatabase();

app.use('/api', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  
