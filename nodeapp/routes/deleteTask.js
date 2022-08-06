const taskModel = require("../models/TaskSchema");

module.exports = async (req, res) => {
  const { taskID } = req.params;

  taskModel.findByIdAndRemove(taskID,(err,done)=>{
    if(err) res.status(400).send("not deleted");
    else    res.status(200).send("deleted");
  })
};