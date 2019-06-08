const User = require('../Model/user'); //path for user.js in the model
const multer = require('multer');
const path = require('path');
const express = require("express");

const router = express.Router();


router.route('/registration')
    .post((req, response) => {
        console.log(req.body); // shows the parameters that the user sends from body 
        var mydata = new User(req.body); //sends the req from client to our model user
        mydata.save().then(function() { //mydata.save initialies the data sending process though the model
            response.json(mydata); //client gets the response

        }).catch(function(e) { //if data is not saved catch triggers the reason why
            response.send(e);
        })
    });

router.route('/login').post((req, response) => {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ 'email': email, 'password': password }).count(function(err, number) {
        if (number != 0) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json') //what format the response is being sent in
            response.json('Successfully Logged in');
        } else {
            response.json('email and password did not match');
            console.log('email and password did not match')
        }
    })
});
// app.post('/upload', upload.single('imageName'), (req, res) => {
//     res.json(req.file.filename)
// })


var storage = multer.diskStorage({
    destination: "images",
    filename: function(req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, "bikal" + Date.now() + ext);
    }

});
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { return cb(newError("You can upload only image files!"), false); }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1000000
    }
});


router.route('/uploadimage', upload.single('imageName')).post((req, response) => {
    res.json(req.file.filename)
})


module.exports = router;