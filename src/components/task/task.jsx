import React, { useEffect, useState, useRef} from "react";
import { Grid } from "@material-ui/core";
import { Container, Button, Paper, Link } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import { getTask, updateTask, uploadFile, deleteFile } from "../../services/taskService";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { MenuItem } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Input from "@material-ui/core/Input";

export default function Task(props) {
  const { groupId, taskId } = props.match.params;

  const [task, setTask] = useState(null);

  const fetchTask = async () => {
    const { data: task } = await getTask(taskId, groupId);
    setTask(task);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handlePost = (newTask) => {
    setTask(newTask);
  };

  const handleStatusChange = async (action) => {
    let { title, description, dueTime, status, tags, collaborators } = task;
    let updatedTask;

    collaborators = collaborators.map((c) => c.email);

    if (!dueTime)
      updatedTask = { title, description, status, action, tags, collaborators };
    else
      updatedTask = {
        title,
        description,
        status,
        dueTime,
        action,
        tags,
        collaborators,
      };

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
            <TaskCardDetailed
              task={task}
              onStatusChange={handleStatusChange}
              onPost={handlePost}
            />
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
            <Files taskFiles={task.files} props={props} />
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
    // justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: "6px 8px",
    margin: theme.spacing(1),
    width: 400
  },
  gridList: {
    height: 200,
  },
}));

function Files({ taskFiles, props }) {

  const {taskId, groupId} = props.match.params;
  const classes = useStyles();
  let [files, setFiles] = useState(taskFiles);
  let uploadRef = useRef(null);

  const handleFileUpload = async(file) =>{

    const formData = new FormData();
    formData.append('file', file);
    const {data: newFile} = await uploadFile(taskId, groupId, formData);
    files = [...files, newFile];
    setFiles(files);
  }

  const handleDelete = async(fileId) => {

      await deleteFile(fileId, taskId, groupId);
      const newFiles = files.filter((file) => file._id !== fileId);
      setFiles(newFiles);
  }

  return (
    <Paper elevation={1} className={classes.paper} maxWidth>
      <Grid container direction="column" alignItems="center">
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          xs={12}
        >
          <Grid item secondary={"Secondary text"}>
            <FolderIcon fontSize="small" />
            {" Files"}
          </Grid>
          <Grid item secondary={"Secondary text"}>
            <Input
              style={{ display: "none" }}
              type="file"
              inputRef={uploadRef}
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            <Button
              variant="contained"
              size="small"
              startIcon={<CloudUploadIcon />}
              onClick={() => uploadRef.current.click()}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
          <hr />
        <Grid item>
          {/* <div //className={classes.root}
          > */}
            <GridList cellHeight={67} className={classes.gridList} cols={3}>
              {
                files.map((file) => (
                  <GridListTile cols={3}>
                    <File file={file} key={file._id} onDelete={handleDelete} />
                  </GridListTile>
                ))}
            </GridList>
          {/* </div> */}
        </Grid>
      </Grid>
    </Paper>
  );
}

function File({ file, onDelete }) {

  const [anchor, setAnchor] = React.useState(null);
  const menuOpen = Boolean(anchor);

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <ListItem key={file._id}>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<a href={file.location}>{file.name}</a>}
        secondary={
          <Grid container direction="row" alignItems="center">
            <small>{file.owner.name}</small>
            <FiberManualRecordIcon style={{ fontSize: 5, margin: 2 }} />
            <small>uploaded {moment(file.uploadDate).fromNow()}</small>
            <FiberManualRecordIcon style={{ fontSize: 5, margin: 2 }} />
            {/* <small>{file.size} MB</small> */}
          </Grid>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="settings"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="settings"
          anchorEl={anchor}
          open={menuOpen}
          keepMounted
          onClose={handleClose}
        >
          <MenuItem>View</MenuItem>
          <MenuItem onClick={() => onDelete(file._id)}>
            Delete
            <DeleteIcon />
          </MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
}