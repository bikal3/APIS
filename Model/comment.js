var mongoose = require('mongoose');
var Schema = mongoose.Schema;

commentSchema = new Schema({
    uid: Number,
    post_id: Schema.Types.ObjectId,
    comment: String,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;