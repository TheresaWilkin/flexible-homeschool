import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Container from './atoms/Container';

import Header from './Header';
import PrivateRoute from './Authentication/PrivateRoute';
import Signin from './Authentication/Signin';
import Signout from './Authentication/Signout';
import Authorization from './Authentication/Authorization';

import requireAuthorization from './Authentication/requireAuthorization';
import requireAuthentication from './Authentication/requireAuthentication';

const User = Authorization(['user', 'manager', 'admin']);

// Homepage with sample button requiring authentication
const Button = () => <button>Secret Button</button>;
const PrivateButton = requireAuthentication(Button);
const Home = () => (
  <Container>
    <p>This is the homepage</p>
    <PrivateButton />
  </Container>
);

const Filler = () => <img src="https://http.cat/404" alt="404" />;

// Component with button requiring authorization
const UserItem = requireAuthorization(['user']);
const UsersOnlyButton = UserItem(Button);
const Private = () => (
  <div>
    <p>Now accessing private route!</p>
    <UsersOnlyButton />
  </div>
);

export default () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* this is a route requiring authentication */}
        <PrivateRoute path="/auth" component={Private} />
        {/* this is a route requiring authentication and authorization */}
        <PrivateRoute path="/role" component={User(Private)} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/" component={Filler} />
      </Switch>
    </div>
  </Router>
);
