import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
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
import TaskForm from "./taskForm";
import Container from "@material-ui/core/Container";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Chip from "@material-ui/core/Chip";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TimelineIcons from "@material-ui/icons/Timeline";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: 5,
  },
}));

export default function TaskCard({ task }) {
  const classes = useStyles();

  if (!task) return <div></div>;

  return (
    <Link
      to={`/groups/${task.groupId}/tasks/${task._id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        className={classes.root}
        elevation={5}
        style={{ backgroundColor: task.color }}
        Draggable={true}
      >
        <CardHeader
          // action={
          // }
          titleTypographyProps={{ variant: "strong" }}
          title={<strong>{task.title}</strong>}
          subheader={
            task.dueTime && (
              <>
                <AccessTimeIcon fontSize="small" />
                <small>Due On {moment(task.dueTime).format("LL")}</small>
              </>
            )
          }
        />
        <CardContent style={{ marginTop: -20 }}>
          <Typography variant="body2" component="p">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Tags tags={task.tags} />
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar
                        alt={task.author.name}
                        aria-label="recipe"
                        className={classes.avatar}
                        src={task.author.avatar_url}
                      />
                    </Grid>
                    <Grid item>
                      <small>{task.author.name}</small>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <ChatBubbleOutlineIcon
                    style={{ fontSize: 17, marginRight: 2 }}
                  />
                  <small>{task.commentsCount}</small>
                </Grid>
                {/* <Grid item>
                  <TimelineIcons fontSize="small" />{" "}
                  {task.timeline.length}
                </Grid> */}
                <Grid item>
                  {
                    <small>
                      <CalendarTodayIcon style={{ fontSize: 15 }} />
                      {moment(task.creationTime).format("LLLL").split(",")[1]}
                    </small>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

function Tags({ tags }) {
  return (
    <Grid item container>
      {tags &&
        tags.map((tag) => (
          <Grid item style={{ margin: 5 }}>
            <Chip label={<small>{tag}</small>} color="primary" size="small" />
          </Grid>
        ))}
    </Grid>
  );
}
