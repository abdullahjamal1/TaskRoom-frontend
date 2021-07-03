import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GroupHeader from "./groupHeader";
import Tasks from "../task/tasks";
import { getTasks, deleteTask, postTask } from "../../services/taskService";
import LoginContext from "../../contexts/loginContext";
import { getGroup } from "../../services/groupService";
import LoadingScreen from "../loadingScreen";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TaskCard from "../task/taskCard";

export default function GroupView(props) {
  const [tasks, setTasks] = useState(null);
  const [group, setGroup] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { user } = useContext(LoginContext);

  const loadData = async () => {
    setLoading(false);

    const groupId = props.match.params.id;

    const { data: group } = await getGroup(groupId);
    setGroup(group);

    const { data: tasks } = await getTasks(groupId);
    setTasks(tasks);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTaskDelete = async (id) => {
    const { status } = await deleteTask(id);
    if (status === 200) {
      tasks = tasks.filter((task) => task._id !== id);
      setTasks(tasks);
    }
  };

  const handleTaskPost = async (task) => {
    const response = await postTask(task);

    if (response.status === 200 && task._id !== null) {
      const tasks = [...tasks, response.data];
      setTasks(tasks);
    }
  };
  // const { user } = context;

  if (isLoading || !group) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid
          item
          container
          direction="row"
          spacing={2}
          style={{ marginTop: 20 }}
        >
          <Grid item xs={12} sm={8}>
            <GroupHeader user={user} group={group} />
          </Grid>
          <Grid></Grid>
        </Grid>
        <Grid item >
            <TaskCard />
        </Grid>
        {/* <TaskForm
              onPost={this.handleTaskPost}
              theme={group.theme}
              user={user}
              group={group}
              taskCounter={taskCounter}
      /> */}
      </Grid>
    </Container>
  );
}
