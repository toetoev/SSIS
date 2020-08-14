import "bootstrap/dist/css/bootstrap.css";
import 'semantic-ui-css/semantic.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'antd/dist/antd.css'; 

import App from "./App";
import React from "react";
import { render } from "react-dom";

const rootElement = document.getElementById("root");

render(<App />, rootElement);
