import React, { Component } from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Application from "./App/Application";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import MoviesMockAPI from "./API/MoviesMockAPI";
import UsersMockAPI from "./API/UsersMockAPI";


render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
  document.getElementById("root")
);
