var User = require('../Model/user'); //path for user.js in the model
var Post = require('../Model/post'); //path for user.js in the model
const bodyParser = require('body-parser');
const express = require("express");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var app = express();
app.use(express.json());
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));


router.post('/login', function(req, res) {
    var response = res;
    console.log(req.body);
    console.log(req.token);
    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ Success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            if (user.user_status == "Banned") {
                res.json({ Success: false, message: "You are Banned by Admin" }); // send response to ajax call to view
            } else {

                bcrypt.compare(req.body.password, user.password, function(err, res) {
                    if (res) {
                        var payload = {
                            admin: user.admin
                        }
                        var token = jwt.sign(payload, "secretmessage", {
                            expiresIn: 86400 // expires in 24 hours
                        });

                        response.json({
                            Success: 'Success!',
                            message: 'Welcome ' + user.username,
                            token: token,
                            username: user.username,
                            _id: user._id,
                            admin: user.admin
                        });

                    } else {

                        response.json("Authentication failed. Wrong password.");
                    }
                });
            }

        }

    });
});
router.post('/registration', function(req, res, next) {
    console.log(req.body);
    var personInfo = req.body;

    // Validate if the user enter email, username, password and confirm password
    if (!personInfo.name || !personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
        res.json({ "Success": "Fill all the input fields" });
    } else {
        // validate if the password and confirm password is same or not
        if (personInfo.password == personInfo.passwordConf) {

            // find the email if the email in table
            User.findOne({ email: personInfo.email }, function(err, data) {

                // if the email is not already taken
                if (!data) {
                    var c;
                    // find the last user and take unique_id from that to variable c for new user
                    User.findOne({}, function(err, data) {

                        var hashpassword = bcrypt.hashSync(personInfo.password, 10);
                        //Initialize the user Model object with variable or value from the post form
                        var newPerson = new User({
                            name: personInfo.name,
                            email: personInfo.email,
                            username: personInfo.username,
                            password: hashpassword,
                            passwordConf: hashpassword,

                            admin: false
                        });

                        // Save it to table User
                        newPerson.save(function(err, Person) {
                            if (err)
                                console.log(err);
                            else
                                console.log('Success');
                        });
                    }).sort({ _id: -1 }).limit(1);
                    res.json("You are regestered,You can login now."); // send response to ajax call to view
                } else {
                    res.json({ "Success": "Email is already used." }); // send response to ajax call to view
                }

            });
        } else {
            res.json({ "Success": "password is not matched" }); // send response to ajax call to view
        }
    }
});

router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, "secretmessage", function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});

router.put('/updateprofile', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ 'Success': 'Profile Updated Successfully!!', 'username': doc.username });
        } else {
            console.log('Error during record update : ' + err);
        }
    });
});

router.get('/profile/:_id', (req, res) => {
    User.findById({
        _id: req.params._id
    }, function(err, user) {
        if (err) {
            res.json({ 'Success': 'Post Failed Something is wrong. Log in first!!1' });
        } else if (!user) {
            res.json({ 'Success': 'Post Failed Something is wrong. Log in first!!2' });
        } else if (user) {
            res.json(user);
            // if (user.username == req.body.username) {
            //     res.json(user);
            // } else {
            //     res.json({ 'Success': 'Authentication Failed!!' });
            // }
        }

    });
});
router.post('/post', (req, res) => {
    User.findOne({
        _id: req.body._id
    }, function(err, user) {
        if (err) {
            res.json({ 'Success': 'Post Failed Something is wrong. Log in first!!' });
        } else if (!user) {
            res.json({ 'Success': 'Not user' });
        } else if (user) {
            console.log(user.username);
            console.log(req.body.username);
            if (user.username == req.body.username) {
                var post = new Post();

                post.title = req.body.title;
                post.location = req.body.location;
                post.image = req.body.image;
                post.description = req.body.description;
                post.user = req.body.username;
                post.save((err, doc) => {
                    if (err) {
                        console.log('Error during record insertion : ' + err);
                    } else {
                        res.json({ 'Success': 'Post successfully Placed!!!' });
                    }
                });
                console.log(post);
            } else {
                res.json({ 'Success': 'Authentication Failed!!' });
            }
        }

    });

});

module.exports = router;