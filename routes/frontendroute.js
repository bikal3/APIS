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
            res.send({ "Success": 'Your feedback successfully send. We will call you soon' });
        }
    });
});

// router.post('/postDetail/:id', (req, res) => {
//     var locals = {};
//     async.parallel([
//         //Load user Data
//         function(callback) {
//             Post.findById(req.params.id, function(err, post) {
//                 if (err) return callback(err);
//                 locals.post = post;
//                 callback();
//             });
//         },
//         //Load posts Data
//         function(callback) {
//             Comment.find({ post_id: req.params.id }).populate('user').sort({ '_id': -1 }).exec(function(err, comments) {

//                 console.log(comments.comment);

//                 if (err) return callback(err);
//                 locals.comments = comments;
//                 // console.log(comments);
//                 callback();
//             }).sort({ '_id': -1 });
//         }

//     ], function(err) {
//         if (err) return ("asds");
//         res.json({
//             post: locals.post,
//             comments: locals.comments,
//             user: locals.user

//         });
//     });

//     console.log(locals.user);

// });

router.post('/postDetail/:id', (req, res) => {
    var locals = {};
    async.parallel([
        //Load user Data
        function(callback) {
            Post.findById(req.params.id).populate('user').sort({ '_id': -1 }).exec(function(err, post) {
                if (err) return callback(err);
                locals.post = post;
                callback();
            });
        },
        //Load posts Data
        function(callback) {
            Comment.find({ post_id: req.params.id }).populate('user').sort({ '_id': -1 }).exec(function(err, comments) {

                console.log(comments.comment);

                if (err) return callback(err);
                locals.comments = comments;
                // console.log(comments);
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

    // console.log(locals.comments);

});
module.exports = router;