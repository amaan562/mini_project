const taskSchema = require("../models/TaskSchema");

module.exports =async (req, res) => {
  const { taskTitle } = req.params;
  let { username } = req.body;
  let tm = new taskSchema();
  tm.title = taskTitle;
  tm.username = username;
  tm.creation_date = new Date();
  await tm.save();
  res.send("got it");
};
