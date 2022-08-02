const taskModel = require("../models/TaskSchema");

module.exports = async (req, res) => {
  // let {task_id,title,desc,priority,scheduled_date,ceation_date} = req.body;
  let {task} = req.body;
  await taskModel.findByIdAndUpdate(task._id,task,(err,done)=>{
    if(err) res.status(400).send("not amended");
    else    res.status(200).send("amended");
  });
  res.send("amended");
};
