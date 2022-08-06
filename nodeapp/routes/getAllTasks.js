const taskModel = require("../models/TaskSchema");

module.exports = async (req, res) => {
  const { orderByField } = req.params;
  const direction = req.params.direction === "Descending" ? -1 : 1;
  try{
    let prom = await taskModel.find({}).sort([[orderByField , direction]])
    res.status(200).send(prom);
  }catch(err){  res.status(400).send(err) }
};
