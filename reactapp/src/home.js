import React, { Component } from "react";
// import { Navigate } from "./Navigate";
import Task from "./components/Task";
import NewTaskForm from "./components/NewTaskForm";
import SortBy from "./components/SortBy";
import "./css/App.css";
import { Navigate } from "react-router-dom";
import { encodeUpdateValue, convertToNumber } from "./utilityFunctions";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      username: null,
      error: null,
      isFetched: false,
      tasks: [],
      updatedTask: null,
      taskOrder: {
        orderByField: "creation_date",
        direction: "Ascending",
      },
      newTaskTitle: "",
      redirect: false
    };

    this.getAllTasks = this.getAllTasks.bind(this);
    this.putTaskUpdate = this.putTaskUpdate.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
    this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
    this.postNewTask = this.postNewTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
  }

  async getAllTasks() {
    const { orderByField, direction } = this.state.taskOrder;
    const res = await fetch(
      `http://localhost:5000/allTasks/${this.state.username}/${orderByField}/${direction}`,{
            method: "GET",
        });
    try {
      const data = await res.json();
      this.setState({
        isFetched: true,
        tasks: data,
      });
    } catch (error) {
      this.setState({
        error,
        isFetched: true,
      });
    }
  }

  handleTaskUpdate(e) {
    const taskID = e.target.parentNode.id;
    const fieldToUpdate = e.target.name;
    let updateValue;

    if (fieldToUpdate === "completed") {
      updateValue = e.target.checked;
    } else if (fieldToUpdate === "scheduled_date") {
      if (e.target.value !== "") {
        updateValue = e.target.value;
        // updateValue = e.target.value + "T00:00:00.000Z";
      } else {
        updateValue = null;
      }
    } else {
      updateValue = e.target.value;
    }
    console.log("id: "+taskID+" , field: "+fieldToUpdate+" , value: "+updateValue);
    var temp = null;
    const updatedTaskState = this.state.tasks.map((task) => {
      const updateTask = (task) => {
        const taskCopy = JSON.parse(JSON.stringify(task));
        taskCopy[fieldToUpdate] = updateValue;

        return taskCopy;
      };

      if (task._id === taskID) {
        temp  =  updateTask(task);
        // console.log("updated state: "+temp); 
        return temp;
      } else {
        return task;
      }
    });

    this.setState({ 
      tasks: updatedTaskState,
      updatedTask: temp
    });
  }

  async putTaskUpdate(e) {
    // const taskID = e.target.parentNode.id;
    const taskID = this.state.updatedTask._id;
    const fieldToUpdate = e.target.name;
    let updateValue;

    this.state.tasks.forEach((val) => {
      if (val._id === taskID) updateValue = val[fieldToUpdate];
    });

    if (fieldToUpdate === "title" && updateValue === "") return;

    // if (fieldToUpdate === "title" || fieldToUpdate === "description") {
    //   updateValue = encodeUpdateValue(updateValue);
    // }

    if (updateValue === "") updateValue = "null";

    // updateValue = e.target.value;
    var task = this.state.updatedTask;
    const res = await fetch(`http://localhost:5000/amendTask/${taskID}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task : task })
    });
    console.log("return : "+JSON.stringify(res));
  }
 
  async deleteTask(taskID) {
    const response = window.confirm(
      "Are you sure that you want to delete this task?"
    );

    if (response) {
      const res = await fetch(`http://localhost:5000/deleteTask/${taskID}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        this.getAllTasks(false);
      } 
    }
  }

  handleNewTaskChange(e) {
    const newTaskTitle = e.target.value;

    this.setState({ newTaskTitle });
  }

  async postNewTask() {
    const newTaskTitle = this.state.newTaskTitle;

    if (newTaskTitle === "") return;

    const res = await fetch(`http://localhost:5000/addTask/${newTaskTitle}`, {
      method: "POST",
      body: {
        username: this.username
      }
    });

    if (res.status === 200) {
      this.setState({ newTaskTitle: "" });
      this.getAllTasks();
    }
  }

  sortTasks(selectValue) {
    const { orderByField, direction } = selectValue;

    this.setState({
      taskOrder: {
        orderByField,
        direction,
      }
    });

    this.getAllTasks();
  }

  async componentDidMount(){
      try{
          var user = await localStorage.getItem("user");
          this.setState({
              username: user
          })
          this.getAllTasks();
      }catch(e){
          let path = "/login";
          this.setState({
            redirect: true
          })
          // useNavigate(path);
      }
  }

  render() {
    const { error, isFetched } = this.state;
    if (error) {
      return (
        <section>
          <p>Sorry, something went wrong. Please try again.</p>
        </section>
      );
    } else if (!isFetched) {
      return (
        <section>
          <p>Your tasks are loading...</p>
        </section>
      );
    } else {
      const tasks = this.state.tasks.map((task) => {
        return (
          <Task
            key={task.task_id}
            task={task}
            handleTaskUpdate={this.handleTaskUpdate}
            putTaskUpdate={this.putTaskUpdate}
            deleteTask={this.deleteTask}
          />
        );
      });
      return (
        <section className="tasksContainer">
          <NewTaskForm
            newTaskTitle={this.state.newTaskTitle}
            handleNewTaskChange={this.handleNewTaskChange}
            postNewTask={this.postNewTask}
          />
          {tasks.length > 0 ? <SortBy sortTasks={this.sortTasks} /> : null}
          {tasks}
          { this.state.redirect && <Navigate to='/login' replace={true}/>}
        </section>
        
      );
    }
  }
}

export default Home;
