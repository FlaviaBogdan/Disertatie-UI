import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Patients from './AccesLvl-1/Patients/Patients';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';
import Profile from './AccesLvl-1/Profile/Profile';
import Calendar from './AccesLvl-1/Calendar/Calendar';

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