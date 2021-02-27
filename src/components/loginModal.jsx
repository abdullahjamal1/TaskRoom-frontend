import React, { Component } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import LoginContext from "../contexts/loginContext";
import { Redirect, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

class LoginModal extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    loginMessage: "",
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    console.log("submitted");
    let response;
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      window.location = "/";
    } catch (ex) {
      this.setState({ loginMessage: "Invalid Username or Password" });
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  renderWarning = (context) => {
    if (context.modalMessage)
      return <Alert variant={"warning"}>{context.modalMessage}</Alert>;
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    const { loginMessage } = this.state;

    return (
      <LoginContext.Consumer>
        {(context) => (
          <Modal show={context.show} onHide={context.onHandleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Login <i class="fa fa-sign-in" aria-hidden="true"></i>
              </Modal.Title>
            </Modal.Header>
            {context.modalMessage && (
              <Alert variant={"warning"}>{context.modalMessage}</Alert>
            )}
            <form onSubmit={this.handleSubmit}>
              <ModalBody>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                <Link onClick={context.onHandleClose} to="/reset-password">
                  Forgot Password ?
                </Link>
              </ModalBody>
              {loginMessage && <Alert variant={"danger"}>{loginMessage}</Alert>}

              <ModalFooter>
                <Button variant="secondary" onClick={context.onHandleClose}>
                  Close
                </Button>
                {this.renderButton("Login")}
              </ModalFooter>
            </form>
          </Modal>
        )}
      </LoginContext.Consumer>
    );
  }
}

LoginModal.contextType = LoginContext;

export default LoginModal;
