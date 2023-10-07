import React, { useState } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "./store";
import menuIcon from "./images/account_icon.png";

axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();

  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable to Logout. Please try again");
  };

  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h3">
            <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
              Sound Space
            </Link>
          </Typography>
          <Box sx={{ marginRight: "auto", display: "flex", alignItems: "center" }}>
            {location.pathname !== "/login" && location.pathname !== "/signup" && (
              <Tabs
                indicatorColor="secondary"
                onChange={(e, val) => setValue(val)}
                value={value}
                textColor="inherit"
              >
                <Tab
                  to="/home"
                  LinkComponent={Link}
                  label="Home"
                  sx={{ fontSize: "14px", color: "#808080" }}
                />
                <Tab
                  to="/library"
                  LinkComponent={Link}
                  label="Library"
                  sx={{ fontSize: "14px", color: "#808080" }}
                />
              </Tabs>
            )}
          </Box>
          <Box>
            {isLoggedIn ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <InputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                  style={{
                    marginRight: "16px",
                    backgroundColor: "#808080",
                    borderRadius: "16px",
                    paddingLeft: "12px",
                  }}
                />
                <Tabs
                  indicatorColor="secondary"
                  onChange={(e, val) => setValue(val)}
                  value={value}
                  textColor="inherit"
                >
                  <Tab
                    to="/logout"
                    LinkComponent={Link}
                    label="Logout"
                    sx={{ fontSize: "14px", color: "#808080" }}
                  />
                </Tabs>
                <IconButton onClick={handleMenuClick} color="inherit" style={{ width: "32px", height: "32px" }}>
                  <img src={menuIcon} alt="Menu" style={{ width: "40px", height: "40px", margin: "7px" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={Link} to="/account" onClick={handleMenuClose}>
                    Account
                  </MenuItem>
                  <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>
                    Settings
                  </MenuItem>
                  <MenuItem component={Link} to="/logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              (location.pathname !== "/login" && location.pathname !== "/signup") && (
                <Tabs
                  indicatorColor="secondary"
                  onChange={(e, val) => setValue(val)}
                  value={value}
                  textColor="inherit"
                >
                  <Tab
                    to="/login"
                    LinkComponent={Link}
                    label="Login"
                    sx={{ fontSize: "14px", color: "#808080" }}
                  />
                  <Tab
                    to="/signup"
                    LinkComponent={Link}
                    label="Signup"
                    sx={{ fontSize: "14px", color: "#808080" }}
                  />
                </Tabs>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
