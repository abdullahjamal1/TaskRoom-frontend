import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid, Container, Divider } from "@material-ui/core";
import { toggleNotifications } from "../services/userService";
import { getLoggedUser } from "../services/userService";
import LoadingScreen from "./loadingScreen";

export default function Settings() {
  const [user, setUser] = useState(null);

  const toggleChecked = async () => {
    // send request to backend
    const isNotificationEnabled = !user.isNotificationEnabled;
    setUser({ ...user, isNotificationEnabled: isNotificationEnabled });
    try {
      await toggleNotifications(user._id, {
        isNotificationEnabled,
      });
    } catch (ex) {
      console.log("error", ex);
    }
  };

  useEffect(() => {
    async function loadUserNotificationStatus() {
      const { data } = await getLoggedUser();
      setUser(data);
    }
    loadUserNotificationStatus();
  }, []);

  if (!user)
    return (
      <div>
        <LoadingScreen />
      </div>
    );

  return (
    <Container>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sapcing={4}
      >
        <Grid item>
          <h3>Settings</h3>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              color="primary"
              value="start"
              labelPlacement="start"
              control={
                <Switch
                  checked={user.isNotificationEnabled}
                  onChange={toggleChecked}
                  color="primary"
                />
              }
              label="Receive Email notifications and reminders from taskroom"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Container>
  );
}
