import React, { useEffect, useState } from "react";
import { Grid, TextField, Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 8px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  avatar: {
    backgroundColor: blue[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function MessageForm({ onPost, user }) {
  const [message, setMessage] = useState(null);
  const classes = useStyles();

  return (
    <Grid item container direction="row" justify="center" alignItems="center">
      <Grid item xs={2} sm={1}>
        <Avatar src={user.avatar_url} className={classes.avatar} />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth="true"
          required
          multiline
          variant="outlined"
          id="standard-helperText"
          label="message"
          //   helperText={error && error}
          //   error={error}
          //   className={classes.textField}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={() => onPost(message)} color="primary">
          <SendIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
