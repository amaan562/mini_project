const express = require("express");
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require("path");
var bodyParser = require('body-parser');
const app = express();
const getAllTasks = require("./routes/getAllTasks.js");
const addTask = require("./routes/addTask.js");
const amendTask = require("./routes/amendTask.js");
const deleteTask = require("./routes/deleteTask.js");
const loginUser = require("./routes/loginUser.js");
const signupUser = require("./routes/signupUser.js");
const getName = require("./routes/getName.js");
const port = process.env.PORT;
const cors = require("cors");

const options = {
    origin: 'http://localhost:3000',
}
app.use(cors(options))
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect(process.env.DATABASE_ACCESS1, () => console.log("Database1 connected"));

app.get("/allTasks/:username/:orderByField/:direction", (req, res) => {
  getAllTasks(req, res);
});

app.put("/amendTask/:taskID", (req, res) => {
  amendTask(req, res);
});

app.post("/addTask/:taskTitle", (req, res) => {
  addTask(req, res);
});

app.delete("/deleteTask/:taskID", (req, res) => {
  deleteTask(req, res);
});

app.post("/login", (req, res) => {
  loginUser(req, res);
});

app.post("/signup", (req, res) => {
  signupUser(req, res);
});

app.get("/getName/:username", (req, res) => {
  getName(req, res);
});
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (_req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//   });
// }

app.listen(5000,()=>console.log("listening on 5000"));
