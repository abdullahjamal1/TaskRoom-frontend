import React, { useState, useEffect } from "react";
import { getAllFiles } from "../../services/groupService";
import LoadingScreen from "../loadingScreen";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { MenuItem } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import FolderIcon from "@material-ui/icons/Folder";
import { Grid, Container } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: "6px 8px",
    margin: theme.spacing(1),
    width: 400,
  },
}));

export default function FileView({ props }) {
  const [files, setFiles] = useState(null);
  const groupId = props.match.params.id;
  const classes = useStyles();

  const loadFiles = async () => {
    const { data } = await getAllFiles(groupId);
    setFiles(data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  if (!files) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      Files
      <Grid container direction="row">
        {files.length >= 0 &&
          files.map((file) => (
            <>
              {file.files &&
                file.files.map((f, index) => (
                  <Grid item xs={12} sm={4}>
                    <File file={f} key={index} />
                  </Grid>
                ))}
            </>
          ))}
      </Grid>
    </Container>
  );
}

function File({ file }) {
  const [anchor, setAnchor] = React.useState(null);
  const menuOpen = Boolean(anchor);

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <ListItem>
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
            <small>{file.size} MB</small>
          </Grid>
        }
      />
    </ListItem>
  );
}
