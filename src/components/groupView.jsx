import React, { Component } from "react";
import { Card, Spinner, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import GroupHeader from "./groupHeader";
import Tasks from "./tasks";
import { getTasks, deleteTask, postTask } from "../services/taskService";
import LoginContext from "../contexts/loginContext";
import { getGroup } from "../services/groupService";
import TaskForm from "./taskForm";
import TaskTab from "./taskTab";
import SidebarMenu from "./common/sidebar";
import Members from "./members";
import LoadingScreen from './loadingScreen';

class GroupView extends Component {
  state = {
    taskCounter: [
      { title: "All Tasks", number: 0, theme: "dark", percent: 0.0 },
      { title: "Missing", number: 0, theme: "danger", percent: 0.0 },
      { title: "ToDo", number: 0, theme: "warning", percent: 0.0 },
      { title: "Completed", number: 0, theme: "success", percent: 0.0 },
    ],
    tasks: [],
    group: "",
    isLoading: true,
  };

  async componentDidMount() {
    this.setState({ isLoading: false });
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

    const total = due + toDo + completed;
    taskCounter[0].number = total;
    taskCounter[1].number = due;
    taskCounter[2].number = toDo;
    taskCounter[3].number = completed;

    taskCounter[0].percent = (100 * total) / total;
    taskCounter[1].percent = (100 * due) / total;
    taskCounter[2].percent = (100 * toDo) / total;
    taskCounter[3].percent = (100 * completed) / total;
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
    
    if (this.state.isLoading || !group){
      return <LoadingScreen />;
    }

    return (
      <>
        <div className="row mt-4 mb-4">
          <div className="col-12">
            {/* <Members members={group.members} admins={group.admins} theme={group.theme}/> */}
            <GroupHeader user={user} group={group} />
          </div>
        </div>
        <div className="row">
          <div className="stickyCustom col-sm-3 m-1 col-0">
            <Card >
              <ProgressBar className="m-2">
                {taskCounter.map(
                  (t) =>
                    t.title !== "All Tasks" && (
                      <ProgressBar
                        animated
                        label={t.title}
                        variant={t.theme}
                        now={t.percent}
                        key={t.title}
                      />
                    )
                )}
              </ProgressBar>
              <Card.Body>
                <small>
                  <Card.Subtitle className="mb-2 ">Upcoming</Card.Subtitle>
                  <Card.Text>Woohoo, no work due soon!</Card.Text>
                  <Card.Link href="#">View All</Card.Link>
                </small>
              </Card.Body>
            </Card>
          </div>
          <div className="col-12 col-sm-8">
            <TaskForm
              onPost={this.handleTaskPost}
              theme={group.theme}
              user={user}
              group={group}
              taskCounter={taskCounter}
            />

            {tasks && (
              <TaskTab
                theme={group.theme}
                tasks={tasks}
                user={user}
                taskCounter={taskCounter}
                onPost={this.handleTaskPost}
                onDelete={this.handleTaskDelete}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

GroupView.contextType = LoginContext;

export default GroupView;
