import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import LoginContext from "../contexts/loginContext";
import CustomDrawer from "./drawer";

import ProfileDialog from './profile/profileDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar_large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const NavBar = ({ user, toggleSidebar }) => {

  const loginModal = useContext(LoginContext);
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [profileOpen, setOpen] = React.useState(false);

  const handleProfileOpen = () => {
    setOpen(true);
  };

  const handleProfileClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLogged = user || false;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
            <CustomDrawer />
          <Typography variant="h6" className={classes.title}>
            <Link href="/groups" color="inherit">
              <i class="fa fa-thumb-tack" aria-hidden="true"></i> TaskRoom
            </Link>
          </Typography>
          {isLogged && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                keepMounted
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
                <MenuItem onClick={() => (document.location.href = "/logout")}>
                  Logout
                </MenuItem>
              </Menu>
              <ProfileDialog
                open={profileOpen}
                handleClose={handleProfileClose}
              />
            </div>
          )}
          {!isLogged && (
            <Button
              onClick={loginModal.onHandleShow}
              variant="contained"
              size="small"
              color="secondary"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;

