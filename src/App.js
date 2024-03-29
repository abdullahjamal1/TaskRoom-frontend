import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './components/common/protectedRoute';
import NotFound from "./components/common/notFound";
import Groups from './components/group/groups';
import GroupView from './components/group/groupView';
import GroupForm from "./components/group/groupForm";
import GroupTabs from './components/group/groupTabs';

import Home from './components/home';
import LoginModal from "./components/auth/loginModal";
import RegisterForm from './components/auth/registerForm';
import Logout from './components/auth/logout';
import ResetPassword from './components/auth/resetPassword';
import ResetPasswordChange from './components/auth/resetPasswordChange';

import NavBar from "./components/navBar";
import auth from './services/authService';
import LoginContext from './contexts/loginContext';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Footer from './components/footer';
import Task from './components/task/task';
import OauthCallback from './components/auth/callback';
import Settings from './components/settings';

class App extends Component {
  state = {
    user: "",
    show: "false",
    modalMessage: ""
  };

  handleClose = () => this.setState({ show: false, modalMessage: "" });
  handleShow = () => { this.setState({ show: true }); }
  handleModalMessage = (msg) => this.setState({ modalMessage: msg });

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {

    const { user, showSidebar } = this.state;

    return (
      <LoginContext.Provider value={{
        onHandleShow: this.handleShow,
        show: this.state.show,
        onHandleClose: this.handleClose,
        user: this.state.user,
        handleModalMessage: this.handleModalMessage,
        modalMessage: this.state.modalMessage
      }}>
        <ToastContainer />
        <LoginModal />
        <NavBar user={user} />
        <main>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/register" component={RegisterForm} />
            {/* <Route path="/login" component={LoginForm} /> */}
            <Route path="/logout" component={Logout} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/reset-password-change" component={ResetPasswordChange} />
            <Route path="/callback" component={OauthCallback} />
            <ProtectedRoute
              path="/settings"
              component={Settings}
            />
            <ProtectedRoute
              path="/groupForm/:id"
              component={GroupForm}
            />
            <ProtectedRoute path="/groups/:groupId/tasks/:taskId"
              render={props => <Task {...props} user={this.state.user} />} />
            <ProtectedRoute path="/groups/:id" component={GroupTabs} />
            <ProtectedRoute path="/groups"
              render={props => <Groups {...props} user={this.state.user} />} />
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect exact from='/service-worker.js' to='/service-worker.js' />
            <Redirect exact from="/" to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </LoginContext.Provider>

);
}
}

export default App;
