const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./models/users');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());


mongoose.connect('mongodb+srv://kdanahgkd:kushan.1@cluster0.1qvcaed.mongodb.net/Employee')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const varifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({error: "Access denied"});
    }
    else{
        jwt.verify(token, "jwt-secret-key",(err, decoded) => {
            if(err){
                return res.json("error with token");
            }
            else{
                if(decoded.role === "admin"){
                    req.user = decoded;
                    next();
                }else{
                    return res.json("not admin");
                }

            }
        })
        req.user = varified;
        next();
    }
}

app.get('/dashboard',varifyUser, (req, res) => {
    res.json("success")
})


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    await bcrypt.hash(password, 10)
    .then((hash) => {
        userModel.create({
            name,
            email,
            password: hash
        }).then(user=> res.json("suceess"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
     
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, response) => {
                if(response){
                    const token = jwt.sign({email: user.email, role: user.role},
                         "jwt-secret-key", {expiresIn: "2h",
                    })
                    res.cookie('token', token)
                    return res.json({status: "success", role: user.role})

                }else{
                    res.json({error: "Password is incorrect"});
                }

            })
           
        }else{
            res.json({error: "User doesn't exist"});
        }
    }).catch(err => res.json(err));
    
     
})



app.listen(3001, () => {    // listen on port 5000
    console.log('Server is running');
})


app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    userModel.findOne({ email: email })
    .then(users => {
        if(!users){
            return res.send({Status: "User doesn't exist"});
        }
        const token = jwt.sign({id: users._id}, "jwt-secret-key", {expiresIn: "1h"})

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { 
              user: 'kdanahgkd@gmail.com',
              pass: 'ddox xrji bjqs cjvj'
            }
          });
          
          var mailOptions = {
            from: 'kdanahgkd@gmail.com',
            to: 'dananjayakushan777@gmail.com',
            subject: 'Reset Your Password',
            text: `http://localhost:5173/reset-password/${users._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Email sent"});
            }
          });
           
    });
    
     
})

app.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if(err){
            return res.send({Status: "Token is invalid"});
        } else {
            bcrypt.hash(password, 10)
            .then((hash) => {
                userModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Password updated"}))
                .catch(err => res.send({Status: err}))

        })
        .catch(err => res.send({Status: err}))
    }
       
})
})



