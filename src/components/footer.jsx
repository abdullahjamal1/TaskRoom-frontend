import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#e8eaf6",
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
        2021 <i className="fa fa-thumb-tack" aria-hidden="true"></i> TaskRoom By
        Abdullah Jamal
      </Typography>
      <Typography variant="subtitle1" align="center" component="p">
        Contact us at{" "}
        <Link
          href={`https://mail.google.com/mail/u/0/?fs=1&to=contact@taskroom.cloud&tf=cm`}
        >
          contact@taskroom.cloud
        </Link>
      </Typography>
      {/* <Copyright /> */}
    </footer>
  );
};

export default Footer;
