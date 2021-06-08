import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import './Symptoms.css';
import TextField from '@material-ui/core/TextField';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Card from '@material-ui/core/Card';
import { addVitalSigns, getPatientName, getTodayRegister, addHealthStatusAndEmail, getPatientDoctorListByUser, addHealthStatus } from '../../utils/UserFunctions';
import jwt_decode from 'jwt-decode';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({


    paper: {
        // marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },

    multilineColor: {
        color: 'black'
    },
    avatar: {
        // margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
        minWidth: 75,
        minHeight: 75,
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    icon: {
        width: 50,
        height: 50,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0.5),
    },

    submit: {
        marginTop: theme.spacing(3),
    },

    root: {
        borderRadius: '20px',
        margin: '10px',
        boxShadow: "3",
        padding: '10px',
        minWidth: 700,
        maxWidth: 800,
        position: 'absolute',
        minHeight: 300,
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
    constructor(props) {
        super(props);
        this.state = {
            distolic: '',
            systolic: '',
            temperature: '',
            bloodOxygenLvl: '',
            heartRate: '',
            respiratoryRate: '',
            submitted: false,
            healthState: '',
            description: "",
            currentUserID: "",
            vitalSignsID: "",
            today: "",
            entryToday: false,
            patientName: "",
        }
        this.handleClick = this.handleClick.bind(this)
        this.sendSymptoms = this.sendSymptoms.bind(this)
    }

    async componentWillMount() {
        const token = localStorage.usertoken
        if (token) {
            try {
                const decoded = jwt_decode(token)
                let tod = new Date();
                this.setState({
                    currentUserID: decoded._id,
                    today: tod
                })
                getPatientName(decoded._id).then((res)=>{
                    this.setState({
                        patientName: res
                    })
                })
            } catch (err) {
                alert(err);
            }
        }

        getTodayRegister().then((todayEntries) => {
            console.log("REGISTER2", todayEntries.data)
            if (todayEntries.data.length === 0) {
                this.setState({
                    entryToday: false
                })
            }
            else {
                this.setState({
                    entryToday: true
                })
            }

        })
    }

    changeField = (event) => {
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    }

    handleChange = (event) => {
        this.setState({
            healthState: event.target.value
        })

    };

    sendSymptoms() {
        let arr = []
        console.log("RIGHT PLACE")
        getPatientDoctorListByUser(this.state.currentUserID).then((res) => {
            console.log("DOCTORS ", res)
            if (res) {
                // distolic: '',
                //     systolic: '',
                //         temperature: '',
                //             bloodOxygenLvl: '',
                //                 heartRate: '',
                //                     respiratoryRate: '',
                let message = "";
                let distolic = this.state.distolic;
                let systolic = this.state.systolic;
                let temperature = this.state.temperature;
                let bloodOxygenLvl = this.state.bloodOxygenLvl;
                let heartRate = this.state.heartRate;
                let respiratoryRate = this.state.respiratoryRate;
                if (distolic <= 70 || systolic < 110){
                    message = message + "BP - diastolic: " + distolic + ". BP - systolic: " + systolic + " - Patient suspected of hypotension  \r\n"
                }
                if (distolic > 80 || systolic > 130) {
                    message = message + "BP - diastolic: " + distolic + ". BP - systolic: " + systolic + " - Patient suspected of hypertension  \r\n"
                }
            
                if (temperature <= 36) {
                    message = message + "Temperature: " + temperature + "- Patient suspected of hypothermia  \r\n"
                }
                if (temperature > 37) {
                    message = message + "Temperature: " + temperature + "- Patient suspected of fever  \r\n"
                }
                if (bloodOxygenLvl <= 80) {
                    message = message + "Oxygen Level: " + bloodOxygenLvl + "- Patient suspected of hypoxemia  \r\n"
                }
                if (bloodOxygenLvl > 37) {
                    message = message + "Oxygen Level: " + bloodOxygenLvl + "- Patient suspected of  \r\n"
                }
                if (heartRate <= 60) {
                    message = message + "Heart rate: " + heartRate + "- Patient suspected of bradycardia  \r\n"
                }
                if (heartRate > 100) {
                    message = message + "Heart rate: " + heartRate + "- Patient suspected of tachycardia \r\n"
                } 
                if (respiratoryRate <= 12) {
                    message = message + "Heart rate: " + respiratoryRate + "- Patient suspected of bradypnea  \r\n"
                }
                if (respiratoryRate > 18) {
                    message = message + "Heart rate: " + respiratoryRate + "- Patient suspected of tachypnea \r\n"
                }
                if(message !== ""){
                    message = message + "Check the patient!"
                    let subject = "Patient " + this.state.currentUserID
                    let toSend = res;
                    const details = {
                        vitalSignsID: this.state.vitalSignsID,
                        status: this.state.healthState,
                        symptoms: this.state.description,
                    }
                    console.log("DET. ", details)
                    addHealthStatusAndEmail(details, toSend, message,subject).then((res) => {
                        console.log("RESP ", res)
                        if (res === 204) {
                            this.props.history.push(`/calendar`)
                        }
                    })
                }
                else{
                    const details = {
                        vitalSignsID: this.state.vitalSignsID,
                        status: this.state.healthState,
                        symptoms: this.state.description,
                    }
                    console.log("DET. ", details)
                    addHealthStatus(details).then((res) => {
                        console.log("RESP ", res)
                        if (res === 204) {
                            this.props.history.push(`/calendar`)
                        }
                    })
                }

            }
            else {
                const details = {
                    vitalSignsID: this.state.vitalSignsID,
                    status: this.state.healthState,
                    symptoms: this.state.description,
                }
                console.log("DET. ", details)
                addHealthStatus(details).then((res) => {
                    console.log("RESP ", res)
                    if (res === 204) {
                        this.props.history.push(`/calendar`)
                    }
                })
            }
        })
        console.log("SDSDS arr", arr)


    }

    handleClick() {
        this.setState({
            submitted: true,
            systolic: 1000
        })
        console.log("Nice ", this.state)
        const details = {

            temperatureC: this.state.temperature,
            bloodOxygenLevel: this.state.bloodOxygenLvl,
            heartRate: this.state.heartRate,
            respiratoryRate: this.state.respiratoryRate,
            patientName: this.state.patientName,
            systolic: this.state.systolic,
            diastolic: this.state.distolic,


            date: this.state.today,
            userID: this.state.currentUserID,

        }
        addVitalSigns(details).then((res) => {
            console.log("RES ", res)
            if (res.status === 201) {
                this.setState({
                    vitalSignsID: res.data.vitalSignsID,
                    submitted: true,
                })
            }
        })

        console.log("Nice2 ", this.state)
    }

    onSubmit = (e) => {


        // login(user).then(res => {
        //     if (res.status === 200) {
        //         console.log("RES", res)
        //         const decoded = jwt_decode(res.data)
        //         if (decoded.lvlAccess === 1 || decoded.lvlAccess === 2) {
        //             this.props.history.push(`/patients`)
        //         }
        //         else {
        //             this.props.history.push(`/`)
        //         }

        //     } else if (res.status === 401) {
        //         alert("Wrong username or password");
        //     } else {
        //         alert("An error ocurred");
        //     }
        // })
        e.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
            <header className="backgroundLogin">


                <RemoveScrollBar />
                {this.state.submitted && this.state.entryToday === false ?
                    <Card className={classes.root}>
                        <CardContent >
                            <div className={classes.paper}>
                                <Typography variant="h5" component="h2">
                                    Health
                                        </Typography>
                            </div>
                            <div style={{ alignContent: "left", textAlign: 'left' }}>
                                <Typography variant="subtitle2" component="h2" className={classes.instructions}>
                                    How are you feeling?
                                        </Typography>
                            </div>

                            <form className={classes.form} onSubmit={this.onSubmit} >
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="health" name="health" value={this.state.healthState} onChange={this.handleChange} row>
                                        <FormControlLabel value="Very good" control={<Radio />} label="Very good" />
                                        <FormControlLabel value="Good" control={<Radio />} label="Good" />
                                        <FormControlLabel value="Ok" control={<Radio />} label="Ok" />
                                        <FormControlLabel value="Bad" control={<Radio />} label="Bad" />
                                        <FormControlLabel value="Very bad" control={<Radio />} label="Very bad" />
                                    </RadioGroup>
                                </FormControl>
                                <div style={{ height: 10 }} />
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="description"
                                    label="Status"
                                    value={this.state.description}
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    rowsMax={90}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.changeField.bind(this)}
                                />
                                <Grid
                                    justify="center" // Add it here :)
                                    container
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Button
                                            // fullWidth
                                            type="submit"
                                            variant="contained"
                                            onClick={this.sendSymptoms}
                                            color="secondary"
                                            className={classes.submit}
                                        >
                                            Send Vital Signs Records
                                </Button>
                                    </Grid>
                                </Grid>

                            </form>
                        </CardContent>
                    </Card>
                    :
                    this.state.submitted === false && this.state.entryToday === false ?

                        <Card className={classes.root}>
                            <CardContent >
                                <div className={classes.paper}>
                                    <Typography variant="h5" component="h2">
                                        Vital Signs
                        </Typography>
                                </div>
                                <div style={{ alignContent: "left", textAlign: 'left' }}>
                                    <Typography variant="subtitle2" component="h2" className={classes.instructions}>
                                        Please register your vital signs
                        </Typography>
                                </div>
                                <div style={{ height: 10 }} />
                                <form className={classes.form} onSubmit={this.onSubmit} >
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <ValidationTextField
                                                InputProps={{
                                                    className: classes.multilineColor
                                                }}
                                                fullWidth
                                                id="temperature"
                                                label="Temperature"
                                                value={this.state.temperature}
                                                variant="outlined"
                                                type="number"
                                                onChange={this.changeField.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <div style={{ height: 10 }} />
                                            <ValidationTextField
                                                InputProps={{
                                                    className: classes.multilineColor
                                                }}
                                                fullWidth
                                                id="heartRate"
                                                label="Heart Rate"
                                                value={this.state.heartRate}
                                                variant="outlined"
                                                type="number"
                                                onChange={this.changeField.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ValidationTextField
                                                InputProps={{
                                                    className: classes.multilineColor
                                                }}
                                                fullWidth
                                                id="bloodOxygenLvl"
                                                label="Oxygen Level"
                                                value={this.state.bloodOxygenLvl}
                                                variant="outlined"
                                                type="number"
                                                onChange={this.changeField.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <div style={{ height: 10 }} />
                                            <ValidationTextField
                                                InputProps={{
                                                    className: classes.multilineColor
                                                }}
                                                fullWidth
                                                id="respiratoryRate"
                                                label="Respiratory Rate"
                                                type="number"
                                                value={this.state.respiratoryRate}
                                                variant="outlined"
                                                onChange={this.changeField.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />
                                        </Grid>
                                    </Grid>
                                    <div style={{ height: 15 }} />
                                    <div style={{ alignContent: "left", textAlign: 'left' }}>
                                        <Typography variant="subtitle2" component="h2" className={classes.instructions}>
                                            Blood Pressure
                                </Typography>
                                    </div>
                                    <div style={{ height: 10 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <ValidationTextField
                                                InputProps={{
                                                    className: classes.multilineColor
                                                }}
                                                fullWidth
                                                id="distolic"
                                                label="Diastolic"
                                                value={this.state.distolic}
                                                variant="outlined"
                                                type="number"
                                                onChange={this.changeField.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <div style={{ height: 10 }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ValidationTextField
                                                InputProps={{
                                                    className: classes.multilineColor
                                                }}
                                                fullWidth
                                                id="systolic"
                                                label="Systolic"
                                                value={this.state.systolic}
                                                variant="outlined"
                                                type="number"
                                                onChange={this.changeField.bind(this)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />


                                        </Grid>
                                    </Grid>
                                    <Grid
                                        justify="center" // Add it here :)
                                        container
                                        spacing={1}
                                    >
                                        <Grid item>
                                            <Button
                                                // fullWidth
                                                type="submit"
                                                variant="contained"
                                                onClick={this.handleClick}
                                                color="secondary"
                                                className={classes.submit}
                                            >
                                                Send Vital Signs Records
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </form>
                            </CardContent>
                        </Card>
                        :
                        null
                }
            </header>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));