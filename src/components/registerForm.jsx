import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import * as userService from "../services/userService";
import Alert from 'react-bootstrap/Alert';

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {},
    usernameFeedback: {},
    responseMessage: "",
  };

  schema = {
    username: Joi.string().required().label("Username").min(3),
    password: Joi.string().required().label("Password").min(8),
    email: Joi.string().required().label("Email").email(),
  };

  renderResponse = () =>{
    if(!this.state.responseMessage)
      return <></>;
    return <Alert variant={"success"}>{this.state.responseMessage}</Alert>;
  }

  doSubmit = async () => {
    try {
      const {data: responseMessage} = await userService.register(this.state.data);
      this.setState({responseMessage})
      // auth.loginWithJwt(response.headers["Authorization"]);
      // window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
      return;
    }
    this.setState({});
  };

  handleOnUsernameChange = async (currentTarget) => {
    // send get request to /username with username as param to check if it is unique
    this.handleChange(currentTarget);
    const { currentTarget: username } = currentTarget;

    let message, isValid;
    const { data: response } = await auth.isUsernameUnique(username.value);
    if (response) {
      message = "username is unique :)";
      isValid = true;
    } else {
      message = "username already used";
      isValid = false;
    }
    const usernameFeedback = { message, isValid };
    this.setState({ usernameFeedback });
  };

  renderFeedbackClass = () => {
    const { message, isValid } = this.state.usernameFeedback;
    if (message === null) return "";
    if (isValid) return "alert alert-success";
    else return "alert alert-danger";
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm col-xs-0"></div>
        <form className="col" onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          {this.renderInput("email", "Email")}
          {this.renderInput(
            "username",
            "Username",
            "text",
            this.handleOnUsernameChange
          )}
          {this.state.usernameFeedback.message && (

            <div className={this.renderFeedbackClass()}>
                          this.state.usernameFeedback.message
                        </div>
          )}
          {this.renderInput("password", "Password", "password")}
          {this.renderResponse()}
          {this.renderButton("Register")}
        </form>
        <div className="col-sm col-xs-0"></div>
      </div>
    );
  }
}

export default RegisterForm;
