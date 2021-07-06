import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TaskFormDialog from "./taskForm";
import TaskCard from "./taskCard";
import Chip from "@material-ui/core/Chip";

import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function TaskColumns({ label, color, actions, tasks }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [task, setTasks] = React.useState(tasks);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handlePost = (newTask) => {
    const postedTask = [...task, newTask];
    setTasks(postedTask);
  };

  return (
    <>
      <TaskFormDialog open={open} onClose={handleClose} onPost={handlePost} />
      <Card className={classes.root} style={{ backgroundColor: color }}>
        <CardHeader
          style={{ fontSize: 10 }}
          action={
            actions && (
              <Fab
                color="primary"
                aria-label={label}
                onClick={() => handleOpen()}
                size="small"
              >
                <AddIcon />
              </Fab>
            )
          }
          titleTypographyProps={{ variant: "h6" }}
          title={
            <>
              {label}
              {
                <Chip
                  style={{ marginLeft: 5 }}
                  label={task.length}
                  color="secondary"
                  size="small"
                />
              }
            </>
          }
        />
        <Container>
          <Grid item container direction="column" spacing={2}>
            {task.map((t) => (
              <Grid item>
                <TaskCard key={t._id} task={t} />
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent> */}
      </Card>
    </>
  );
}
