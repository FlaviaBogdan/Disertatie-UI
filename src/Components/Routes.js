import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Patients from './Pages/Patients';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';
import Profile from './Pages/Profile';
import Calendar from './Calendar/Calendar2';

const RoutingConfig = () => (
  <Router>
      <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={NavBar} />
    </Switch>
    <Route path="/patients" component={Patients} />
    <Route path="/profile" component={Profile} />
    <Route path="/calendar" component={Calendar} />
  </Router>
);

export default RoutingConfig;