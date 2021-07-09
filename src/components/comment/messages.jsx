import React, { useEffect, useState } from "react";
import { Grid, Paper, Avatar, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    margin: theme.spacing(1),
  },

  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  avatar: {
    backgroundColor: blue[500],
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function Messages({ messages, user }) {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2} style={{ minHeight: 300 }}>
      {messages.map((message) => (
        <Grid
          item
          key={message._id}
          container
          direction={
            (user._id === message.author._id && "row-reverse") || "row"
          }
          justify={
            (user._id !== message.author._id && "flex-start") || "flex-start"
          }
          alignItems="baseline"
        >
          <Grid item>
            <Avatar className={classes.avatar}>
              {message.author.name.substr(0, 1)}
            </Avatar>
          </Grid>
          <Grid item>
            <Paper
              elevation={1}
              className={classes.paper}
              style={{
                backgroundColor:
                  (user._id === message.author._id && "#d6ffa6") || "#ffea98",
              }}
            >
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    variant="body2"
                    component="small"
                    color="textSecondary"
                  >
                    {message.author.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">{message.message}</Typography>
                </Grid>
              </Grid>
            </Paper>
            <Typography
              style={{ marginTop: -30 }}
              variant="body2"
              component="small"
              color="textSecondary"
            >
              {moment(message.creationTime).fromNow()}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
