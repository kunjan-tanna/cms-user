import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import Blog from "./views/pages/Blog";
import PrivateRoute from "../src/PrivateRoute";
import UserRoute from "../src/UserRoute";
// Route-based code splitting

const UserDashboard = lazy(() => import("./views/pages/UserDashboard"));
const Post = lazy(() => import("./views/pages/Post"));
//Comment Module
const AddComment = lazy(() => import("./views/pages/comments/addComment"));
//Blog Module
const blog = lazy(() => import("./views/pages/Blog"));
const viewBlog = lazy(() => import("./views/pages/blogs/viewBlog"));
const addPost = lazy(() => import("./views/pages/blogs/addPost"));
const login = lazy(() => import("./views/pages/authentication/login/Login"));
const register = lazy(() =>
  import("./views/pages/authentication/register/Register")
);
const forgotPassword = lazy(() =>
  import("./views/pages/authentication/login/ForgotPassword")
);
const resetPassword = lazy(() =>
  import("./views/pages/authentication/login/ResetPassword")
);

//Post Module

const editPost = lazy(() => import("./views/pages/posts/editPost"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      console.log("Propssssssssss", props);
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
    userInfo: state.auth.login.userInfo,
    token: state.auth.login.accessToken,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    console.log("PROPS", this.props);
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          {/* For user side */}
          <PrivateRoute
            userInfo={this.props.userInfo}
            exact
            path="/user/dashboard"
            component={UserDashboard}
          />

          {/* For Post */}
          <PrivateRoute
            userInfo={this.props.userInfo}
            exact
            path="/post"
            component={Post}
          />

          <PrivateRoute
            userInfo={this.props.userInfo}
            exact
            path="/edit/post"
            component={editPost}
          />
          {/* For Comments */}
          <PrivateRoute
            userInfo={this.props.userInfo}
            exact
            path="/add/comment"
            component={AddComment}
          />
          {/* For Blog */}
          <PrivateRoute
            userInfo={this.props.userInfo}
            path="/blog"
            component={blog}
          />
          <PrivateRoute
            userInfo={this.props.userInfo}
            path="/view/blog"
            component={viewBlog}
          />
          <PrivateRoute
            userInfo={this.props.userInfo}
            exact
            path="/add/post"
            component={addPost}
          />
          <AppRoute path="/pages/login" component={login} fullLayout />
          <AppRoute path="/pages/register" component={register} fullLayout />
          <AppRoute
            path="/pages/forgot-password"
            component={forgotPassword}
            fullLayout
          />
          <AppRoute
            path="/resetpassword"
            component={resetPassword}
            fullLayout
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(AppRouter);
