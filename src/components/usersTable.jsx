import React, { Component } from "react";
import Table from "./common/table";
import auth from "../services/authService";
import { Link } from "react-router-dom";

class usersTable extends Component {
  columns = [
    {
      path: "username",
      label: "Username",
      content: (user) => <Link to={`/users/${user.username}`}>{user.username}</Link>,
    },
    {
      path: "first_name",
      label: "name",
      content: (user) => user.first_name + " " + user.last_name,
    },
    { 
      path: "creation_time",
     label: "Since",
     content: (user) => <div>{(user.creation_time).split("T")[0]} at {(user.creation_time).substring(11, 19)}</div>
    },
    { path: "uploads", label: "games uploaded" }
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default usersTable;
