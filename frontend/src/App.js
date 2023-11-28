import "./App.css";
import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { LikesProvider } from "./services/LikesContext";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Player from "./components/Player";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./components/Library";
import Account from "./pages/account";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordReset from "./pages/PasswordReset";
import NewUserPlaylist from "./pages/NewUserPlaylist";
import Welcome from "./pages/Welcome";
import Author from "./pages/Author";
import Playlist from "./pages/Playlist";
import Section from "./pages/Section";
import Sets from "./pages/Sets";
import Albums from "./pages/Albums";
import Likes from "./pages/Likes";
import Overview from "./pages/Overview";


function App() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const audioPlayerRef = useRef(null);
    console.log(isLoggedIn);
    return (
        <React.Fragment>
            <header
                className={
                    isLoggedIn ? "header-loggedin" : "header-notloggedin"
                }
            >
                <Header />
            </header>
            <main className={isLoggedIn ? "main-loggedin" : "main-notloggedin"}>

                <LikesProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        {<Route path="/home" element={<Home />} />}
                        <Route path="/search/:query" element={<Search />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/section" element={<Section />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="/library/sets" element={<Sets />} />
                        <Route path="/library/albums" element={<Albums />} />
                        <Route path="/album/:albumId" element={<Albums />} />
                        <Route path="/library/likes" element={<Likes />} />
                        <Route path="/library/overview" element={<Overview />} />
                        {isLoggedIn && <Route path="/user" element={<Welcome />} />}

                        <Route
                            path="/reset-password"
                            element={<PasswordResetRequest />}
                        />{" "}
                        <Route
                            path="/reset-password/:token"
                            element={<PasswordReset />}
                        />{" "}

                        <Route
                            path="/author/:authorName"
                            element={<Author />} />

                        <Route
                            path="/author/:playlistName"
                            element={<Playlist />}
                        />
                        <Route
                            path="/artist/:artistId"
                            element={<Author />} />

                        <Route
                            path="/playlist/:playlistId"
                            element={<Playlist />}
                        />

                        <Route
                            path="/newplaylist/:playlistId"
                            element={<NewUserPlaylist />} />

                    </Routes>
                </LikesProvider>
            </main>
            <footer>
                {isLoggedIn ? <Player ref={audioPlayerRef} /> : false}
            </footer>
        </React.Fragment>
    );
}

export default App;
