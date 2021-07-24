import React, { useContext } from "react";
import GroupHeader from "./groupHeader";
import LoginContext from "../../contexts/loginContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

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
