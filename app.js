const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require('./Database/connection');
const userRouter = require('./routes/userroute');
const imageRouter = require('./routes/imageadd');
const adminRouter = require('./routes/adminroute');
const contactRouter = require('./routes/contactroute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.send("blaba");
})

app.use(userRouter);
app.use(imageRouter);
app.use(adminRouter);
app.use(contactRouter);


// listen to port for incoming requests
app.listen(5000);
console.log('Server runs at http://localhost:' + 5000);