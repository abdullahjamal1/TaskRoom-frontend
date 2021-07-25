import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import * as userService from "../../services/userService";
import Alert from "react-bootstrap/Alert";
import Oauth from "../common/oauth";
import { Grid, Container } from "@material-ui/core";

class RegisterForm extends Form {
  state = {
    data: { name: "", password: "", email: "" },
    errors: {},
    nameFeedback: {},
    responseMessage: "",
  };

  schema = {
    name: Joi.string().required().label("Name").min(3),
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
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
      }
      return;
    }
    this.setState({});
  };

  renderFeedbackClass = () => {
    const { message, isValid } = this.state.nameFeedback;
    if (message === null) return "";
    if (isValid) return "alert alert-success";
    else return "alert alert-danger";
  };

  render() {
    return (
      <Container>
        <Grid
          container
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={8} md={4}>
            <form onSubmit={this.handleSubmit}>
              <h2>Register</h2>
              {this.renderInput("email", "Email")}
              {this.renderInput("name", "Name")}

              {this.state.nameFeedback.message && (
                <div className={this.renderFeedbackClass()}>
                  this.state.nameFeedback.message
                </div>
              )}

              {this.renderInput("password", "Password", "password")}
              {this.renderResponse()}

              <Oauth />
              {this.renderButton("Register")}
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default RegisterForm;
