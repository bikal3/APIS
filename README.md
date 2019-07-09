# Your Project Title Here
Name: Bikal Shrestha 
CollegeID: 160374
University ID:9635614

Batch: Jan19D

Brief description of the domain of your project!
On the market, there are many information gathering process regarding the different places of Nepal that helps the travelers 
to visit those places. People find their travel destinations from different sources like books, website, recommendations etc. 
but the information that are present there only highlight the famous places of the country like the cultural heritages, cities etc. 
But the application aims to provide information about the hidden treasures of the country the places where there are less tourist 
attraction and the places where the real beauty of the country can be found be it the landscape, people or nature. The application 
also tries to advertise infamous places of Nepal that should be made known to the rest of the world. Finally the main focus of my 
application is to promote the tourism. On this project user can simple post their photos with their expreiences. Different user can 
comment or express thier expreiences on other user post and they can delete or update thier own create post.


## List of Main Features
Main Techinal Feature of my project are as given below:
a) User can add Post of thier travel diaries.
b) User can add comment on particular post upload by other users. 
c) User can delete and update their own post.
d) User can update thier own profile with image. 
e) User can contact to the admin with out login into the site.
f) Admin can delete the user ,post and feedback.
g) Admin can update his/her own profile with image.

## API Documentation
List out your main APIs and its sample input and output!

I have used nodejs ,MongoDb express and mongoose to develop the API for the project. The main work of the api is to post the GET,POST,DELETE and PUT
Here are the some sample input and output of my api 

Code for addding post:

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
            if (user._id == req.body.user) {
                var post = new Post();

                post.title = req.body.title;
                post.location = req.body.location;
                post.image = req.body.image;
                post.description = req.body.description;
                post.user = req.body.user;
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

If user input the data of the post then the output would be 'Success': 'Post successfully Placed!!!' which would be printed on console.
 
 Another main api I have used is through populate.
  
  Code for veiwing comment and post
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

To get details the of comment on particular post  about post method is applied while retriveing the data it shows the data of post with the user and 
the comment on the post with specific user.







