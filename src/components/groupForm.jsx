import React, { Component } from "react";
import Form from "./common/form";
import { saveGroup, getGroup, updateGroup } from "../services/groupService";
import { getAllUsernames } from "../services/userService";
import Joi from "joi-browser";
import List from "./common/list";
import Select from "./common/select";

/**
 *     private String name;
    private String description;
    private String theme;
    private List<String> members;  //usernames of members
    private List<String> admins;
 */

class groupForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      theme: "",
    },
    usernames: [],
    members: [],
    admins: [],
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

  mapToViewModel({ title, description, theme, admins, members }) {
    const data = { title, description, theme };
    this.setState({ data, admins, members });
  }

  componentDidMount = async () => {
    this.populateGroup();
    const { data: usernames } = await getAllUsernames();
    this.setState({ usernames });
  };

  doSubmit = async () => {
    const { title, description, theme } = this.state.data;
    const { members, admins } = this.state;

    if (this.props.match.params.id === "new") {
      const { data } = await saveGroup(
        title,
        description,
        theme,
        members,
        admins
      );
    } else {
      const { data } = await updateGroup(
        title,
        description,
        theme,
        members,
        admins,
        this.props.match.params.id
      );
    }

    this.props.history.replace("/groups");
  };

  handleUserSelect = ({ currentTarget: input }) => {
    const members = [...this.state.members, input.value];
    this.setState({ members });
  };

  handleAdminSelect = ({ currentTarget: input }) => {
    const admins = [...this.state.admins, input.value];
    this.setState({ admins });
  };

  handleUserDelete = (user) => {
    const members = this.state.members.filter((member) => member !== user);
    this.setState({ members });
  };

  handleAdminDelete = (admin) => {
    const admins = this.state.admins.filter((member) => member !== admin);
    this.setState({ admins });
  };

  render() {
    const { themes, members, usernames, admins } = this.state;
    if (!usernames) return <div></div>;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "title", "text")}
          {this.renderInput("description", "description", "text area")}
          {this.renderSelect("theme", "theme", themes)}
          <div className="row">
            <div className="col-4">
              <Select
                name="name"
                label="members"
                options={usernames}
                onChange={this.handleUserSelect}
              />
            </div>
            <div className="col-8">
              <List data={members} onDelete={this.handleUserDelete} />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <Select
                name="admin"
                label="admins"
                options={members}
                onChange={this.handleAdminSelect}
              />
            </div>
            <div className="col-8">
              <div className="col-8">
                <List data={admins} onDelete={this.handleAdminDelete} />
              </div>
            </div>
          </div>

          {this.renderButton(" Submit ")}
        </form>
      </div>
    );
  }
}

export default groupForm;
