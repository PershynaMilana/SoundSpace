import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store/index";
import { PlayerProvider } from "./services/PlayerContext";
import { ThemeProvider } from "./services/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
            <ThemeProvider>
                <PlayerProvider>
                    <App />
                </PlayerProvider>
            </ThemeProvider>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);
