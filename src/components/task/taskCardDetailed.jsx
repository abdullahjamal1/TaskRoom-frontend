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
import { blue } from "@material-ui/core/colors";
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
import Container from "@material-ui/core/Container";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Chip from "@material-ui/core/Chip";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import moment from "moment";
import SaveIcon from "@material-ui/icons/Save";
import MembersContext from "../../contexts/membersContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    marginBottom: 10,
    padding: "6px 16px",
    marginLeft: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: blue[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function TaskCardDetailed({
  task,
  onDelete,
  onStatusChange,
  onPost,
}) {
  const classes = useStyles();

  const [anchor, setAnchor] = React.useState(null);
  const menuOpen = Boolean(anchor);
  const [formOpen, setFormOpen] = React.useState(false);

  const handleFormOpen = () => {
    setAnchor(null);
    setFormOpen(true);
  };

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setFormOpen(false);
    setAnchor(null);
  };

  if (!task) return <div></div>;

  return (
    <>
      <MembersContext.Provider value={task.collaborators}>
        <TaskFormDialog
          open={formOpen}
          onClose={handleClose}
          onPost={onPost}
          task={task}
        />
      </MembersContext.Provider>
      <Card
        className={classes.root}
        elevation={1}
        style={{ backgroundColor: task.color }}
      >
        <CardHeader
          // action={
          // }
          titleTypographyProps={{ variant: "h6" }}
          title={
            <>
              {task.title + " "}
              <Chip label={task.status} size="small" />
            </>
          }
          subheader={
            task.dueTime && (
              <>
                <AccessTimeIcon />
                <small>Due On {moment(task.dueTime).format("LL")}</small>
              </>
            )
          }
          action={
            <IconButton
              aria-label="settings"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent style={{ marginTop: -20 }}>
          <Typography variant="body2" component="p">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Tags tags={task.tags} />
              </Grid>
              <Grid item>
                {task.collaborators && <strong>Collaborators</strong>}
              </Grid>
              <Grid item container direction="row" spacing={1}>
                {task.collaborators.map((c) => (
                  <Grid item style={{ marginRight: 5 }}>
                    <Avatar src={c.avatar_url} className={classes.avatar}>
                      {c.name[0]}
                    </Avatar>
                  </Grid>
                ))}
                <hr />
              </Grid>
              <Grid item>
                <p>{task.description}</p>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item style={{ marginRight: 5 }}>
                      <Avatar
                        alt={task.author.name}
                        aria-label="recipe"
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid item>
                      <small>{task.author.name}</small>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <ChatBubbleOutlineIcon
                    fontSize="small"
                    style={{ marginRight: 2 }}
                  />
                  {task.commentsCount}
                </Grid>
                <Grid item>
                  <AccessTimeIcon fontSize="small" />
                  {moment(task.creationTime).format("LLLL")}
                </Grid>
              </Grid>
            </Grid>
          </Typography>
          <CardActions disableSpacing>
            <Menu
              id="settings"
              anchorEl={anchor}
              open={menuOpen}
              keepMounted
              onClose={handleClose}
            >
              <MenuItem onClick={handleFormOpen}>Update</MenuItem>
              {["To Do", "Doing", "Done"].map((status) => (
                <>
                  {status !== task.status && (
                    <MenuItem onClick={() => onStatusChange(status)}>
                      Mark as {status}
                    </MenuItem>
                  )}
                </>
              ))}
              <MenuItem onClick={() => onDelete(task._id)}>Delete</MenuItem>
            </Menu>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}

function Tags({ tags }) {
  return (
    <Grid item container>
      {tags &&
        tags.map((tag) => (
          <Grid item style={{ margin: 5 }}>
            <Chip label={tag} color="primary" size="small" />
          </Grid>
        ))}
    </Grid>
  );
}
