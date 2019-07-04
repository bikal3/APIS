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

// router.get('/postDetail/:id', (req, res) => {
//     var locals = {};
//     async.parallel([
//         function(callback) {
//             Post.findById(req.params.id, function(err, post) {
//                 if (err) return callback(err);
//                 locals.post = post;
//                 callback();
//             });
//         },
//         function(callback) {
//             Comment.find({ post_id: req.params.id }, function(err, comments) {
//                 if (err) return callback(err);
//                 locals.comments = comments;
//                 console.log(comments);
//                 callback();
//             }).sort({ '_id': -1 });
//         }
//     ], function(err) {
//         if (err) return next(err);

//         res.json({
//             post: locals.post,
//             comments: locals.comments,
//         });
//     });
//     console.log(locals.comments);

// });


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


module.exports = router;