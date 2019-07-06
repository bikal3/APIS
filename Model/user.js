var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model


module.exports = mongoose.model('User', new Schema({
    unique_id: String,
    name: String,
    email: String,
    username: String,
    password: String,
    passwordConf: String,
    user_status: String,
    admin: Boolean,
    desc: String,
    image: {
        type: String,
        default: "user.png",
    },

}));