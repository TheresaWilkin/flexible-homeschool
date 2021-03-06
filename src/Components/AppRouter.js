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
import Signup from './Authentication/Signup';

import Authorization from './Authentication/Authorization';

import requireAuthorization from './Authentication/requireAuthorization';
import requireAuthentication from './Authentication/requireAuthentication';

import StudentsList from './Students/StudentsContainer';
import Google from './Authentication/GoogleAuth';

const Teacher = Authorization(['teacher']);

const Home = () => (
  <Container>
    <p>This is the homepage</p>
    <Google />
  </Container>
);

const NotFound = () => <img src="https://http.cat/404" alt="404" />;

// Homepage with sample button requiring authentication
// const Button = () => <button>Secret Button</button>;
// const PrivateButton = requireAuthentication(Button);

// button requiring authorization
// const UserItem = requireAuthorization(['teacher']);
// const UsersOnlyButton = UserItem(Button);

export default () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/students" component={Teacher(StudentsList)} />
        <Route path="/googleb141fdfbb9ab7aef.html" render={() => "google-site-verification: googleb141fdfbb9ab7aef.html"} />
        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  </Router>
);
