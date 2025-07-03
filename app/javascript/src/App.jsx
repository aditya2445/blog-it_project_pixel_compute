import React from "react";

import { CreatePost, ShowPost } from "components/Posts";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route exact path="/about" render={() => <div>About</div>} />
      <Route exact component={Dashboard} path="/dashboard" />
      <Route exact component={CreatePost} path="/post/create" />
      <Route exact component={ShowPost} path="/posts/:slug/show" />
    </Switch>
  </Router>
);

export default App;
