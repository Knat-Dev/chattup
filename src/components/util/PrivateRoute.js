import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
