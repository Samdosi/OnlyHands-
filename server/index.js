const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoute = require('./routes/user');

const app = express();
app.use(cors());

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


const PORT = process.env.PORT || 5000;

app.use('/user', userRoute);


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


app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
