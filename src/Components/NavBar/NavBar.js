import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';

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
      currentUser: {}
    };
    this.navigate = this.navigate.bind(this);
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
                



              </Toolbar>
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