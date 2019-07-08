var express = require('express');
var router = express.Router();
var User = require('../Model/user');
var Contact = require('../Model/contact');
var Post = require('../Model/post');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var app = express();

// ====================================Middleware of admin=======================================//
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
router.post('/profile', (req, res) => {
    User.findById({
        _id: req.body._id
    }, function(err, user) {
        if (err) {
            res.json({ 'Success': 'Post Failed Something is wrong. Log in first!!1' });
        } else if (!user) {
            res.json('User not found ');
        } else if (user) {
            res.json(user);
        }
    });
});




// ====================================Add User=======================================//
router.post('/adduser', (req, res) => {
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


// ====================================User List=======================================//
router.post('/userlist', (req, response, next) => {
    console.log(req.body);
    User.find().then(docs => {

        response.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        response.status(500).json({ error: err });
    })
});

//========================================User Edit=======================================//
router.post('/useredit', (req, res) => {
    User.findById(req.body._id, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
    });
});
// ====================================Update User=======================================//
router.put('/userupdate', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ 'Success': 'Profile Updated Successfully!!', 'username': doc.username });
        } else {
            console.log('Error during record update : ' + err);
        }
    });
});


//=====================================Delete User=========================================// 
router.post('/userdelete', (req, res) => {
    User.findByIdAndRemove(req.body._id).then(result => {
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

//======================================Contact List========================================//
router.post('/contactlist', (req, response, next) => {
    console.log(req.body);
    Contact.find().then(docs => {

        response.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        response.status(500).json({ error: err });
    })
});

//=====================================Delete Contact=========================================// 
router.post('/contactdelete', (req, res) => {
    Contact.findByIdAndRemove(req.body._id).then(result => {
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
// //======================================Post List========================================//
// router.post('/postlist', (req, response, next) => {
//     console.log(req.body);
//     Post.find().then(docs => {

//         response.status(200).json(docs);
//     }).catch(err => {
//         console.log(err);
//         response.status(500).json({ error: err });
//     })
// });
//======================================Post List========================================//
router.post('/postlist', (req, response, next) => {
        console.log(req.body);
        Post.find().populate('user').sort({ '_id': -1 }).exec(function(err, docs) {
            if (err) return callback(err);
            response.json(docs);
        })
    })
    //========================================Post Edit=======================================//
router.post('/postedit', (req, res) => {
    Post.findById(req.body._id, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
    });
});

//=====================================Delete Post=========================================// 
router.post('/postdelete', (req, res) => {
    Post.findByIdAndRemove(req.body._id).then(result => {
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
// ====================================Update post=======================================//
router.put('/postupdate', (req, res) => {
    Post.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ 'Success': 'Profile Updated Successfully!!', 'username': doc.username });
        } else {
            console.log('Error during record update : ' + err);
        }
    });
});




module.exports = router;