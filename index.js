const http = require('http');
require('dotenv').config();

const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const profile_route = require("./routes/profile");
const matchRoute = require("./routes/match")
const app = express();
const serverChat = http.createServer(app);
const io = new Server(serverChat, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  }
})
const path = require("path");
const { verify } = require('crypto');
const { auth_jwt } = require('./middleware/auth_jwt');
const {addMessage} = require('./controllers/chat');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 5000;

app.use('/api/user', userRoute);
app.use('/api/profile', profile_route);
app.use("/api/match/", matchRoute);

app.get("/api/verify", auth_jwt, (req, res) => {
  res.status(200).end();
});
app.get("/api/*", (req, res) => {
  res.status(404).end();
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("sendMessage", (data) => {
    addMessage(data);
    socket.to(data.room).emit("receiveMessage", data);
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

// For product deployment
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

serverChat.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
