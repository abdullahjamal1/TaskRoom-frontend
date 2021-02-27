import React, { Component } from "react";
import { getUser } from "../services/userService";

class Profile extends Component {
  state = {
    user: {},
  };

  componentDidMount = async () => {
    // const { data: user } = await getUser(this.props.match.params.id);
    // console.log(user);
    // this.setState({ user });
  };

  render() {
    return (
      <div className="row">
        <div className="col">user</div>
        <div className="col"></div>
      </div>
    );
  }
}

export default Profile;
