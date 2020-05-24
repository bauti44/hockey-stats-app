import React from 'react';
import URL_REPO from '../helpers/UrlRepo';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.token ? (
            <Route
              {...props}
              render={matchProps => <Component {...matchProps} />}
            />
          ) : (
            <Redirect
              to={{ pathname: URL_REPO.LOGIN}}
            />
          )}
      />
    );
  }
}
export default PrivateRoute;
