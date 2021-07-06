import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Container, Button, Paper } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import { useState } from "react";
import { getTask, updateTask } from "../../services/taskService";
import CustomizedTimeline from "./timeline";
import TaskCardDetailed from "./taskCardDetailed";
import LoadingScreen from "../loadingScreen";
import TimelineIcon from "@material-ui/icons/Timeline";
import CommentContainer from "../comment/commentContainer";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import moment from "moment";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default function Task(props) {
  const { groupId, taskId } = props.match.params;

  const [task, setTask] = useState(null);
  const [comment, setComments] = useState(null);

  const fetchTask = async () => {
    const { data: task } = await getTask(taskId, groupId);
    setTask(task);
  };
  const fetchComments = async () => {};

  useEffect(() => {
    fetchTask();
    fetchComments();
  }, []);

  const onPost = (newTask) => {
    setTask(newTask);
  };

  const handleStatusChange = async (action) => {
    const { title, description, dueTime, status } = task;
    let updatedTask;

    if (!dueTime) updatedTask = { title, description, status, action };
    else updatedTask = { title, description, status, dueTime, action };

    const { data: newTask } = await updateTask(
      task._id,
      task.groupId,
      updatedTask
    );
    setTask(newTask);
  };

  if (!task) return <LoadingScreen />;

  return (
    <Container>
      <Grid
        item
        container
        direction="row"
        style={{ marginTop: 20 }}
        spacing={1}
      >
        <Grid item container direction="column" xs={12} sm={7} spacing={1}>
          <Grid item>
            <TaskCardDetailed task={task} onStatusChange={handleStatusChange} />
          </Grid>
          <Grid item>
            <CommentContainer
              taskId={task._id}
              groupId={task.groupId}
              {...props}
              theme="primary"
            />
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={5}>
          <Grid item container>
            <Files />
          </Grid>
          <Grid item container>
            <CustomizedTimeline timeline={task.timeline} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: "6px 8px",
    margin: theme.spacing(1),
  },
  gridList: {
    height: 250,
  },
}));

const files = [
  {
    _id: "1",
    name: "picture",
    owner: { name: "Abdullah" },
    uploadDate: "July 5, 2021 1:22 PM",
    size: "11",
  },
  {
    _id: "2",
    name: "logFile",
    owner: { name: "Abdullah" },
    uploadDate: "July 5, 2021 1:22 PM",
    size: "11",
  },
  {
    _id: "1",
    name: "picture",
    owner: { name: "Abdullah" },
    uploadDate: "July 5, 2021 1:22 PM",
    size: "11",
  },
  {
    _id: "2",
    name: "logFile",
    owner: { name: "Abdullah" },
    uploadDate: "July 5, 2021 1:22 PM",
    size: "11",
  },
  {
    _id: "1",
    name: "picture",
    owner: { name: "Abdullah" },
    uploadDate: "2020-12-12T11:10:11:000Z",
    size: "11",
  },
  {
    _id: "2",
    name: "logFile",
    owner: { name: "Abdullah" },
    uploadDate: "2020-12-12T11:10:11:000Z",
    size: "11",
  },
  {
    _id: "1",
    name: "picture",
    owner: { name: "Abdullah" },
    uploadDate: "2020-12-12T11:10:11:000Z",
    size: "11",
  },
  {
    _id: "2",
    name: "logFile",
    owner: { name: "Abdullah" },
    uploadDate: "2020-12-12T11:10:11:000Z",
    size: "11",
  },
  {
    _id: "1",
    name: "picture",
    owner: { name: "Abdullah" },
    uploadDate: "2020-12-12T11:10:11:000Z",
    size: "11",
  },
  {
    _id: "2",
    name: "logFile",
    owner: { name: "Abdullah" },
    uploadDate: "2020-12-12T11:10:11:000Z",
    size: "11",
  },
];

function Files()  {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.paper}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item secondary={"Secondary text"}>
          <FolderIcon fontSize="small" />
          {" Files"}
        </Grid>
        <Grid item secondary={"Secondary text"}>
          <Button
            variant="contained"
            size="small"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
      <hr />
      <div className={classes.root}>
        <GridList cellHeight={67} className={classes.gridList} cols={3}>
          {files.map((file, index) => (
            <GridListTile key={file._id} cols={3}>
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.name}
                  secondary={
                    <Grid container direction="row" alignItems="center">
                      <small>{file.owner.name}</small>
                      <FiberManualRecordIcon style={{ fontSize: 5, margin: 2 }} />
                      <small>
                        uploaded {moment(file.uploadDate).fromNow()}
                      </small>
                      <FiberManualRecordIcon style={{ fontSize: 5, margin: 2 }} />
                      <small>{file.size} MB</small>
                    </Grid>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              //{" "}
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Paper>
  );
}
