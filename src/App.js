import React from "react";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";

export default function App() {
  return (
    <React.Fragment>
      <Route path="/" component={Home} />
    </React.Fragment>
  );
}
