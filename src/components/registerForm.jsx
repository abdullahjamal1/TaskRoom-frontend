import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import * as userService from "../services/userService";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap/Button";

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

  renderResponse = () => {
    if (!this.state.responseMessage) return <></>;
    return <Alert variant={"success"}>{this.state.responseMessage}</Alert>;
  };

  doSubmit = async () => {
    try {
      const { data: responseMessage } = await userService.register(
        this.state.data
      );
      this.setState({ responseMessage });
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
        <div className="col-8">
          <img
            src="https://github.com/aj941ga/TaskRoom-backend/raw/master/group.png"
            className="img-fluid"
          ></img>
        </div>
        <form className="col" onSubmit={this.handleSubmit}>
          <h2>Register</h2>
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
          <div className="col-12 d-flex justify-content-center">
            OR Sign up with
          </div>
          <div className="col-12 d-flex justify-content-center">
            <div className="btn btn-sm btn-danger m-2">
              <i className="fa fa-2x fa-google" aria-hidden="true"></i>
            </div>
            <div className="btn btn-sm btn-primary m-2">
              <i class="fa fa-2x fa-facebook" aria-hidden="true"></i>
            </div>
            <div className="btn btn-sm btn-primary m-2">
              <i className="fa fa-2x fa-linkedin" aria-hidden="true"></i>
            </div>
          </div>
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
