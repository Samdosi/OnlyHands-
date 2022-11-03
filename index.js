const http = require('http');
require('dotenv').config();

const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const profile_route = require("./routes/profile");
const app = express();
const serverChat = http.createServer(app);
const io = new Server(serverChat, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  }
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Potentially useless lines
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const PORT = process.env.PORT || 5000;


app.use('/api/user', userRoute);
app.use('/api/profile', profile_route);


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

mongoose.connect(
  process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected successfully");
});
db.on("error", console.error.bind(console, "connection error: "));


serverChat.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
