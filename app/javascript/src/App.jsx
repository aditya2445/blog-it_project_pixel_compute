import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Dashboard from "components/Dashboard";
import { CreatePost, ShowPost, EditPost } from "components/Posts";
import MyPosts from "components/Posts/Table/MyPosts";
import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "utils/storage";

import queryClient from "./utils/queryClient";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={CreatePost} path="/post/create" />
          <Route exact component={EditPost} path="/posts/:slug/edit" />
          <Route exact component={ShowPost} path="/posts/:slug/show" />
          <Route exact component={Signup} path="/signup" />
          <Route exact component={Login} path="/login" />
          <Route exact component={MyPosts} path="/posts/my_posts" />
          <PrivateRoute
            component={Dashboard}
            condition={isLoggedIn}
            path="/"
            redirectRoute="/login"
          />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
