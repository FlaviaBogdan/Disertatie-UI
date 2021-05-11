import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import jwt_decode from 'jwt-decode';
import { addPatientDetails, modifyAddressPD, modifyCM, addNotes, modifyIllness, addTreatmentID, addDrugsToTH, createHT, getNursesNames, getDoctorsNames, modifyMedicalStaff } from '../../../utils/UserFunctions'
import { useTheme } from '@material-ui/core/styles';
import { getDrugs } from '../../../utils/UserFunctions'
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { register } from '../../../utils/UserFunctions'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

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
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
    multilineColor: {
        color: 'black'
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? "subtitle1"
                : "subtitle1",
    };
}

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

const columns = [
    { field: 'id', headerName: 'ID', width: 110 },
    { field: '_id', headerName: '_id', width: 110, hide: true },
    { field: 'Name', headerName: 'Name', width: 250 },
    { field: 'DCI', headerName: 'DCI', width: 250 },
    { field: 'Administration', headerName: 'Administration', width: 250 },
    { field: 'Concentration', headerName: 'Concentration', width: 190 },
    { field: 'Action', headerName: 'Action', width: 400 },
];

const columns2 = [
    { field: 'id', headerName: 'ID', width: 110, hide: true },
    { field: '_id', headerName: '_id', width: 110, hide: true },
    { field: 'Name', headerName: 'Name', width: 250 },
    { field: 'DCI', headerName: 'DCI', width: 250, hide: true },
    { field: 'Administration', headerName: 'Administration', width: 250, hide: true },
    { field: 'Concentration', headerName: 'Concentration', width: 190, hide: true },
    { field: 'Action', headerName: 'Action', width: 400, hide: true },
    { field: 'Frequency', headerName: 'Frequency', width: 400, editable: true },
    { field: 'Notes', headerName: 'Notes', width: 400, editable: true },
];

function Theme() {
    const theme = useTheme();
    return theme
}

class RegisterForm extends React.Component {
    state = {
        //Add user
        email: 'example@yahoo.com',
        initialPassword: 'Initial01',
        initialPasswordCheck: 'Initial01',
        //personal data
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        //address
        city: '',
        country: '',
        street: '',
        postalCode: '',
        adrLine: '',
        //comm channel
        phone: '',
        //illness
        disease: '',
        diseaseArray: [],
        diseaseArrStr: '',
        // medical staff
        nursesNames: [],
        doctorNames: [],
        doctorNamesSel: [],
        doctorNamesSelArr: [],
        arrays: [],
        nursesNamesSel: [],
        nursesNamesSelArr: [],
        // Treatment
        name: '',
        step1: true,
        treatmentID: '',
        step2: false,
        current: false,
        description: '',
        responsible: '',
        drugsData: [],
        addedDrugs: false,
        selectedRows: [],
        medicament: '',
        frequency: '',
        medHistory: [{}],
        note: '',
        selectedMeds: [],
        editRowsModel: {},
        // notes
        patientNotes: "",
        //stuff
        currentUserID: "",
        patientCreatedID: "",
        patientDetailsID: "",
        activeStep: 0,
        theme: '',
        steps: ['Create user', 'Add Personal Data', 'Add Address', 'Add Communication Channels', 'Add illness details', 'Medical personnel', 'Add treatment', 'Add notes']
    }

    constructor(props) {
        super(props);
        this.goToMedicineStep = this.goToMedicineStep.bind(this)
        this.handleNext = this.handleNext.bind(this)
    }

    handleEditRowModelChange(param) {
        let result = this.state.selectedRows.find(({ id }) => id === param.id);
        const data = param.props;
        if (param.field === 'Frequency') {
            result.Frequency = data.value;
        }
        if (param.field === 'Notes') {
            result.Notes = data.value;
        }
    }

    handleChangeCurrent = (event) => {
        this.setState({
            current: event.target.checked
        })
    };

    setDoctorName(newName) {
        let newArr = [];
        for (let i = 0; i < newName.length; i++) {
            newArr.push(newName[i].id)
        }
        this.setState({
            doctorNamesSel: newName,
            doctorNamesSelArr: newArr
        })
    }

    handleChangeDoctor = (event) => {
        this.setDoctorName(event.target.value);
    };

    setNursesName(newName) {
        let newArr = [];
        for (let i = 0; i < newName.length; i++) {
            newArr.push(newName[i].id)
        }
        this.setState({
            nursesNamesSel: newName,
            nursesNamesSelArr: newArr
        })
    }

    handleChangeNurse = (event) => {
        this.setNursesName(event.target.value);
    };

    addDisease = () => {
        const diseaseStr = this.state.disease;
        let diseaseArray = this.state.diseaseArray;
        diseaseArray.push(diseaseStr);
        let concatArr = "";
        for (let i = 0; i < diseaseArray.length; i++) {
            concatArr = concatArr + diseaseArray[i] + "; "
        }
        this.setState({
            diseaseArray: diseaseArray,
            diseaseArrStr: concatArr,
            disease: ''
        })
    }

    setActiveStep(newStep) {
        this.setState({
            activeStep: newStep
        })
    }

    handleBack = () => {
        const nextStep = this.state.activeStep - 1;
        this.setState({
            activeStep: nextStep
        })
    };

    handleReset = () => {
        this.setState({
            activeStep: 0
        })
    };

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
        const data = await getDrugs();
        this.setState({
            drugsData: data
        })
    }

    async goToMedicineStep() {
        let today = new Date();
        const note = {
            "createdOn": today,
            "createdBy": this.state.currentUserID,
            "content": this.state.note,
        }
        const treatmentData = {
            "createdOn": today,
            "createdBy": this.state.currentUserID,
            "name": this.state.name,
            "description": this.state.description,
            "current": this.state.current,
            "doctorId": this.state.doctorId,
            "notes": note
        }
        const result = await createHT(treatmentData);
        if (result.status === 201) {
            if (result.data.details) {
                this.setState({ treatmentID: result.data.details })
            }
        }
        if (this.state.treatmentID) {
            const dataTBS = {
                treatmentID: this.state.treatmentID,
                patientDetailsID: this.state.patientDetailsID,
            }
           const res = await addTreatmentID(dataTBS);
            console.log("RES TR" , res);
        }
        this.setState({
            step1: false,
            step2: true,
        })
    }

    changeField = (event) => {
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    }

    selectionChange(e) {
        const selectedIDs = new Set(e.selectionModel);
        let selectedRowData = this.state.drugsData.filter((row) =>
            selectedIDs.has(row.id)
        );
        for (let i = 0; i < selectedRowData.length; i++) {
            selectedRowData[i].Frequency = "";
            selectedRowData[i].Notes = "";
        }
        this.setState({
            selectedRows: selectedRowData
        })
    }

    addDrugs = () => {
        if (this.state.addedDrugs === true) {
            this.setState({
                addedDrugs: false,
            })
        }
        if (this.state.addedDrugs === false) {
            this.setState({
                addedDrugs: true,
            })
        }
        this.setState({
            step2: false
        })
    }

    handleNext = () => {
        const currentStep = this.state.activeStep;
        if (currentStep === 0) {
            if (this.state.initialPassword !== this.state.initialPasswordCheck) {
                const nextStep = currentStep + 1;
                this.setState({
                    activeStep: nextStep
                })
            }
            else {
                const newUser = {
                    email: this.state.email,
                    password: this.state.initialPassword
                }
                register(newUser).then(res => {
                    if (res.status === 201) {
                        const nextStep = 1;
                        this.setState({
                            patientCreatedID: res.data.patientID,
                            activeStep: nextStep
                        })
                    } else if (res === 400) {
                        alert("Email already in use");
                    } else {
                        alert("An error ocurred");
                    }
                })
            };
        }
        else if (currentStep === 1) {
            const patientDetails = {
                userID: this.state.patientCreatedID,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dateOfBirth: this.state.dateOfBirth,
                gender: this.state.gender
            }
            addPatientDetails(patientDetails).then(res => {
                if (res.status === 201) {
                    const nextStep = currentStep + 1;
                    this.setState({
                        patientDetailsID: res.data.details,
                        activeStep: nextStep
                    })
                } else if (res === 400) {
                    alert("Already in use");
                } else {
                    alert("An error ocurred");
                }
            })
        }
        else if (currentStep === 2) {
            const patientDetails = {
                patientDetailsID: this.state.patientDetailsID,
                country: this.state.country,
                city: this.state.city,
                street: this.state.street,
                postalCode: this.state.postalCode,
                adrLine: this.state.adrLine,
            }
            modifyAddressPD(patientDetails).then(res => {
                if (res === 204) {
                    const nextStep = currentStep + 1;
                    this.setState({
                        activeStep: nextStep
                    })
                } else if (res === 400) {
                    alert("Not found");
                } else {
                    alert("An error ocurred");
                }
            })
        }
        else if (currentStep === 3) {
            const patientDetails = {
                patientDetailsID: this.state.patientDetailsID,
                phone: this.state.phone,

            }
            modifyCM(patientDetails).then(res => {
                if (res === 204) {
                    const nextStep = currentStep + 1;
                    this.setState({
                        activeStep: nextStep
                    })
                } else if (res === 400) {
                    alert("Not found");
                } else {
                    alert("An error ocurred");
                }
            })
        }
        else if (currentStep === 4) {
            const patientDetails = {
                patientDetailsID: this.state.patientDetailsID,
                illness: this.state.diseaseArray,

            }
            modifyIllness(patientDetails).then(res => {
                if (res === 204) {
                    getNursesNames().then(nurses => {
                        this.setState({
                            nursesNames: nurses
                        })
                    })
                    getDoctorsNames().then(doctors => {
                        this.setState({
                            doctorNames: doctors
                        })
                    })
                    const nextStep = currentStep + 1;
                    this.setState({
                        activeStep: nextStep
                    })
                } else if (res === 400) {
                    alert("Not found");
                } else {
                    alert("An error ocurred");
                }
            })
        }
        else if (currentStep === 5) {
            const patientDetails = {
                patientDetailsID: this.state.patientDetailsID,
                nurses: this.state.nursesNamesSelArr,
                doctors: this.state.doctorNamesSelArr

            }
            modifyMedicalStaff(patientDetails).then(res => {
                if (res === 204) {
                    const nextStep = currentStep + 1;
                    this.setState({
                        activeStep: nextStep
                    })
                } else if (res === 400) {
                    alert("Not found");
                } else {
                    alert("An error ocurred");
                }
            })
        }
        else if (currentStep === 6) {
            const notModified = this.state.selectedRows;
            let newArray = [];
            for (let i = 0; i < notModified.length; i++) {
                newArray.push({
                    medID: notModified[i]._id,
                    frequency: notModified[i].Frequency,
                    notes: notModified[i].Notes,
                })
            }
            const data = {
                treatmentID: this.state.treatmentID,
                drugs: newArray
            }
            addDrugsToTH(data).then(res => {
                if (res === 204) {
                    const nextStep = currentStep + 1;
                    this.setState({
                        activeStep: nextStep
                    })
                } else if (res === 400) {
                    alert("Not found");
                } else {
                    alert("An error ocurred");
                }
            })
        }
        else if (currentStep === 7) {
            let today = new Date();
            const note = {
                "createdOn": today,
                "createdBy": this.state.currentUserID,
                "content": this.state.patientNotes,
            }
            const dataToSend = {
                "note": note,
                "patientDetailsID": this.state.patientDetailsID
            }
            addNotes(dataToSend).then(res => {
                if (res === 204) {
                    this.props.onClose()
                } else if (res === 400) {
                    alert("Not found");
                } else {
                    alert("An error ocurred");
                }
            })
        }
    };

    onSubmit = (e) => {
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <div className={classes.paper}>
                    <PersonAddIcon color="primary" style={{
                        height: '50px',
                        width: '50px',
                    }} />
                    <div className={classes.root}>
                        <Stepper activeStep={this.state.activeStep} alternativeLabel>
                            {this.state.steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {this.state.activeStep === this.state.steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>All steps completed</Typography>
                                    <Button onClick={this.handleReset}>Reset</Button>
                                </div>
                            ) :
                                this.state.activeStep === 0 ?
                                    (
                                        <div>
                                            <Typography className={classes.instructions} variant="h6">Create User</Typography>
                                            <div style={{ height: '20px' }} />
                                            <div>
                                                <form className={classes.form} onSubmit={this.onSubmit}>
                                                    <ValidationTextField
                                                        InputProps={{
                                                            className: classes.multilineColor
                                                        }}
                                                        fullWidth
                                                        required
                                                        id="email"
                                                        label="Email"
                                                        value={this.state.email}
                                                        defaultValue={this.state.email}
                                                        variant="outlined"
                                                        onChange={this.changeField.bind(this)}
                                                    />
                                                    <div style={{ height: '20px' }} />
                                                    <ValidationTextField
                                                        InputProps={{
                                                            className: classes.multilineColor
                                                        }}
                                                        fullWidth
                                                        required
                                                        id="initialPassword"
                                                        label="Password"
                                                        value={this.state.initialPassword}
                                                        defaultValue={this.state.initialPassword}
                                                        variant="outlined"
                                                        type='password'
                                                        onChange={this.changeField.bind(this)}
                                                    />
                                                    <div style={{ height: '20px' }} />
                                                    <ValidationTextField
                                                        InputProps={{
                                                            className: classes.multilineColor
                                                        }}
                                                        fullWidth
                                                        required
                                                        id="initialPasswordCheck"
                                                        label="Password"
                                                        value={this.state.initialPasswordCheck}
                                                        type='password'
                                                        defaultValue={this.state.initialPasswordCheck}
                                                        variant="outlined"
                                                        onChange={this.changeField.bind(this)}
                                                    />
                                                    <div style={{ height: '20px' }} />
                                                    <Grid
                                                        justify="flex-end" // Add it here :)
                                                        container
                                                        spacing={1}
                                                    >
                                                        <Grid item>
                                                            <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                                {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            </div>
                                        </div>
                                    )
                                    :
                                    this.state.activeStep === 1 ?
                                        (
                                            <div>
                                                <Typography className={classes.instructions} variant="h6">Personal Data</Typography>
                                                <div style={{ height: '20px' }} />
                                                <div>
                                                    <form className={classes.form} onSubmit={this.onSubmit}>
                                                        <Grid container spacing={6}>
                                                            <Grid item xs={6}>
                                                                <ValidationTextField
                                                                    InputProps={{
                                                                        className: classes.multilineColor
                                                                    }}
                                                                    fullWidth
                                                                    id="firstName"
                                                                    required
                                                                    label="First Name"
                                                                    value={this.state.firstName}
                                                                    variant="outlined"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    onChange={this.changeField.bind(this)}
                                                                />
                                                                <div style={{ height: '20px' }} />
                                                                <ValidationTextField
                                                                    InputProps={{
                                                                        className: classes.multilineColor
                                                                    }}
                                                                    id="dateOfBirth"
                                                                    label="Birthday"
                                                                    type="date"
                                                                    variant="outlined"
                                                                    value={this.state.dateOfBirth}
                                                                    fullWidth
                                                                    onChange={this.changeField.bind(this)}
                                                                    className={classes.textField}
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
                                                                    id="lastName"
                                                                    required
                                                                    label="Last Name"
                                                                    variant="outlined"
                                                                    value={this.state.lastName}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    onChange={this.changeField.bind(this)}
                                                                />
                                                                <div style={{ height: '20px' }} />
                                                                <ValidationTextField
                                                                    InputProps={{
                                                                        className: classes.multilineColor
                                                                    }}
                                                                    id="gender"
                                                                    select
                                                                    label="Gender"
                                                                    fullWidth
                                                                    value={this.state.gender}
                                                                    onChange={this.changeField.bind(this)}
                                                                    SelectProps={{
                                                                        native: true,
                                                                    }}
                                                                    variant="outlined"
                                                                >
                                                                    <option key='notValue' value='notValue'>

                                                                    </option>
                                                                    <option key='female' value='female'>
                                                                        Female
                                                                    </option>
                                                                    <option key='male' value='male'>
                                                                        Male
                                                                    </option>
                                                                </ValidationTextField>
                                                            </Grid>
                                                        </Grid>
                                                        <div style={{ height: '20px' }} />
                                                        <Grid
                                                            justify="flex-end" // Add it here :)
                                                            container
                                                            spacing={1}
                                                        >
                                                            <Grid item>
                                                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                        :
                                        this.state.activeStep === 2 ?
                                            (
                                                <div>
                                                    <Typography className={classes.instructions} variant="h6">Address</Typography>
                                                    <div style={{ height: '20px' }} />
                                                    <div>
                                                        <form className={classes.form} onSubmit={this.onSubmit}>
                                                            <Grid container spacing={6}>
                                                                <Grid item xs={6}>
                                                                    <ValidationTextField
                                                                        InputProps={{
                                                                            className: classes.multilineColor
                                                                        }}
                                                                        fullWidth
                                                                        id="country"
                                                                        label="Country"
                                                                        variant="outlined"
                                                                        value={this.state.country}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
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
                                                                        variant="outlined"
                                                                        value={this.state.postalCode}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        onChange={this.changeField.bind(this)}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <ValidationTextField
                                                                        InputProps={{
                                                                            className: classes.multilineColor
                                                                        }}
                                                                        fullWidth
                                                                        id="city"
                                                                        label="City"
                                                                        value={this.state.city}
                                                                        variant="outlined"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        onChange={this.changeField.bind(this)}
                                                                    />

                                                                    <div style={{ height: '20px' }} />
                                                                    <ValidationTextField
                                                                        InputProps={{
                                                                            className: classes.multilineColor
                                                                        }}
                                                                        fullWidth
                                                                        id="street"
                                                                        label="Street"
                                                                        value={this.state.street}
                                                                        variant="outlined"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
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
                                                                value={this.state.adrLine}
                                                                variant="outlined"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                onChange={this.changeField.bind(this)}
                                                            />
                                                            <div style={{ height: '20px' }} />
                                                            <Grid
                                                                justify="flex-end" // Add it here :)
                                                                container
                                                                spacing={1}
                                                            >
                                                                <Grid item>
                                                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </form>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            this.state.activeStep === 3 ?
                                                (
                                                    <div>
                                                        <Typography className={classes.instructions} variant="h6">Communication Channels</Typography>
                                                        <div style={{ height: '20px' }} />
                                                        <div>
                                                            <form className={classes.form} onSubmit={this.onSubmit}>
                                                                <ValidationTextField
                                                                    InputProps={{
                                                                        className: classes.multilineColor
                                                                    }}
                                                                    fullWidth
                                                                    id="email"
                                                                    label="Email"
                                                                    disabled
                                                                    defaultValue={this.state.email}
                                                                    variant="outlined"
                                                                />
                                                                <div style={{ height: '20px' }} />
                                                                <ValidationTextField
                                                                    InputProps={{
                                                                        className: classes.multilineColor
                                                                    }}
                                                                    fullWidth
                                                                    id="phone"
                                                                    label="Phone"
                                                                    value={this.state.phone}
                                                                    variant="outlined"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    onChange={this.changeField.bind(this)}
                                                                />
                                                                <div style={{ height: '20px' }} />
                                                                <Grid
                                                                    justify="flex-end" // Add it here :)
                                                                    container
                                                                    spacing={1}
                                                                >
                                                                    <Grid item>
                                                                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </form>
                                                        </div>
                                                    </div>
                                                ) :
                                                this.state.activeStep === 4 ?
                                                    (
                                                        <div>
                                                            <Typography className={classes.instructions} variant="h6">Illness details</Typography>
                                                            <Typography className={classes.instructions} variant="subtitle2">*Please enter each disease name separetly!</Typography>
                                                            <div style={{ height: '20px' }} />
                                                            <div>
                                                                <form className={classes.form} onSubmit={this.onSubmit}>
                                                                    <Grid
                                                                        container
                                                                        spacing={1}
                                                                    >
                                                                        <Grid item xs={9}>
                                                                            <ValidationTextField
                                                                                InputProps={{
                                                                                    className: classes.multilineColor
                                                                                }}
                                                                                fullWidth
                                                                                id="disease"
                                                                                label="Disease"
                                                                                InputLabelProps={{
                                                                                    shrink: true,
                                                                                }}
                                                                                value={this.state.disease}
                                                                                variant="outlined"
                                                                                onChange={this.changeField.bind(this)}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <center>
                                                                                <Button variant="outlined" size="medium" color="primary" onClick={this.addDisease} style={{ marginTop: '10px' }}>
                                                                                    Add
                                                                                </Button>
                                                                            </center>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <div style={{ height: '20px' }} />
                                                                    <ValidationTextField
                                                                        InputProps={{
                                                                            className: classes.multilineColor
                                                                        }}
                                                                        fullWidth
                                                                        id="diseaseArrStr"
                                                                        label="Disease List"
                                                                        disabled
                                                                        value={this.state.diseaseArrStr}
                                                                        variant="outlined"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        onChange={this.changeField.bind(this)}
                                                                    />
                                                                    <div style={{ height: '20px' }} />
                                                                    <Grid
                                                                        justify="flex-end" // Add it here :)
                                                                        container
                                                                        spacing={1}
                                                                    >
                                                                        <Grid item>
                                                                            <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                                                {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    ) :
                                                    this.state.activeStep === 5 ?
                                                        (
                                                            <div>
                                                                <Typography className={classes.instructions} variant="h6">Medical staff</Typography>
                                                                <div style={{ height: '20px' }} />
                                                                <div>
                                                                    <form className={classes.form} onSubmit={this.onSubmit}>
                                                                        <Typography className={classes.instructions} variant="subtitle2">Select doctor/doctors</Typography>
                                                                        <Select
                                                                            labelId="demo-mutiple-chip-label"
                                                                            id="demo-mutiple-chip"
                                                                            multiple
                                                                            fullWidth
                                                                            value={this.state.doctorNamesSel}
                                                                            onChange={this.handleChangeDoctor}
                                                                            input={<Input id="select-multiple-chip" />}
                                                                            renderValue={(selected) => (
                                                                                <div className={classes.chips}>
                                                                                    {selected.map((value) => (
                                                                                        <Chip key={value.id} label={value.text} className={classes.chip} />
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                            MenuProps={MenuProps}
                                                                        >
                                                                            {this.state.doctorNames.map((name) => (
                                                                                <MenuItem key={name.id} value={name} style={getStyles(name, this.state.doctorNamesSel, Theme)}>
                                                                                    {name.text}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        <div style={{ height: '20px' }} />
                                                                        <Typography className={classes.instructions} variant="subtitle2">Select nurse/nurses</Typography>
                                                                        <Select
                                                                            labelId="demo-mutiple-chip-label"
                                                                            id="demo-mutiple-chip"
                                                                            multiple
                                                                            fullWidth
                                                                            value={this.state.nursesNamesSel}
                                                                            onChange={this.handleChangeNurse}
                                                                            input={<Input id="select-multiple-chip" />}
                                                                            renderValue={(selected) => (
                                                                                <div className={classes.chips}>
                                                                                    {selected.map((value) => (
                                                                                        <Chip key={value.id} label={value.text} className={classes.chip} />
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                            MenuProps={MenuProps}
                                                                        >
                                                                            {this.state.nursesNames.map((name) => (
                                                                                <MenuItem key={name.id} value={name} style={getStyles(name, this.state.nursesNamesSel, Theme)}>
                                                                                    {name.text}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        <div style={{ height: '20px' }} />
                                                                        <Grid
                                                                            justify="flex-end" // Add it here :)
                                                                            container
                                                                            spacing={1}
                                                                        >
                                                                            <Grid item>
                                                                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        ) :
                                                        this.state.activeStep === 6 ?
                                                            (
                                                                <div style={{ minWidth: 800, margin: 0, padding: 0 }}>
                                                                    <Typography className={classes.instructions} variant="h6">Treatment History</Typography>
                                                                    <div style={{ height: '10px' }} />
                                                                    {
                                                                        this.state.step1 === true ?
                                                                            (
                                                                                <div>
                                                                                    <Grid container spacing={2}>
                                                                                        <Grid item xs={12}>
                                                                                            <div>
                                                                                                <Typography className={classes.instructions} variant="subtitle1">Data</Typography>
                                                                                                <form className={classes.form} onSubmit={this.onSubmit}>
                                                                                                    <Grid container spacing={2}>
                                                                                                        <Grid item xs={6}>
                                                                                                            <ValidationTextField
                                                                                                                InputProps={{
                                                                                                                    className: classes.multilineColor
                                                                                                                }}
                                                                                                                fullWidth
                                                                                                                id="name"
                                                                                                                label="Name"
                                                                                                                value={this.state.name}
                                                                                                                variant="outlined"
                                                                                                                InputLabelProps={{
                                                                                                                    shrink: true,
                                                                                                                }}
                                                                                                                onChange={this.changeField.bind(this)}
                                                                                                            />
                                                                                                        </Grid>
                                                                                                        <Grid item xs={6}>
                                                                                                            <ValidationTextField
                                                                                                                InputProps={{
                                                                                                                    className: classes.multilineColor
                                                                                                                }}
                                                                                                                id="responsible"
                                                                                                                select
                                                                                                                label="Prescribed By"
                                                                                                                fullWidth
                                                                                                                value={this.state.responsible}
                                                                                                                onChange={this.changeField.bind(this)}
                                                                                                                SelectProps={{
                                                                                                                    native: true,
                                                                                                                }}
                                                                                                                variant="outlined"
                                                                                                            >
                                                                                                                {this.state.doctorNames.map((doctor) => (
                                                                                                                    <option key={doctor.id} value={doctor.id}>
                                                                                                                        {doctor.text}
                                                                                                                    </option>
                                                                                                                )
                                                                                                                )}
                                                                                                            </ValidationTextField>
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                    <div style={{ height: '20px' }} />
                                                                                                    <FormControlLabel
                                                                                                        control={<Checkbox checked={this.state.current} onChange={this.handleChangeCurrent} name="checked" />}
                                                                                                        label="Current treatment"
                                                                                                    />
                                                                                                    <div style={{ height: '20px' }} />
                                                                                                    <ValidationTextField
                                                                                                        InputProps={{
                                                                                                            className: classes.multilineColor
                                                                                                        }}
                                                                                                        fullWidth
                                                                                                        id="description"
                                                                                                        label="Description"
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
                                                                                                    <div style={{ height: '20px' }} />
                                                                                                    <div style={{ height: '20px' }} />
                                                                                                    <ValidationTextField
                                                                                                        InputProps={{
                                                                                                            className: classes.multilineColor
                                                                                                        }}
                                                                                                        fullWidth
                                                                                                        id="note"
                                                                                                        label="Notes"
                                                                                                        value={this.state.note}
                                                                                                        variant="outlined"
                                                                                                        multiline
                                                                                                        rows={2}
                                                                                                        rowsMax={90}
                                                                                                        InputLabelProps={{
                                                                                                            shrink: true,
                                                                                                        }}
                                                                                                        onChange={this.changeField.bind(this)}
                                                                                                    />
                                                                                                    <div style={{ height: '20px' }} />
                                                                                                </form>
                                                                                            </div>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid
                                                                                        justify="flex-end" // Add it here :)
                                                                                        container
                                                                                        spacing={1}
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Grid
                                                                                                justify="flex-end" // Add it here :)
                                                                                                container
                                                                                                spacing={1}
                                                                                            >
                                                                                                <Grid item>
                                                                                                    <Button variant="contained" color="primary" onClick={this.goToMedicineStep}>
                                                                                                        Add Medicine
                                                                                                     </Button>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </div>
                                                                            ) :
                                                                            this.state.step2 ?
                                                                                (
                                                                                    <div>
                                                                                        <Typography className={classes.instructions} variant="subtitle1">Medication</Typography>
                                                                                        <div style={{ height: 500, width: '100%' }}>
                                                                                            <DataGrid
                                                                                                rows={this.state.drugsData}
                                                                                                columns={columns}
                                                                                                pageSize={7}
                                                                                                checkboxSelection
                                                                                                filterModel={{
                                                                                                    items: [
                                                                                                        { columnField: 'Name', operatorValue: 'contains', value: 'rice' },
                                                                                                    ],
                                                                                                }}
                                                                                                onSelectionModelChange={(e) => {
                                                                                                    this.selectionChange(e)
                                                                                                }}
                                                                                            >
                                                                                            </DataGrid>
                                                                                            <div style={{ height: '10px' }} />
                                                                                            <Grid
                                                                                                justify="flex-end" // Add it here :)
                                                                                                container
                                                                                                spacing={1}
                                                                                            >
                                                                                                <Grid item>
                                                                                                    <Grid
                                                                                                        justify="flex-end" // Add it here :)
                                                                                                        container
                                                                                                        spacing={1}
                                                                                                    >
                                                                                                        <Grid item>
                                                                                                            <Button variant="contained" color="primary" onClick={this.addDrugs}>
                                                                                                                Confirm drugs
                                                                                                            </Button>
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <div>
                                                                                        {
                                                                                            this.state.addedDrugs ?
                                                                                                (
                                                                                                    <div>
                                                                                                        <Typography className={classes.instructions} variant="subtitle1">Medication settings</Typography>
                                                                                                        <Typography className={classes.instructions} variant="subtitle2">Please add the frequency for meds!</Typography>
                                                                                                        <div style={{ height: 500, width: '100%' }}>
                                                                                                            <DataGrid
                                                                                                                rows={this.state.selectedRows}
                                                                                                                columns={columns2}
                                                                                                                onEditCellChange={(id, field, props) => { this.handleEditRowModelChange(id, field, props) }}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div style={{ height: '10px' }} />
                                                                                                        <Grid
                                                                                                            justify="flex-end" // Add it here :)
                                                                                                            container
                                                                                                            spacing={1}
                                                                                                        >
                                                                                                            <Grid item>
                                                                                                                <Grid
                                                                                                                    justify="flex-end" // Add it here :)
                                                                                                                    container
                                                                                                                    spacing={1}
                                                                                                                >
                                                                                                                    <Grid item>
                                                                                                                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                                                                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                                                                                        </Button>
                                                                                                                    </Grid>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                    </div>
                                                                                                )
                                                                                                : null
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                    }
                                                                </div>
                                                            ) :
                                                            (
                                                                <div>
                                                                    <div>
                                                                        <ValidationTextField
                                                                            InputProps={{
                                                                                className: classes.multilineColor
                                                                            }}
                                                                            fullWidth
                                                                            id="patientNotes"
                                                                            label="Notes"
                                                                            value={this.state.patientNotes}
                                                                            variant="outlined"
                                                                            multiline
                                                                            rows={6}
                                                                            rowsMax={90}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            onChange={this.changeField.bind(this)}
                                                                        />
                                                                        <div style={{ height: '20px' }} />
                                                                        <Grid
                                                                            justify="flex-end" // Add it here :)
                                                                            container
                                                                            spacing={1}
                                                                        >
                                                                            <Grid item>
                                                                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </div>
                                                            )
                            }
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(RegisterForm));