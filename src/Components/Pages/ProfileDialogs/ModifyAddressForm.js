import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
// import { login } from '../../utils/UserFunctions';
import withStyles from '@material-ui/core/styles/withStyles';
import jwt_decode from 'jwt-decode';
import { modifyAddress} from '../../utils/UserFunctions'



const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
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

    avatar: {
        height: '60px',
        width: '60px',
        backgroundColor: theme.palette.primary.main,
    },

    margins: {
        padding: theme.spacing.unit * 3,
    },
    margins2: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },

    submit: {
        marginTop: theme.spacing.unit * 3,
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
            borderColor: '01579b',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);

class LoginForm extends React.Component {
    state = {
        country: '',
        city: '',
        street: '',
        postalCode: '',
        adrLine: '',
        currentUserID: "",
    }
    constructor(props) {
        super(props);
        this.state.city = this.props.curAddress.city;
        this.state.country = this.props.curAddress.country;
        this.state.street = this.props.curAddress.street;
        this.state.postalCode = this.props.curAddress.postalCode;
        this.state.adrLine = this.props.curAddress.adrLine;
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
        console.log(event.target.id);
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
        console.log(this.state.country);
    }

    onSubmit = (e) => {
        console.log("TESTING USER IN STATE: ", this.state.currentUserID);
        console.log("TESTING state address: ", this.state);
        const address = {
            country: this.state.city,
            city: this.state.country,
            street: this.state.street,
            postalCode: this.state.postalCode,
            adrLine: this.state.adrLine,
            userID: this.state.currentUserID,
        }
       
        modifyAddress(address);
        this.props.onClose("modifyAddressDialogOpen");
        
 
        e.preventDefault();
    }


    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <HomeIcon style={{
                            height: '50px',
                            width: '50px',
                        }} />
                    </Avatar>
                    <Typography component="h5" variant="h5" style={{ marginBottom: '15px', marginTop: '10px' }}>
                        Modify Address
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
                        <Grid container direction="row" spacing={6}>
                            <Grid item xs={6}>
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    defaultValue={this.state.country}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />
                                <div style={{ height: '20px' }} />
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="city"
                                    label="City"
                                    defaultValue={this.state.city}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="street"
                                    label="Street"
                                    defaultValue={this.state.street}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />
                                <div style={{ height: '20px' }} />
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="postalCode"
                                    label="Postal Code"
                                    defaultValue={this.state.postalCode}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />
                            </Grid>
                        </Grid>
                        <div style={{ height: '20px' }} />
                        <ValidationTextField
                            InputProps={{
                                className: classes.multilineColor
                            }}
                            fullWidth
                            id="adrLine"
                            label="Details"
                            defaultValue={this.state.adrLine}
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

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));