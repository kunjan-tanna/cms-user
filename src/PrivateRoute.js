import React, { Suspense } from "react";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  fullLayout,
  userInfo,
  ...rest
}) => {
  // console.log("UserInfo", userInfo);
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("pppp", userInfo);
        if (userInfo) {
          if (userInfo.role && userInfo.role === "user") {
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
          } else {
            return <h4>You're not admin</h4>;
          }
        } else {
          return <Redirect to="/pages/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
