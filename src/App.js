import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Groups from './components/groups';
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import GroupForm from "./components/groupForm";
import LoginModal from "./components/loginModal";
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import auth from './services/authService';
import GroupView from './components/groupView';
import ProtectedRoute from './components/common/protectedRoute';
import LoginContext from './contexts/loginContext';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Profile from './components/profile';
import Users from './components/users';
import ResetPassword from './components/resetPassword';
import ResetPasswordChange from './components/resetPasswordChange';
import Footer from './components/footer';

class App extends Component {
  state = {
    user: "",
    show: "false",
    modalMessage: ""
  };

  handleClose = () => this.setState({ show: false, modalMessage: "" });
  handleShow = () => this.setState({ show: true });
  handleModalMessage = (msg) => this.setState({ modalMessage: msg });

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {

    const { user } = this.state;

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
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            {/* <Route path="/login" component={LoginForm} /> */}
            <Route path="/logout" component={Logout} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/reset-password-change" component={ResetPasswordChange} />
            <ProtectedRoute
              path="/groupForm/:id"
              component={GroupForm}
            />
            <ProtectedRoute path="/groups/:id" component={GroupView} />
            <ProtectedRoute path="/users/:username" component={Profile} />
            <ProtectedRoute path="/users" component={Users} />
            <ProtectedRoute path="/groups"
              render={props => <Groups {...props} user={this.state.user} />}></ProtectedRoute>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect exact from="/" to="/groups" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer />
      </LoginContext.Provider>

);
}
}

export default App;
