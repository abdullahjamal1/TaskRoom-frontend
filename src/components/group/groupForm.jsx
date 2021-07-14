import React, { Component } from "react";
import Form from "../common/form";
import { saveGroup, getGroup, updateGroup } from "../../services/groupService";
import Joi from "joi-browser";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class groupForm extends Form {
  state = {
    data: {},
    members: "",
    themes: [
      "Primary",
      "Secondary",
      "Success",
      "Danger",
      "Warning",
      "Info",
      "Light",
      "Dark",
    ],
    errors: {},
    error: "",
  };

  schema = {
    title: Joi.string().required().label("Title"),
    theme: Joi.string().required().label("Theme"),
    description: Joi.string().required().label("Description"),
  };

  async populateGroup() {
    try {
      const GroupId = this.props.match.params.id;
      if (GroupId === "new") return;
      const { data: Group } = await getGroup(GroupId);
      this.mapToViewModel(Group);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel({ title, description, theme, members }) {
    const data = { title, description, theme };
    const emails = members.map((member) => member.email);
    this.setState({ data, members: emails });
  }

  componentDidMount = async () => {
    this.populateGroup();
  };

  doSubmit = async () => {
    const { title, description, theme } = this.state.data;
    let { members } = this.state;

    if (members) {
      members = members
        .toString()
        .split(",")
        .map((emails) => emails.trim());
    } else members = [];

    console.log(members);

    try {
      if (this.props.match.params.id === "new") {
        await saveGroup(title, description, theme, members);
      } else {
        await updateGroup(
          title,
          description,
          theme,
          members,
          this.props.match.params.id
        );
      }
      this.props.history.replace("/groups");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ error: ex.response.data });
      }
    }
  };

  handleUserDelete = (user) => {
    const members = this.state.members.filter((member) => member !== user);

    this.setState({ members });
  };

  render() {
    const { themes, members, error } = this.state;
    return (
      <Container>
        <Grid container direction="column" justify="space-around">
          <form onSubmit={this.handleSubmit}>
            <Grid item xs={12}>
              {this.renderInput("title", "title", "text")}
            </Grid>

            <Grid item xs={12}>
              {this.renderInput("description", "description", "text area")}
            </Grid>
            <Grid item xs={12}>
              {this.renderSelect("theme", "theme", themes)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-textarea"
                label="Member Emails"
                placeholder="comma(,) separated emails of members"
                multiline
                value={members}
                onChange={(event) =>
                  this.setState({ members: event.target.value })
                }
                fullWidth={true}
                margin="normal"
                // onKeyDown={this.handleUserEmail}
              />
            </Grid>
            <Grid item>{error && <Alert severity="error">{error}</Alert>}</Grid>
            {/* <Grid item container direction="row">
              <ChipList members={members} onDelete={this.handleUserDelete} />
            </Grid> */}

            <Grid item xs={12}>
              {this.renderButton(" Submit ")}
            </Grid>
          </form>
        </Grid>
      </Container>
    );
  }
}


export default groupForm;
