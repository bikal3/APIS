const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require('./Database/connection');
const userRouter = require('./routes/userroute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.send("blaba");
})

app.use(userRouter);

// listen to port for incoming requests
app.listen(5000);