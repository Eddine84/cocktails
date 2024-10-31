import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { MixMasterContext } from "./context/MixMasterContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MixMasterContext>
      <ToastContainer position="top-center" autoClose={2000} />
      <App />
    </MixMasterContext>
  </React.StrictMode>
);
