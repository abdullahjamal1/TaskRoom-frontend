import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import moment from "moment";
import TimelineIcons from "@material-ui/icons/Timeline";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
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

function TimelineIcon({ action }) {
  if (action === "created")
    return (
      <TimelineDot color="primary">
        <AddIcon />
      </TimelineDot>
    );
  if (action === "updated")
    return (
      <TimelineDot color="secondary">
        <EditIcon />
      </TimelineDot>
    );
  if (action === "To Do")
    return (
      <TimelineDot color="primary">
        <FormatListBulletedIcon />
      </TimelineDot>
    );
  if (action === "Doing")
    return (
      <TimelineDot color="primary">
        <AutorenewIcon />
      </TimelineDot>
    );
  if (action === "Done")
    return (
      <TimelineDot style={{ backgroundColor: "green" }}>
        <DoneIcon />
      </TimelineDot>
    );
}

export default function CustomizedTimeline({ timeline }) {
  const classes = useStyles();

  return (
    <Paper elevation={1}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <h6>
            <TimelineIcons /> Timeline
          </h6>
        </Grid>
      </Grid>
      <Timeline align="alternate">
        {timeline.map((t, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {moment(t.date).format("LLL")}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineIcon action={t.action} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="strong" component="h6">
                  {t.action !== "updated" &&
                    t.action !== "created" &&
                    "Moved to "}
                  {t.action}
                </Typography>
                <Typography variant="p" component="small">
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Avatar
                        className={classes.avatar}
                        src={t.user.avatar_url}
                      >
                        {t.user.name.substr(0, 1)}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <small style={{ marginLeft: 2 }}>{t.user.name}</small>
                    </Grid>
                  </Grid>
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}
