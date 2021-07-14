import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { deleteGroup } from "../../services/groupService";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { blue } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    marginRight: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  members_avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
}));

function SimpleDialog({ onClose, selectedValue, open, members }) {
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Group Members</DialogTitle>
      <List>
        {members.map((member) => (
          <ListItem
            button
            onClick={() => handleListItemClick(member.email)}
            key={member.email}
          >
            <ListItemAvatar>
              <Avatar
                alt={member.name}
                src={member.avatar_url}
                className={classes.members_avatar}
              >
                {/* <PersonIcon /> */}
              </Avatar>
            </ListItemAvatar>

            <ListItemText primary={member.name} secondary={member.email} />
            <ListItemSecondaryAction>
              {member.isVerified && <CheckIcon style={{ color: "green" }} />}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {/* 
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add New Member" />
        </ListItem> */}
      </List>
    </Dialog>
  );
}

MembersDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function MembersDialog({ members }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      {/* <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
      <br /> */}
      <AvatarGroup
        max={5}
        style={{ cursor: "pointer" }}
        onClick={handleClickOpen}
      >
        {members.map((member) => (
          <Avatar alt={member.name} src={member.avatar_url} />
        ))}
      </AvatarGroup>
      <SimpleDialog
        members={members}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default function GroupCard({ group, user }) {
  const classes = useStyles();
  const history = useHistory();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);

  const handleDelete = async (id) => {
    await deleteGroup(id);
  };

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        // avatar={
        // <Avatar aria-label="recipe" className={classes.avatar}>
        //   R
        // </Avatar>
        // }
        style={{ fontSize: 10 }}
        action={
          <IconButton
            aria-label="settings"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MoreVertIcon />
          </IconButton>
        }
        // titleTypographyProps={{ variant: "h6" }}
        title={group.title}
        subheader={
          <Grid container alignItems="center">
            <Grid item>
              {" "}
              <Avatar
                alt={group.admin.name}
                aria-label="recipe"
                // className={classes.avatar}
                style={{ marginRight: 5 }}
                src={group.admin.avatar_url}
              />
            </Grid>{" "}
            <Grid item>
              <div>{group.admin.name}</div>
            </Grid>
          </Grid>
        }
      />

      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {group.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <MembersDialog members={group.members} />

        <Menu
          id="settings"
          anchorEl={anchor}
          open={open}
          keepMounted
          onClose={handleClose}
        >
          {user._id === group.admin._id && (
            <>
              <MenuItem onClick={() => history.push(`groupForm/${group._id}`)}>
                Update
              </MenuItem>
              <MenuItem onClick={() => handleDelete(group._id)}>
                Delete
              </MenuItem>
            </>
          )}
        </Menu>
      </CardActions>
    </Card>
  );
}
