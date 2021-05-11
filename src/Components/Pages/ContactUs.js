import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import background from '../../Images/background.jpg';
import Input from '@material-ui/core/Input';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
//import { withRouter } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { login } from '../../utils/UserFunctions';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import NavBar from '../NavBar/NavBar'


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
        minWidth: 75,
        minHeight: 75,
    },

    icon: {
        width: 50,
        height: 50,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 0.5,
    },

    submit: {
        marginTop: theme.spacing.unit * 3,
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    root: {
        borderRadius: '20px',
        margin:'10px',
        boxShadow: "3",
        padding:'10px',
        minWidth: 350,
        maxWidth: 400,
        minHeight: 400,
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    title: {
        fontSize: 14,
    },

    pos: {
        marginBottom: 12,
    },
});


class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    openRegisterForm(dialogName) {
        this.props.history.push(`/`)
      }
    

    changeField = (event) => {
        console.log("WHAT IS CHANGED: " + event.target.id);
        console.log("NEW VALUE: " +  event.target.value)
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    }

    //   onSubmit = (e) => {
    //     const user = {
    //       email: this.state.email,
    //       password: this.state.password
    //     }
    //     login(user).then(res => {
    //       if (res === 200) {
    //         this.props.history.push(`/`)
    //         this.props.onClose(true);
    //       } else if (res === 401) {
    //         alert("Wrong username or password");
    //       } else {
    //         alert("An error ocurred");
    //       }
    //     })
    //     e.preventDefault();
    //   }


    render() {
        const { classes } = this.props;

        return (
            <header >
              <Typography variant="h6" >
                  CONTACT US
              </Typography>
              <Typography variant="h6" >
                  CONTACT US
              </Typography>
              <Typography variant="h6" >
                  CONTACT US
              </Typography>
              <Typography variant="h6" >
                  CONTACT US
              </Typography>
              <Typography variant="h6" >
                  CONTACT US
              </Typography>
              <Typography variant="h6" >
                  CONTACT US
              </Typography>
              <Typography variant="h6" >
                  CONTACT US
              </Typography>
              <Typography variant="h6" >
                  CONTACT US
              </Typography>
              <Button color="inherit" onClick={() => this.openRegisterForm("loginDialogOpen")}>NavBar</Button>
  
            </header>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));