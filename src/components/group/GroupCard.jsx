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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

export default function GroupCard({ group, user, onDelete, onLeave }) {
  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Grid item key={group._id} xs={12} sm={4}>
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
            titleTypographyProps={{ variant: "h6" }}
            title={<Link to={"groups/" + group._id}>{group.title}</Link>}
            subheader={
              <Grid container spacing={4}>
                <Grid item xs={1}>
                  {" "}
                  <Avatar
                    alt={group.admin.name}
                    aria-label="recipe"
                    className={classes.avatar}
                  />
                </Grid>{" "}
                <Grid item xs={10}>
                  <Grid>{group.admin.name}</Grid>
                </Grid>
              </Grid>
            }
          />

          {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
          {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent> */}
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Menu
              id="settings"
              anchorEl={anchor}
              open={open}
              keepMounted
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to={"groups/" + group._id}>View</Link>
              </MenuItem>
              {user._id === group.admin._id && (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link to={`groupForm/${group._id}`}>Update</Link>
                  </MenuItem>
                  <MenuItem onClick={() => onDelete(group._id)}>
                    Delete
                  </MenuItem>
                </>
              )}
              {user._id !== group.admin._id && (
                <MenuItem onClick={() => onLeave(group._id)}>Unenroll</MenuItem>
              )}
            </Menu>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
