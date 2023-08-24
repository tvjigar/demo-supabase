const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const http = require("http").createServer(app);

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static("routes"));

const port = 4001;

app.get("/", function (req, res) {
  res.status().send(200);
});

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");

app.use("/auth", authRoute.routes);
app.use("/product", productRoute.routes);

http.listen(port, function (error) {
  if (error) throw error;
  console.log("Server created Successfully", port);
});
