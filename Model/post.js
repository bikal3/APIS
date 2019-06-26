var mongoose = require('mongoose');
var Schema = mongoose.Schema;

feedbackSchema = new Schema({
    unique_id: Number,
    title: String,
    location: String,
    image: String,
    description: String,
    user: String,
});
Post = mongoose.model('Post', feedbackSchema);

module.exports = Post;