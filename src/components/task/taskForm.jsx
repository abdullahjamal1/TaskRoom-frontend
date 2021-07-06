import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { postTask, updateTask } from "../../services/taskService";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import MuiAlert from "@material-ui/lab/Alert";
import { createBrowserHistory } from "history";

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar_large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textField: {
    width: 270,
  },
}));

const colors = [
  { bg: "white", textColor: "black" },
  { bg: "red", textColor: "white" },
  { bg: "pink", textColor: "white" },
  { bg: "purple", textColor: "white" },
  // {bg: "deepPurple", textColor: "white"},
  { bg: "indigo", textColor: "white" },
  { bg: "blue", textColor: "white" },
  // {bg: "deepOrange", textColor: "white"},
  { bg: "lightBlue", textColor: "black" },
  { bg: "cyan", textColor: "black" },
  { bg: "teal", textColor: "black" },
  { bg: "green", textColor: "black" },
  { bg: "lightGreen", textColor: "black" },
  { bg: "lime", textColor: "black" },
  { bg: "yellow", textColor: "black" },
  // {bg: "amber", textColor: "black"},
  { bg: "orange", textColor: "black" },
];

export default function TaskFormDialog(props) {
  const classes = useStyles();
  const { open, onClose, onPost } = props;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <IconButton onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>

        <DialogTitle id="form-dialog-title">Task Form</DialogTitle>
        <TaskForm {...props} />
      </Dialog>
    </>
  );
}

function TaskForm({ onPost, onClose, task: taskProp }) {
  const classes = useStyles();
  let [dueTime, setDueDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [tags, setTags] = useState(null);
  const [description, setDescription] = useState(null);
  const [color, setColor] = useState(colors[0]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskProp) {
      setDueDate(taskProp.dueDate);
      setTitle(taskProp.title);
      setTags(taskProp.tags);
      setDescription(taskProp.description);
    }
  }, []);

  const onSubmit = async () => {
    const history = createBrowserHistory();
    const groupId = history.location.pathname.toString().split("/")[2];
    // dueTime += ":00.000Z";
    let task = { title, description };
    if (dueTime) task.dueTime = dueTime;
    if (tags) task.tags = tags.toString().split(",");

    try {
      let newTask;

      if (taskProp) {
        task.status = taskProp.status;
        const { data } = await updateTask(taskProp._id, groupId, task);
        newTask = data;
      } else {
        const { data } = await postTask(groupId, task);
        newTask = data;
      }
      onPost(newTask);
      onClose();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError(ex.response.data);
      }
    }
  };
  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <TextField
            id="date"
            label="Due Date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={error && error}
            error={error}
            value={dueTime}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            extended
            id="standard-helperText"
            label="Title"
            helperText={error && error}
            error={error}
            className={classes.textField}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            extended
            multiline
            variant="outlined"
            id="standard-helperText"
            label="Tags"
            helperText={(error && error) || "enter , seperated tags"}
            error={error}
            className={classes.textField}
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            className={classes.textField}
            style={{ backgroundColor: color.bg, color: color.textColor }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Theme
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {colors.map((color) => (
                <MenuItem
                  value={color}
                  style={{
                    backgroundColor: color.bg,
                    color: color.textColor,
                  }}
                >
                  {color.bg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            required
            multiline
            variant="outlined"
            extended
            id="standard-helperText"
            label="Description"
            helperText={error && error}
            error={error}
            className={classes.textField}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Grid>
        <Grid item>{error && <Alert severity="error">{error}</Alert>}</Grid>
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Button onClick={onSubmit} variant="contained" color="success">
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
