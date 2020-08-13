import "bootstrap/dist/css/bootstrap.css";
import "../src/css/dashboard.css"

import App from "./App";
import React from "react";
import { render } from "react-dom";

const rootElement = document.getElementById("root");

render(<App />, rootElement);
