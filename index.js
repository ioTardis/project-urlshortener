require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

// Connection to the database
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

// Creating model
let urlSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  short: Number
});
let URL = mongoose.model('URL', urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

// serving static file
app.use('/public', express.static(`${process.cwd()}/public`));

// basic routing
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Reciving POST with original URL
app.post('/api/shorturl', bodyParser.urlencoded({ extended: false }) , (req, res) => {
  let originalURL = req.body.url;
  // by default short URL is 1
  let shortURL = 1;

  // checking if URL is valid
  if (!originalURL.match(regex)) {
    res.json({ error: 'invalid url' });
    return
  }
  
  // searching the highest number of short URL to assign a new one
  URL.findOne({})
      .sort({short: 'desc'})
      .exec((err, data) => {
        // short URL is next number after biggest one in database
        if (!err && data != undefined) {
          shortURL = data.short + 1;
        }
        if (!err){
          // adding or editing entry of original URL
          URL.findOneAndUpdate(
            { original: originalURL },
            { original: originalURL, short: shortURL },
            { new: true, upsert: true },
            (err, savedURL) => {
              if (!err){
                shortURL = savedURL.short;
                res.json({ original_url: originalURL, short_url: shortURL });
              }
            }
          );
        } else console.log(err);
  });
});

// Redirecting short URLs to original 
app.get('/api/shorturl/:input', (req, res) => {
  let input = req.params.input;
  URL.findOne({ short: input }, (err, data) => {
    if (!err && data != undefined) {
      res.redirect(data.original)
    } else res.json('URL not Found');
  });
});