import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { deconnexionUser } from "../Apps/connexion/functions";
import { Menu, MenuItem, IconButton, Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

const Topbar = ({ toggleFullscreen, title, fullscreen, user }) => {
  moment.locale("fr");
  const [time, settime] = useState(
    moment().format("ddd DD MMMM YYYY - HH : mm : ss")
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      settime(moment().format("ddd DD MMMM YYYY - HH : mm : ss"));
    }, 1000);

    return function unmount() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="row p-1">
      <div className="col-3">
        <small>{title}</small>
      </div>
      <div className="col-6 text-center">
        <small>{time}</small>
      </div>
      <div className="col-3 text-center">
        <IconButton size="small" onClick={toggleFullscreen}>
          {!fullscreen ? <FullscreenIcon /> : <FullscreenExitIcon />}
        </IconButton>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          size="small"
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
        {/* <Avatar size="small" className={{}}>YD</Avatar> */}
        <Menu
          elevation={1}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem style={{ fontSize: "13px" }} onClick={handleClose}>
            Notification
          </MenuItem>
          <MenuItem style={{ fontSize: "13px" }} onClick={deconnexionUser}>
            Déconnexion
          </MenuItem>
        </Menu>
        <small>{user}</small>
      </div>
    </div>
  );
};

Topbar.prototype = {
  toggleFullscreen: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Topbar;
