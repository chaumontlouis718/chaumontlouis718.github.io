import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#01a000",
        },
        secondary: {
            main: "#af8e00",
        },
        error: {
            main: "#ff392a",
        },
        background: {
            main: "#d7d7d7",
            sidebar: "#ffffff",
        },
        divider: "rgba(255,255,255,0.25)",
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

