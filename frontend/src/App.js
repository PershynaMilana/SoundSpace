import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Player from "./components/Player";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Search from "./components/Search";
import Library from "./components/Library";
import Account from "./components/account";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";
import Author from "./components/Author";
import Playlist from "./components/Playlist";
import Section from "./components/Section"

function App() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    console.log(isLoggedIn);
    return (
        <React.Fragment>
            <header>
                <Header />
            </header>
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    {<Route path="/home" element={<Home />} />}
                    <Route path="/search/:query" element={<Search />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/section" element={<Section/>}/>
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

                     <Route path="/playlist/:playlistId"
                     element={<Playlist />}/>

                </Routes>
            </main>
            <footer>{isLoggedIn ? <Player /> : false}</footer>
        </React.Fragment>
    );
}

export default App;
