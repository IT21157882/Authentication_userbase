const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./models/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


mongoose.connect('mongodb+srv://kdanahgkd:kushan.1@cluster0.1qvcaed.mongodb.net/Employee')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    await bcrypt.hash(password, 10)
    .then((hash) => {
        userModel.create({
            name,
            email,
            password: hash,
        }).then(user=> res.json({status: "ok"}))
        .catch(err => res.json(err));
    }).catch(err => res.json(err));
     
})



app.listen(3001, () => {    // listen on port 5000
    console.log('Server is running');
})