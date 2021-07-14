import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GroupHeader from "./groupHeader";
import Tasks from "../task/tasks";
import LoginContext from "../../contexts/loginContext";
import LoadingScreen from "../loadingScreen";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

export default function GroupView({ props, group }) {
  const { user } = useContext(LoginContext);

  return (
    <Container>
      <Grid
        item
        container
        direction="row"
        spacing={2}
        style={{ marginTop: 20 }}
      >
        <Grid item xs={12}>
          <GroupHeader user={user} group={group} />
        </Grid>
      </Grid>
    </Container>
  );
}
