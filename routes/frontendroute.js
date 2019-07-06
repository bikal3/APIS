var express = require('express');
var router = express.Router();
var Contact = require('../Model/contact');
var Post = require('../Model/post');
var Comment = require('../Model/comment');
var User = require('../Model/user');
var async = require("async");

router.post('/contact', (req, res) => {
    // res.header("allow-file-access-from-files", "*");
    var contact = new Contact();

    contact.fname = req.body.fname;
    contact.lname = req.body.lname;
    contact.subject = req.body.subject;
    contact.email = req.body.email;
    contact.message = req.body.message;

    console.log(contact);
    contact.save((err, doc) => {
        if (err) {
            res.send({ 'Success': 'Something is wrong' });
        } else {
            res.json('Your feedback successfully send');
        }
    });
});

router.post('/postDetail/:id', (req, res) => {
    var locals = {};
    async.parallel([
        function(callback) {
            Post.findById(req.params.id).populate('user').sort({ '_id': -1 }).exec(function(err, post) {
                if (err) return callback(err);
                locals.post = post;
                callback();
            });
        },
        function(callback) {
            Comment.find({ post_id: req.params.id }).populate('user').sort({ '_id': -1 }).exec(function(err, comments) {

                console.log(comments.comment);

                if (err) return callback(err);
                locals.comments = comments;

                callback();
            });
        }
    ], function(err) {
        if (err) return ("asds");
        res.json({
            post: locals.post,
            comments: locals.comments

        });
    });

    console.log(locals.comments);

});

router.post('/postbyid/:id', (req, response, next) => {
    console.log(req.body);
    Post.findById(req.params.id).then(docs => {

        response.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        response.status(500).json({ error: err });
    })
});
router.post('/userbyid/:id', (req, response, next) => {
    console.log(req.body);
    User.findById(req.params.id).then(docs => {

        response.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        response.status(500).json({ error: err });
    })
});

router.get('/commentbyid/:id', (req, response, next) => {
    console.log(req.body);
    Comment.find({ post_id: req.params.id }).then(docs => {

        response.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        response.status(500).json({ error: err });
    })
});
router.get('/ccommentbyid/:id', (req, response, next) => {
    console.log(req.body);
    Comment.find({ post_id: req.params.id }).populate('user').sort({ '_id': -1 }).exec(function(err, docs) {
        if (err) return callback(err);
        response.json(docs);
    })
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







module.exports = router;