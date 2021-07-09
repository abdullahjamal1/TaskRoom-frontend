import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Container, Divider } from "@material-ui/core";
import { getComments, postComment } from "../../services/commentService";
import Messages from "./messages";
import MessageForm from "./messageForm";
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
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function CommentContainer({ taskId, groupId, user }) {

  const [comments, setComments] = useState(null);
  const classes = useStyles();

  const loadComments = async () => {
    const { data: comments } = await getComments({ taskId, groupId });
    setComments(comments);
  };

  useEffect(() => {
    loadComments();
  }, []);

  async function handleCommentPost(message){
    const { data: comment } = await postComment({ taskId, groupId, message });
    const newCommentList = [...comments, comment];
    setComments(newCommentList);
  };

  if (!comments) return <div>Loading...</div>;

  return (
    <Paper elevation={1} className={classes.paper}>
      <Container>
        <Grid item container direction="column" spacing={2}>
          <Grid item container direction="row" justify="center">
            Discussions
          </Grid>
          <Divider />
          <Grid item>
            <Messages messages={comments} user={user} />
          </Grid>
          <Divider />
          <Grid item>
            <MessageForm onPost={handleCommentPost} user={user} />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
