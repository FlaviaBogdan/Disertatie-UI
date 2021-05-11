import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import jwt_decode from 'jwt-decode';
import { modifyCom } from '../../../utils/UserFunctions'



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
        marginTop: theme.spacing.unit * 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.unit * 3,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },

    margin: {
        margin: theme.spacing(1),
    },
    multilineColor: {
        color: 'black'
    }
});

const ValidationTextField = withStyles({
    root: {
        "& .MuiFormLabel-root": {
            color: "black" // or black
        },
        '& input:valid + fieldset': {
            borderColor: '#01579b',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: '#01579b',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);

class CommunicationForm extends React.Component {
    state = {
        phone: '',
        fix: '',
        fax: '',
        currentUserID: "",
    }
    constructor(props) {
        super(props);
        this.state.phone = this.props.currentUser.phone;
        this.state.fix = this.props.currentUser.fix;
        this.state.fax = this.props.currentUser.fax;
    }

    async componentWillMount() {
        const token = localStorage.usertoken
        if (token) {
            try {
                const decoded = jwt_decode(token)
                const userIdToBeSent = decoded._id;

                this.setState({
                    currentUserID: userIdToBeSent
                })
            } catch (err) {
                alert(err);
            }
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
        const comDetails = {
            fix: this.state.fix,
            fax: this.state.fax,
            phone: this.state.phone,
            userID: this.state.currentUserID,
        }
        modifyCom(comDetails);
        this.props.onClose("modifyCommunicationDialogOpen");
        e.preventDefault();
    }


    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <div className={classes.paper}>
                    <ContactPhoneIcon style={{
                        color: '#01579b',
                        height: '60px',
                        width: '60px',
                    }} />
                    <Typography component="h6" variant="h6" style={{ marginBottom: '15px', marginTop: '10px' }}>
                        Modify Communication Channels
                    </Typography>
                    <Grid
                        justify="begin" // Add it here :)
                        container
                        spacing={1}
                    >
                        <Grid item>
                            <Typography style={{ textAlign: 'left' }} component="subtitle2" variant="subtitle2">
                                Be sure before submiting your changes
                            </Typography>
                        </Grid>
                    </Grid>
                    <div style={{ height: '20px' }} />
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <ValidationTextField
                            InputProps={{
                                className: classes.multilineColor
                            }}
                            fullWidth
                            id="phone"
                            label="Mobile"
                            defaultValue={this.state.phone}
                            variant="outlined"
                            onChange={this.changeField.bind(this)}
                        />
                        <div style={{ height: '20px' }} />
                        <ValidationTextField
                            InputProps={{
                                className: classes.multilineColor
                            }}
                            fullWidth
                            id="fix"
                            label="Telephone"
                            defaultValue={this.state.fix}
                            variant="outlined"
                            onChange={this.changeField.bind(this)}
                        />
                        <div style={{ height: '20px' }} />
                        <ValidationTextField
                            InputProps={{
                                className: classes.multilineColor
                            }}
                            fullWidth
                            id="fax"
                            label="Fax"
                            defaultValue={this.state.fax}
                            variant="outlined"
                            onChange={this.changeField.bind(this)}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}

                        >
                            Submit Changes
                        </Button>
                    </form>
                </div>
            </main>
        );
    }
}

CommunicationForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CommunicationForm));