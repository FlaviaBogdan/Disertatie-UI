import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import 'react-notifications/lib/notifications.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { sendCall, getPatientByUserID, getUserDetails} from '../utils/UserFunctions'


const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  title2: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  buttons: {
    marginRight: '100px'
  },
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      vitalSigns: false,
      doctorNumber: "",
      patientNumber: "",
    };
    this.navigate = this.navigate.bind(this);
  }

  alertDoctor(){
    console.log("TEST NAV ", this.state.doctorNumber, "  ", this.state.patientNumber)
    sendCall(this.state.doctorNumber, this.state.patientNumber);
  }

  navigate(navigateTo) {
    switch (navigateTo) {
      case 'Profile':
        this.props.history.push(`/profile`)
        break;
      case 'Patients':
        this.props.history.push(`/patients`)
        break;
      case 'Calendar':
        this.props.history.push(`/calendar`)
        break;
      case 'Symptoms':
        this.props.history.push(`/symptomsUser`)
        break;
      case 'Meds':
        this.props.history.push(`/treatmentUser`)
        break;
      case 'MedicalStaff':
        this.props.history.push(`/medicalStaff`)
        break;
      case 'Questionnaire':
        this.props.history.push(`/questionnaire`)
        break;
      case 'UserList':
        this.props.history.push(`/userList`)
        break;
      case 'DiseaseList':
        this.props.history.push(`/diseaseList`)
        break;

        
      case 'ProfileUser':
        this.props.history.push(`/profileUser`)
        break;
      case 'CalendarUser':
        this.props.history.push(`/calendarUser`)
        break;
      default:
        this.props.history.push(`/`)
        break;
    }
  }

  async componentWillMount() {
    const token = localStorage.usertoken
    if (token) {
      try {
        const decoded = jwt_decode(token)

        this.setState({
          currentUser: decoded
        })
        getPatientByUserID(decoded._id).then((res)=>{
          if(res){
            getUserDetails(res.doctors[0]).then((doctor)=>{
              this.setState({
                doctorNumber: doctor.phone
              })
            })
           this.setState({
             patientNumber: res.phone
           })
          }
        })
      } catch (err) {
        alert(err);
      }
    }


  }

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('/login')
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <RemoveScrollBar />
        {localStorage.usertoken ?

          <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Typography className={classes.title2} variant="h6" noWrap>
                  Patients Monitoring
          </Typography>
                <div className={classes.grow} />
                {this.state.currentUser.lvlAccess === 1 || this.state.currentUser.lvlAccess === 2 ?
                  <div className={classes.buttons}>
                    <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("Patients")} disabled={this.props.authentificatedUser}>
                      Patients
                      </Button>
                    <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("Calendar")}>
                      Calendar
                    </Button>
                    <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("Profile")}>
                      Profile
                    </Button>
                    <Button size="large" className={classes.margin} color="inherit" onClick={this.logOut.bind(this)} >Sign Out</Button>
                  </div>
                  :
                  this.state.currentUser.lvlAccess === 3 ?
                    <div className={classes.buttons}>
                  
                        <Button size="large" className={classes.margin} color="inherit" onClick={() => this.alertDoctor()}>
                          Alert
                          
                      </Button>
                        <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("Symptoms")}>
                          Vital Signs
                          
                      </Button>
                        <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("Questionnaire")}>
                        Questionnaire
                         
                      </Button>
                
                     
                      <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("CalendarUser")}>
                        Calendar
                    </Button>
                      <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("ProfileUser")}>
                        Profile
                    </Button>
                      <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("Meds")}>
                        Treatment
                    </Button>
                      <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("MedicalStaff")}>
                        Medical Staff
                    </Button>
                      <Button size="large" className={classes.margin} color="inherit" onClick={this.logOut.bind(this)} >Sign Out</Button>
                    </div>
                    :
                    this.state.currentUser.lvlAccess === 4 ?
                     <div>
                     <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("UserList")}>
                        Users
                    </Button>
                      <Button size="large" className={classes.margin} color="inherit" onClick={() => this.navigate("DiseaseList")}>
                        Disease
                    </Button>
                        <Button size="large" className={classes.margin} color="inherit" onClick={this.logOut.bind(this)} >Sign Out</Button>
                     </div>
                    :
                    null
                }



              </Toolbar>
              <NotificationContainer />
            </AppBar>
          </div>
          :
          this.props.history.push(`/login`)
        }
      </React.Fragment>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavBar));