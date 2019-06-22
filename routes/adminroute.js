var express = require('express');
var router = express.Router();
var User = require('../Model/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var app = express();



router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, "secretmessage", function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
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
    console.log(req.body);
    User.findOne({
        _id: req.body.id
    }, function(err, user) {
        if (err) {
            res.json({ 'Success': 'Post Failed Something is wrong. Log in first!!' });
        } else if (!user) {
            res.json({ 'Success': 'User is not Allowed' });
        } else if (user) {
            if (user.admin) {
                next();
            } else {
                res.json({ 'Success': 'Access Denied!!' });
            }
        }

    });

});



router.post('/add_user', (req, res) => {
    var hashpassword = bcrypt.hashSync(req.body.password, 10);
    var user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = hashpassword;
    user.passwordConf = hashpassword;
    user.user_status = req.body.user_status;
    if (req.body.user_type == "Admin") {
        user.admin = true;
    } else {
        user.admin = false;
    }

    user.save(function(err, Person) {
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            res.json({ 'Success': 'User successfully inserted!!!' });
        }
    });


});



router.post('/userlist', (req, response, next) => {
    console.log(req.body);
    User.find().then(docs => {

        response.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        response.status(500).json({ error: err });
    })
});


router.post('/userdelete/:_id', (req, res) => {
    User.findByIdAndRemove(req.params._id).then(result => {
            console.log(result);
            res.status(201).json({
                message: "Delete Succefully"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
});
module.exports = router;