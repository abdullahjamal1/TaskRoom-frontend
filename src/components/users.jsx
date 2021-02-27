import React, { Component } from "react";
import { getAllUsers } from "../services/userService";
import UsersTable from "./usersTable";
import _ from "lodash";

class Users extends Component {
  state = {
    users: this.props.members,
    sortColumn: { path: "user_name", order: "asc" },
  };

  handleSort = (sortColumn) => {
    const users = _.orderBy(
      this.state.users,
      [sortColumn.path],
      [sortColumn.order]
    );
    this.setState({ sortColumn, users });
  };

  render() {
    const { users, sortColumn } = this.state;

    if (!users) return <div></div>;
    return (
      <div>
        <h3 className="row">Users ({users.length})</h3>
        <div className="row">
          <UsersTable
            users={users}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
        </div>
      </div>
    );
  }
}

export default Users;
