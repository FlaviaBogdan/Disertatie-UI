import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { createUserDetails, registerUsersLvlAccess} from '../../../utils/UserFunctions'

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
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

class AddNoteForm extends React.Component {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName:"",
        accessLevel : 0,
    }
    constructor(props) {
        super(props);

    }

    handleChange = (event) => {
        this.setState({
            accessLevel: event.target.value
        })

    };

    changeField = (event) => {
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    }

    closeDialog = () => {
        console.log("STATE DIALOG  ", this.state)
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords dont match!")
        }
        else {
            const newUser = {
                email: this.state.email,
                password: this.state.password,
                lvlAccess: parseInt(this.state.accessLevel)
            }
            registerUsersLvlAccess(newUser).then(res => {
                console.log("USER CREATED ", res)
                if (res.status === 201) {
                    const userDetails = {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        lvlAccess: parseInt(this.state.accessLevel),
                        userID: res.data.patientID,
                      
                    }
                    createUserDetails(userDetails).then((res)=> {
                        if(res.status === 201){
                            console.log("DETAILS RES  ", res)
                        }
                    })
                   
                } else if (res === 400) {
                    alert("Email already in use");
                } else {
                    alert("An error ocurred");
                }
            })
        };
        // let today = new Date();
        // const note = {
        //     content: this.state.note,
        //     createdBy: this.state.currentUser,
        //     createdOn: today,
        // }
        // const details = {
        //     note: note,
        //     treatmentID: this.state.currentTreatmentID
        // }
        // addNote(details).then((res) => {
        //     console.log("RESULT NOTE ", res)
        //     if (res.status === 204) {
        //         let obj = JSON.parse(res.config.data);
        //         let note = obj.note;
        //         let creationDate = new Date(note.createdOn);
        //         var dd = String(creationDate.getDate()).padStart(2, '0');
        //         var mm = String(creationDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        //         var yyyy = creationDate.getFullYear();
        //         var hh = String(creationDate.getHours());
        //         var min = String(creationDate.getMinutes());
        //         note.dateTimeFormatted = dd + '.' + mm + '.' + yyyy + " " + hh + ":" + min + " - ";

        //         getUserName(note.createdBy).then((res) => {
        //             note.createdByName = res;
        //            
        //         })
            
        //     }
        //     else {
        //         alert("ERROR!")
        //     }
        // })
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />

                <div className={classes.paper}>
                    <PersonAddIcon style={{
                        color: '#01579b',
                        height: '50px',
                        width: '50px',
                    }} />
                    <Typography variant="h6" >
                        Add user
                    </Typography>
                    <div style={{ height: '20px' }} />
                    <Grid
                        justify="begin" // Add it here :)
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                fullWidth
                                required
                                id="email"
                                label="Email"
                                value={this.state.email}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={this.changeField.bind(this)}
                            />
                        
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">User type</FormLabel>
                                <RadioGroup aria-label="health" name="health" value={this.state.accessLevel} onChange={this.handleChange} row>
                                    <FormControlLabel value="1" control={<Radio />} label="Doctor" />
                                    <FormControlLabel value="2" control={<Radio />} label="Nurse" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                fullWidth
                                required
                                id="password"
                                label="Password"
                                value={this.state.password}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                type='password'
                                onChange={this.changeField.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                fullWidth
                                required
                                id="confirmPassword"
                                label="Confirm Password"
                                value={this.state.confirmPassword}
                                type='password'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={this.changeField.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                fullWidth
                                required
                                id="firstName"
                                label="First Name"
                                value={this.state.firstName}

                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={this.changeField.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                fullWidth
                                required
                                id="lastName"
                                label="Last Name"
                                value={this.state.lastName}
 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={this.changeField.bind(this)}
                            />
                        </Grid>
                    </Grid>
                    <div style={{height:'15px'}}/>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={this.closeDialog}
                    >
                        Submit
                    </Button>
                </div>
            </main>
        );
    }
}

AddNoteForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AddNoteForm));