import React, { Component } from "react";
import { getTask } from "../../services/taskService";

class Task extends Component {
  state = { task: {} };

  async componentDidMount() {
    const taskId = this.props.match.params.id;
    const { data: task } = await getTask(taskId);
    console.log(taskId, task);
    this.setState({ task });
  }

  render() {
    if (!this.state.task) return <></>;
    return <div>task </div>;
  }
}

export default Task;
