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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";

import MuiAlert from "@material-ui/lab/Alert";
import { createBrowserHistory } from "history";

import MembersContext from "../../contexts/membersContext";
import moment from "moment";

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
  checkList: {
    maxWidth: 360,
    backgroundColor: theme.palette.grey[50],
    position: "relative",
    overflow: "auto",
    maxHeight: 200,
  },
}));

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
  let context = useContext(MembersContext);
  const classes = useStyles();
  let [dueTime, setDueDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [tags, setTags] = useState(null);
  const [description, setDescription] = useState(null);
  // const [color, setColor] = useState(colors[0]);
  const [error, setError] = useState(null);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    if (taskProp) {
      setDueDate(taskProp.dueDate);
      setTitle(taskProp.title);
      setTags(taskProp.tags);
      setDescription(taskProp.description);
      setCollaborators(taskProp.collaborators.map((c) => c.email));
    }
  }, []);

  const onSubmit = async () => {
    const history = createBrowserHistory();
    const groupId = history.location.pathname.toString().split("/")[2];
    // dueTime += ":00.000Z";
    let task = { title, description, collaborators };
    if (dueTime) task.dueTime = moment(dueTime);

    console.log(task.dueTime);

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
        {/* <Grid item>
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
        </Grid> */}
        <Grid item>
          Collaborators
          <CheckboxListSecondary
            members={context}
            collaborators={collaborators}
            setCollaborators={setCollaborators}
          />
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

function CheckboxListSecondary({
  members,
  collaborators: checked,
  setCollaborators: setChecked,
}) {
  const classes = useStyles();

  const handleToggle = (index) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setChecked(newChecked);
  };

  return (
    <List dense className={classes.checkList}>
      {members.map((member, index) => {
        const labelId = `checkbox-list-secondary-label-${member.email}`;
        return (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar alt={member.name} src={member.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              id={labelId}
              primary={member.name}
              secondary={member.email}
            />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(member.email)}
                checked={checked.indexOf(member.email) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}