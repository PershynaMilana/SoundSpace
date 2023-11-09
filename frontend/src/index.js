import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store/index";
import { PlayerProvider } from "./services/PlayerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <PlayerProvider>
                    <App />
                </PlayerProvider>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);
