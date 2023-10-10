const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors({ credentials:true, origin:"http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

const mongoURI = 'mongodb://127.0.0.1:27017/SoundSpaceDatabase';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    const db = mongoose.connection;
    const dbExists = await db.db.admin().listDatabases();
    if (!dbExists.databases.some(db => db.name === 'SoundSpaceDatabase')) {
      await db.db.admin().createDatabase('SoundSpaceDatabase');
      console.log('Database "SoundSpaceDatabase" created.');
    }

    app.listen(5000);
    console.log("Listening on localhost 5000");
  })
  .catch((err) => console.error(err));
