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
import ProfileUser from './AccessLvl-3/Profile/Profile';
import CalendarUser from './AccessLvl-3/Vizits/Calendar';
import MedsUser from './AccessLvl-3/Meds/Meds';
import SymptomsUser from './AccessLvl-3/Symptoms/Symptoms';
import MedicalStaff from './AccessLvl-3/MedicalStaff/MedicalStaff';
import Questionnaire from './AccessLvl-3/Questionnaire/Questionaire'
import UserList from './AccessLvl-4/Users/Users';
import DiseaseList from './AccessLvl-4/Disease/Disease'

const RoutingConfig = () => (
  <Router>
      <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={NavBar} />
    </Switch>
    <Route path="/patients" component={Patients} />
    <Route path="/profile" component={Profile} />
    <Route path="/calendar" component={Calendar} />
    <Route path="/profileUser" component={ProfileUser} />
    <Route path="/calendarUser" component={CalendarUser} />
    <Route path="/treatmentUser" component={MedsUser} />
    <Route path="/symptomsUser" component={SymptomsUser} />
    <Route path="/medicalStaff" component={MedicalStaff} />
    <Route path="/questionnaire" component={Questionnaire}/>
    <Route path="/userList" component={UserList} />
    <Route path="/diseaseList" component={DiseaseList} />

  </Router>
);

export default RoutingConfig;