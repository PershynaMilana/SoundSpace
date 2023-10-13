import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Tab,
    Tabs,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    InputBase,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "./store";
import menuIcon from "./images/account_icon2.png";
import logo from "./images/logo.png";

axios.defaults.withCredentials = true;

const Header = () => {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();
  const [value, setValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
=======
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const location = useLocation();
    const [value, setValue] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [isInputActive, setInputActive] = useState(false);

    const handleSearch = (e) => {
      if (e.key === "Enter") {
        // Перенаправляем пользователя на страницу поиска с параметром запроса
        window.location.href = `/search/${searchQuery}`;
      }
    };
  

    const handleSearchClick = () => {
        setInputActive(true);
    };

    const handleSearchBlur = () => {
        setInputActive(false);
    };
>>>>>>> eb59dc3 (Seventh commit)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

<<<<<<< HEAD
  const sendLogoutReq = async () => {
    try {
      console.log("Sending logout request...");
      const res = await axios.post("http://localhost:5000/api/logout", null, {
        withCredentials: true,
      });
      console.log("Logout response:", res.data);
      if (res.status === 200) {
        return res;
      }
    } catch (error) {
      return new Error("Unable to Logout. Please try again");
    }
  };

  const handleLogout = () => {
    sendLogoutReq().then(() => {
      dispatch(authActions.logout());
      document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/";
    });
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (token) {
      dispatch(authActions.login())
    }
  }, []);


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
                {}
                <Tab
                  to="/search"
                  LinkComponent={Link}
                  label="Search"
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
=======
    const sendLogoutReq = async () => {
        try {
            console.log("Sending logout request...");
            const res = await axios.post(
                "http://localhost:5000/api/logout",
                null,
                {
                    withCredentials: true,
                }
            );
            console.log("Logout response:", res.data);
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            return new Error("Unable to Logout. Please try again");
        }
    };

    const handleLogout = () => {
        sendLogoutReq().then(() => {
            dispatch(authActions.logout());
            document.cookie =
                "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/";
        });
    };

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token="))
            ?.split("=")[1];

        if (token) {
            dispatch(authActions.login());
        }
    }, []);

    return (
        <div>
            <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
                <Toolbar>
                    <Link
                        to="/home"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                height: "60px",
                                marginRight: "10px",
                                marginTop: "10px",
                            }}
                        />
                    </Link>
                    <Box
                        sx={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {location.pathname !== "/login" &&
                            location.pathname !== "/signup" && (
                                <Tabs
                                    indicatorColor="secondary"
                                    onChange={(e, val) => setValue(val)}
                                    value={value}
                                    textColor="white"
                                    TabIndicatorProps={{
                                        style: { backgroundColor: "#1DB954" },
                                    }}
                                >
                                    <Tab
                                        to="/home"
                                        LinkComponent={Link}
                                        label="Home"
                                        sx={{
                                            fontSize: "14px",
                                            color: "#808080",
                                        }}
                                    />
                                    <Tab
                                        to="/library"
                                        LinkComponent={Link}
                                        label="Library"
                                        sx={{
                                            fontSize: "14px",
                                            color: "#808080",
                                        }}
                                        style={{
                                            "&.Mui-selected": {
                                                textDecoration: "#1DB954",
                                            },
                                        }}
                                    />
                                    <Tab
                                        to="/search"
                                        LinkComponent={Link}
                                        label="Search"
                                        sx={{
                                            fontSize: "14px",
                                            color: "#808080",
                                        }}
                                        style={{
                                            "&.Mui-selected": {
                                                color: "#1DB954",
                                            },
                                        }}
                                    />
                                </Tabs>
                            )}
                    </Box>
                    <Box>
                        {isLoggedIn ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                               <div
        onClick={() => setInputActive(true)}
        style={{
          cursor: "pointer",
          marginRight: "16px",
        }}
      >
        <InputBase
          id="search-input"
          placeholder="Search..."
          inputProps={{
            "aria-label": "search",
          }}
          style={{
            backgroundColor: "#808080",
            borderRadius: "16px",
            paddingLeft: "12px",
            color: "white",
            cursor: "pointer",
            width: isInputActive ? "500px" : "200px",
            transition: "width 0.3s",
          }}
          onBlur={() => setInputActive(false)}
          onFocus={() => setInputActive(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch} // Обработка нажатия клавиши Enter
        />
      </div>
                                <Tabs
                                    indicatorColor="secondary"
                                    onChange={(e, val) => setValue(val)}
                                    value={value}
                                    textColor="white"
                                />
                                <IconButton
                                    onClick={handleMenuClick}
                                    color="inherit"
                                    style={{ width: "32px", height: "32px" }}
                                >
                                    <img
                                        src={menuIcon}
                                        alt="Menu"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            margin: "7px",
                                        }}
                                    />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem
                                        component={Link}
                                        to="/account"
                                        onClick={handleMenuClose}
                                        sx={{ color: "black" }}
                                    >
                                        Account
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/profile"
                                        onClick={handleMenuClose}
                                        sx={{ color: "black" }}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/settings"
                                        onClick={handleMenuClose}
                                        sx={{ color: "black" }}
                                    >
                                        Settings
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/logout"
                                        onClick={handleLogout}
                                        sx={{ color: "black" }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            location.pathname !== "/login" &&
                            location.pathname !== "/signup" && (
                                <Tabs
                                    indicatorColor="secondary"
                                    onChange={(e, val) => setValue(val)}
                                    value={value}
                                    textColor="white"
                                >
                                    <Tab
                                        to="/login"
                                        LinkComponent={Link}
                                        label="Login"
                                        sx={{
                                            fontSize: "14px",
                                            color: "#808080",
                                        }}
                                    />
                                    <Tab
                                        to="/signup"
                                        LinkComponent={Link}
                                        label="Signup"
                                        sx={{
                                            fontSize: "14px",
                                            color: "#808080",
                                        }}
                                    />
                                </Tabs>
                            )
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
>>>>>>> eb59dc3 (Seventh commit)
};

export default Header;
