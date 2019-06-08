const moongose = require('mongoose');

const User = moongose.model('User', {

    fullName: {
        type: String
    },
    email: {
        type: String

    },
    password: {
        type: String
    },
    image: {
        type: String
    }

})
module.exports = User;