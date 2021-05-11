import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import './Login.css';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Card from '@material-ui/core/Card';
import { login } from '../utils/UserFunctions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({


    paper: {
        // marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

    avatar: {
        // margin: theme.spacing.unit,
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

    root: {
        borderRadius: '20px',
        margin: '10px',
        boxShadow: "3",
        padding: '10px',
        minWidth: 350,
        maxWidth: 400,
        position: 'absolute',

        minHeight: 400,
    }
});


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    changeField = (event) => {
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    }

    onSubmit = (e) => {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user).then(res => {
            if (res === 200) {
                console.log("HERE")
                this.props.history.push(`/patients`)
            } else if (res === 401) {
                console.log("Here?");
                alert("Wrong username or password");
            } else {
                console.log("Here2?");
                alert("An error ocurred");
            }
        })
        e.preventDefault();
    }

    render() {
        const { classes } = this.props;

        return (
            <header className="backgroundLogin">
                <RemoveScrollBar />
                <Card className={classes.root}>
                    <CardContent className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon className={classes.icon} />
                        </Avatar>
                        <Typography variant="h5" component="h2">
                            Autentificare
                        </Typography>
                        <form className={classes.form} onSubmit={this.onSubmit} >
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name="email" type="email" autoComplete="email" autoFocus onChange={this.changeField.bind(this)} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Parolă</InputLabel>
                                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.changeField.bind(this)} />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="secondary" />}
                                label="Amintește-ți userul și parola"
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Autentifică-te
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </header>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));