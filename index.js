const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());


const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000)) 
  .catch((err) => console.log(err));

// Schema for form data
const formSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

// Model for form data
const Form = mongoose.model('Form', formSchema);

// POST route for form data
app.post('/formdata', (req, res) => {
  const form = new Form(req.body);
  form.save()
    .then(result => {
        res.redirect('/success.html');
    })
    .catch(err => {
      console.log(err);
    });
});
