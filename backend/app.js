const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//initilize the express here
app.use(express.json());

//initilize cookie Parser here
app.use(cookieParser());
//route imports

//Api Initilization
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

module.exports = app;
