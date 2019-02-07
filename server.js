const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Items API Routes
const items = require('./routes/api/items');

const app = express();

// bodyParser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('Database Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set a static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
  });
}

const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`Server started on port ${port}`));