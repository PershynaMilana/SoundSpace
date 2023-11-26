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
import { authActions } from "../store/index";
import HomeIcon from "@mui/icons-material/Home";
import HeadsetIcon from "@mui/icons-material/Headset";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import menuIcon from "../assets/images/account_icon2.png";
import logo from "../assets/images/logo2.png";
import { styled } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
axios.defaults.withCredentials = true;

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const location = useLocation();
    const [value, setValue] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isInputActive, setInputActive] = useState(false);

    const handleSearch = (e) => {
        if (e.key === "Enter" && isInputActive) {
            window.location.href = `/search/${searchQuery}`;
        }
    };

    const handleClearSearch = () => {
        setInputActive(false);
        setSearchQuery("");
    };

    const handleSearchClick = () => {
        setInputActive(true);
    };

    const handleSearchBlur = () => {
        setInputActive(false);
        setSearchQuery("");
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sendLogoutReq = async () => {
        try {
            console.log("Sending logout request...");
            const res = await axios.post(
                "http://localhost:8080/api/logout",
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
    const SearchContainer = styled("div")({
        position: "relative",
    });
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

    const CustomTab = (props) => {
        return (
            <Tab
                component={Link}
                {...props}
                sx={{
                    fontSize: "16px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                }}
                label={
                    <div style={{ display: "flex", alignItems: "center", marginTop: "7px",}}>
                        {props.label === "Library" ? (
                            <>
                                <HeadsetIcon
                                    style={{ fontSize: 24, marginRight: "4px"}}
                                />{" "}
                                {props.label}
                            </>
                        ) : props.label === "Home" ? (
                            <>
                                <HomeIcon
                                    style={{ fontSize: 24, marginRight: "4px" }}
                                />{" "}
                                {props.label}
                            </>
                        ) : (
                            props.label
                        )}
                    </div>
                }
            />
        );
    };

    return (
        <div>
            <Box
                sx={{
                    borderBottom: "1px solid #696969",
                    backgroundColor: "#333333",
                }}
            >
                <AppBar position="sticky" sx={{ backgroundColor: "#000000" }}>
                    <Toolbar
                        style={{
                            marginLeft: "50px",
                            marginRight: "20px",
                            display: "flex",
                            alignItems: "center",
                            verticalAlign: "middle",
                        }}
                    >
                        <Link
                            to="/home"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    marginTop: "7px",
                                    height: "65px",
                                    width: "250px",
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
                                            style: {
                                                backgroundColor: "#1DB954",
                                            },
                                        }}
                                    >
                                        <CustomTab to="/home" label="Home" />
                                        <CustomTab
                                            to="/library/overview"
                                            label="Library"
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
                                        <div
                                            onClick={() => setInputActive(true)}
                                        >
                                            <Link
                                                to={`/search/${encodeURIComponent(
                                                    searchQuery
                                                )}`}
                                            >
                                                <div
                                                    style={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <InputBase
                                                        id="search-input"
                                                        placeholder="Search"
                                                        inputProps={{
                                                            "aria-label":
                                                                "search",
                                                        }}
                                                        style={{
                                                            backgroundColor:
                                                                "#b5b5b5",
                                                            color: "black",
                                                            paddingLeft: "40px",
                                                            cursor: "pointer",
                                                            width: isInputActive
                                                                ? "700px"
                                                                : "250px",
                                                            borderRadius:
                                                                isInputActive
                                                                    ? "0px"
                                                                    : "20px",
                                                            height: isInputActive
                                                                ? "80px"
                                                                : "40px",
                                                            position:
                                                                "relative",
                                                            transition:
                                                                "all 0.3s ease-in-out",
                                                        }}
                                                        onBlur={
                                                            handleSearchBlur
                                                        }
                                                        onFocus={
                                                            handleSearchClick
                                                        }
                                                        value={searchQuery}
                                                        onChange={(e) =>
                                                            setSearchQuery(
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyDown={handleSearch}
                                                    />
                                                    <SearchRoundedIcon
                                                        style={{
                                                            color: "black",
                                                            fontSize: 24,
                                                            position:
                                                                "absolute",
                                                            left: "12px",
                                                            top: "50%",
                                                            transform:
                                                                "translateY(-50%)",
                                                        }}
                                                    />
                                                    {searchQuery && ( 
                                                        <ClearIcon
                                                            onClick={
                                                                handleClearSearch
                                                            }
                                                            style={{
                                                                color: "black",
                                                                fontSize: 20,
                                                                position:
                                                                    "absolute",
                                                                right: "12px",
                                                                top: "50%",
                                                                transform:
                                                                    "translateY(-50%)",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
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
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                        }}
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
                                        TabIndicatorProps={{
                                            style: {
                                                backgroundColor: "#1DB954",
                                            },
                                        }}
                                    >
                                        <CustomTab to="/login" label="Login" />
                                        <CustomTab
                                            to="/signup"
                                            label="Signup"
                                        />
                                    </Tabs>
                                )
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;
