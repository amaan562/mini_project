const taskSchema = require("../models/TaskSchema");

module.exports =async (req, res) => {
  const { taskTitle } = req.params;
  let tm = new taskSchema();
  tm.title = taskTitle;
  await tm.save();
  res.send("got it");
};
