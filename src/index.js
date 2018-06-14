import React from "react";
import { render } from "react-dom";
import Splash from "./Splash.js";
import {BrowserRouter} from 'react-router-dom';

render(<BrowserRouter ><Splash /></BrowserRouter>, document.getElementById("root"));
