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
app.use(express.json());
// app.use(cors);

app.get("/", function(req, res) {
    res.send("Travel Nepal Ai");
})
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

app.use('/api/users', cors(corsOptions), userRouter);
app.use('/api', cors(corsOptions), imageRouter);
app.use('/api/admin', cors(corsOptions), adminRouter);
app.use('/api', cors(corsOptions), contactRouter);

// app.use(userRouter);
// app.use(imageRouter);
// app.use(adminRouter);
// app.use(contactRouter);


// listen to port for incoming requests
app.listen(5000);
console.log('Server runs at http://localhost:' + 5000);