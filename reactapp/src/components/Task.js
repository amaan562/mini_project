import React from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import "../css/Task.css";

const Task = (props) => {
  const {
    _id: taskID,
    title: taskTitle,
    description: taskDesc,
    completed: taskCompleted,
    scheduled_date: taskScheduledDt,
    priority: priorityDesc,
  } = props.task;
  const cleanedScheduledDt = taskScheduledDt
    ? taskScheduledDt.substring(0, 10)
    : "";
  const priorityColour =
    priorityDesc === "High" ? "task__priority--high" : "task__priority";
  return (
    <div className="task">
      <form id={taskID} autoComplete="off">
        <input
          className="task__title"
          type="text"
          name="title"
          value={taskTitle}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <input
          className="task__completed"
          type="checkbox"
          name="completed"
          checked={taskCompleted}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <textarea
          className="task__desc"
          type="text"
          name="description"
          rows="3"
          cols="20"
          placeholder="..."
          value={taskDesc}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <input
          className="task__scheduledDt"
          type="date"
          name="scheduled_date"
          value={cleanedScheduledDt}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <select
          className={priorityColour}
          name="priority"
          value={priorityDesc}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <DeleteTaskButton deleteTask={props.deleteTask} taskID={taskID} />
      </form>
    </div>
  );
};

export default Task;
