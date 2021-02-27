import React, { Component } from "react";
import { Card, Col, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import GroupHeader from "./groupHeader";
import Tasks from "./tasks";
import { getTasks, deleteTask, postTask } from "../services/taskService";
import LoginContext from "../contexts/loginContext";
import { getGroup } from "../services/groupService";
import TaskForm from "./taskForm";
import TaskTab from "./taskTab";

class GroupView extends Component {
  state = {
    taskCounter: [
      { title: "Missed", number: 0, theme: "danger" },
      { title: "ToDo", number: 0, theme: "warning" },
      { title: "Completed", number: 0, theme: "success" },
    ],
    tasks: [],
    group: "",
  };

  async componentDidMount() {
    const groupId = this.props.match.params.id;
    const { data: group } = await getGroup(groupId);
    this.setState({ group });
    const { data: tasks } = await getTasks(groupId);
    this.setState({ tasks });
    this.setTaskCounter();
  }

  setTaskCounter = async () => {
    const { tasks } = this.state;
    if (!tasks) return;

    let due = 0,
      toDo = 0,
      completed = 0;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed) {
        completed++;
      } else if (new Date(tasks[i].dueTime) < new Date()) due++;
      else toDo++;
    }
    const taskCounter = [...this.state.taskCounter];
    taskCounter[0].number = due;
    taskCounter[1].number = toDo;
    taskCounter[2].number = completed;
    this.setState({ taskCounter });
  };

  handleTaskDelete = async (id) => {
    const { status } = await deleteTask(id);
    if (status === 200) {
      let { tasks } = this.state;
      tasks = tasks.filter((task) => task._id !== id);
      this.setState({ tasks });
    }
  };

  handleTaskPost = async ({
    title,
    description,
    dueTime,
    completed = false,
    _id: taskId,
  }) => {
    const response = await postTask({
      title,
      description,
      dueTime,
      completed,
      groupId: this.state.group._id,
      taskId,
    });
    if (response.status === 200 && taskId !== null) {
      const tasks = [...this.state.tasks, response.data];
      this.setState({ tasks });
      this.setTaskCounter();
    }
  };

  render() {
    const { user } = this.context;
    const { taskCounter, tasks, group } = this.state;
    if (!group) return <div></div>;

    return (
      <>
        <div className="row mt-4 mb-4">
          <div className="col-12">
            <GroupHeader user={user} group={group} />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <TaskForm
              onPost={this.handleTaskPost}
              theme={group.theme}
              user={user}
              group={group}
            />
            {tasks && (
              <TaskTab
                theme={group.theme}
                tasks={tasks}
                user={user}
                onPost={this.handleTaskPost}
                onDelete={this.handleTaskDelete}
              />
            )}
          </div>
          <div className="col-3">
            {taskCounter &&
              taskCounter.map((task) => (
                <Card
                  border={task.theme}
                  key={task.title}
                  bg="light"
                  style={{ width: "15rem" }}
                  className="mb-2 text-center"
                >
                  <Card.Header>
                    <h5>{task.title}</h5>
                  </Card.Header>
                  <Alert variant={task.theme}>
                    <Card.Body>
                      <Card.Title>
                        <h1>{task.number}</h1>
                      </Card.Title>
                    </Card.Body>
                  </Alert>
                </Card>
              ))}
          </div>
        </div>
      </>
    );
  }
}

GroupView.contextType = LoginContext;

export default GroupView;
