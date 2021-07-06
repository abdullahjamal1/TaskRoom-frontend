import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LoadingScreen from "../loadingScreen";
import { getTasks, deleteTask, postTask } from "../../services/taskService";
import TaskColumn from "../task/taskColumns";

const WorkFlow = ({ props }) => {
  const [tasks, setTasks] = useState(null);
  const [taskCards, setTaskCards] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(false);
    const groupId = props.match.params.id;

    const { data: tasks } = await getTasks(groupId);
    setTasks(tasks);
  };

  useEffect(() => {
    if (!tasks) {
      loadData();
      return;
    }
    const taskCards = [
      {
        label: "To Do",
        color: "lightBlue",
        actions: "addTask",
        onPost: "handleTaskPost",
        tasks: tasks.filter((t) => t.status === "To Do"),
      },
      {
        label: "Doing",
        color: "lightYellow",
        tasks: tasks.filter((t) => t.status === "Doing"),
      },
      {
        label: "Done",
        color: "lightGreen",
        tasks: tasks.filter((t) => t.status === "Done"),
      },
    ];
    setTaskCards(taskCards);
  }, [tasks]);

  if (!taskCards) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Grid container direction="row" spacing={2}>
        {taskCards.map((t) => (
          <Grid item xs={12} sm={4}>
            <TaskColumn key={t.label} {...t} props={props} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkFlow;
