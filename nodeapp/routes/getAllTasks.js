const taskModel = require("../models/TaskSchema");

module.exports = async (req, res) => {
  const { orderByField } = req.params;
  const direction = req.params.direction === "Descending" ? -1 : 1;
  await taskModel.find({},null,{sort: {orderByField : direction}},(err,tasks)=>{
    if(err)   res.sendstatus(400);
    else      res.status(200).send(tasks);
  });
};
