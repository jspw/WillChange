import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

let isSignedIn = true;
let navElements;

const Navigation = () => {
  const [showSign, setShowSign] = useState(true);
  const navChange = () => setShowSign(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [anchor, setAnchor] = React.useState(null);
  const isNotificationOpen = Boolean(anchor);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchor(null);
  };

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      id="profile-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      style={{ width: "340px" }}
    >
      <MenuItem onClick={handleMenuClose} /*style={{width: "340px"}}*/>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My Schedule</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
    </Menu>
  );

  const renderNotificationMenu = (
    <Menu
      anchorEl={anchor}
      id="notification menu"
      open={isNotificationOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuItem onClick={handleMenuClose}>Notification 1</MenuItem>
    </Menu>
  );

  if (isSignedIn) {
    navElements = (
      <>
        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={handleNotificationMenuOpen}
        >
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          // aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {renderNotificationMenu}
        {renderProfileMenu}
      </>
    );
  } else
    navElements = (
      <>
        <Nav.Link href="" onClick={navChange}>
          Sign Up
        </Nav.Link>
        <Nav.Link href="" onClick={navChange}>
          Sign In
        </Nav.Link>
      </>
    );

  return (
    <Navbar bg="light">
      <Navbar.Brand href="#home" className={showSign ? null : "m-auto"}>
        Name
      </Navbar.Brand>
      {showSign ? <Nav className="ml-auto">{navElements}</Nav> : null}
    </Navbar>
  );
};

export default Navigation;
