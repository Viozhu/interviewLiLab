import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PetsIcon from "@material-ui/icons/Pets";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(),
    color: "#fff",
  },
  title: {
    flexGrow: 1,
  },
  removelink: { textDecoration: "none", color: "#fff" },
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="primary">
            <Button color="primary">
              <NavLink to="/" className={classes.removelink}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <PetsIcon />
                </IconButton>
                FaceDog
              </NavLink>
            </Button>
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            className={classes.menuButton}
          >
            Join Now!
          </Button>
          <Button
            color="primary"
            variant="outlined"
            className={classes.menuButton}
          >
            Sign Up!
          </Button>
          <Button
            color="primary"
            variant="outlined"
            className={classes.menuButton}
          >
            About Us
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
