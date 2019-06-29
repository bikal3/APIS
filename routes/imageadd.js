const User = require('../Model/user'); //path for user.js in the model
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express");
var app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
    destination: "images",
    filename: function(req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, "bikal" + Date.now() + ext);
    }

});
var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { return cb(newError("You can upload only image files!"), false); }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1000000
    }
});


router.post('/uploadimage', upload.single('imageName'), (req, res) => {
    console.log(req.file)
    res.json(req.file.filename)
});
module.exports = router;