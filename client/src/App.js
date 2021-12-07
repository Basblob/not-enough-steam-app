import "./App.scss";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NetworkPage from "./pages/NetworkPage/NetworkPage";
import SiteHeader from "./components/SiteHeader/SiteHeader";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <SiteHeader />
        <Switch>
          <Route exact path="/" component={NetworkPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
