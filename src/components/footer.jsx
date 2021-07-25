import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    bottom: 0,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <footer className={classes.footer}>
      {/* <Typography variant="h6" align="center" gutterBottom>
        TaskRoom 2021
      </Typography> */}
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        TaskRoom 2021
      </Typography>
      {/* <Copyright /> */}
    </footer>
  );
};

export default Footer;
