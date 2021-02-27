import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import * as authService from "../services/authService";
import Alert from 'react-bootstrap/Alert';
import queryString from 'query-string';

class ResetPasswordChange extends Form {
      state = {
    data: { password: "", confirm_password: "" },
    errors: {},
    responseMessage: "",
  };

  schema = {
    password: Joi.string().required().label("password").min(8),
    confirm_password: Joi.any().valid(Joi.ref("password")).required().options({ language: { any: { allowOnly: 'must match password' } } })
  };


  renderResponse = () =>{
    if(!this.state.responseMessage)
      return <></>;
    if(!this.state.errors)
        return <Alert variant={"success"}>{this.state.responseMessage}</Alert>;
    else
        return <Alert variant={"danger"}>{this.state.responseMessage}</Alert>;
  }

  doSubmit = async () => {
      const params = queryString.parse(this.props.location.search);
     
    try {
      const {data: responseMessage} = await authService.resetPassword(this.state.data.password, params.token);
      this.setState({responseMessage})
      // auth.loginWithJwt(response.headers["Authorization"]);
      // window.location = "/";
    } catch (ex) {
        console.log(ex);
        console.log(this.state.responseMessage);
        const errors = { ...this.state.errors };
        errors.password = ex.data;
        this.setState({ errors });
      return;
    }
    this.setState({});
  };
    render() { 
        return ( 
           <div className="row">
                <div className="col-sm col-12">
                </div>
                <div className="col-sm col-12">
                <h3>Reset Password</h3>
                <form onSubmit={this.handleSubmit}>
                {this.renderInput("password", "New Password", "password")}
                {this.renderInput("confirm_password", "Retype New password", "password")}
                {this.renderResponse()}
                {this.renderButton("Reset Password")}
                </form>
                </div>
                <div className="col-sm col-12">
                </div>
           </div>
         );
    }
}
 
export default ResetPasswordChange;