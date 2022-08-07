const taskModel = require("../models/TaskSchema");

module.exports = async (req, res) => {
  // let {task_id,title,desc,priority,scheduled_date,ceation_date} = req.body;
  // console.log(JSON.stringify(req.body));
  let {task} = req.body;
  // console.log("this is the task: " + JSON.stringify(task));
  try{
    let prom = await taskModel.findOneAndUpdate({_id: req.params.taskID},{$set:task});
    res.status(200).send(prom);
  }catch(err){  res.status(400).send("not amended") }
  // res.send("amended");
};
