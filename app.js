var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongo = require("mongoose");
const http = require("http");
const mongoconnection = require("./config/mongoconnection.json");
const socketIo = require("socket.io");
const hotelRoute = require("./routes/HotelRoutes");
const chambreRoute = require("./routes/ChambreRoutes");
const {
  reserverSocket,
  GetAllSocket,
} = require("./controllers/ChambreController");

mongo
  .connect(mongoconnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/hotel", hotelRoute);
app.use("/api/chambre", chambreRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  // const nom_client = prompt("Please enter your name");
  // socket.emit("enterName", nom_client);
  
  socket.on("reserverSocket", (data) => {
    console.log("Received reserverSocket event with data:", data);
    reserverSocket(data, io);
  });

  socket.on("getAllSocket", () => {
    console.log("Received getAllSocket event");
    GetAllSocket(io);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => console.log("server is run (Port 3000)"));
module.exports = app;
