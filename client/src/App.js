import './App.css';
import React from "react";
import CRUDfunctions from './CRUDfunctions';
import {Paper, TextField} from '@material-ui/core';
import {Checkbox, Button} from '@material-ui/core';
import Forecast from "./Forecast";

class App extends CRUDfunctions {
  state = { tasks: [], currentTask: "", currentDescription: "" }
  render() {
    const {tasks} = this.state;
    return (
      <div className="App flex">
          <Paper elevation={3} className="container" style={{ margin: "100px", padding: "50px", background: "#0A4563",opacity:"0.90", radius: "150px"}}>
              <Forecast/>
              <div className="heading"><h1>Daily Planner</h1></div>
              <form
                  onSubmit={this.handleSubmit}
                  className="flex"
                  style={{ margin: "15px 0" }}
              >
                  <TextField
                      className="textF"
                      variant="outlined"
                      size="small"
                      style={{ width: "80%" }}
                      value={this.state.currentTask}
                      required={true}
                      onChange={this.handleChangeTask}
                      placeholder="Add New TO-DO"
                  />

                  <TextField
                    className="textF"
                      variant="outlined"
                      size="small"
                      style={{ width: "70%" }}
                      value={this.state.currentDescription}
                      required={true}
                      onChange={this.handleChangeDescription}
                      placeholder="Add New Description"
                  />
                
                  <Button
                      style={{ height: "40px", width: "10%", background: "white" }}
                      background-color="orange"
                      variant="outlined"
                      type="submit"
                  >
                      Add task
                  </Button>
              </form>
              
              <div>   
                  {tasks.map((models) => (
                      <Paper
                          key={models._id}
                          className="flex task_container"
                      >
                          <Checkbox
                              checked={models.completed}
                              onClick={() => this.handleUpdate(models._id)}
                              color="primary"
                          />
                          <div
                              className={
                                  models.completed
                                      ? "task line_through"
                                      : "task"
                              }
                          >   
                              {models.task}
                              <body>   </body>
                              {models.description}
                          </div>
                          <Button
                              onClick={() => this.handleDelete(models._id)}
                              color="secondary"
                          >
                              delete
                          </Button>
                      </Paper>
                  ))}
              </div>
          </Paper>
      </div>
  );
}
}

export default App;