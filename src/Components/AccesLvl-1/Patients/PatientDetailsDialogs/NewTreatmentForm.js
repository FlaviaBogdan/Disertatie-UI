import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import jwt_decode from 'jwt-decode';
import { changeCurrent, addTreatmentID, addDrugsToTH, createHT, getDoctorsNames, } from '../../../utils/UserFunctions'
import { getDrugs } from '../../../utils/UserFunctions'
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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


class NewTreatmentForm extends React.Component {
    state = {
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
        doctorId: "",
        //stuff
        currentUserID: "",
        patientCreatedID: "",
        treatmentID_prev: "",
        patientDetailsID: "",
        activeStep: 0,
        theme: '',
        steps: ['Add treatment details', 'Add medicine', 'Add medicine details']
    }

    constructor(props) {
        super(props);
        this.goToMedicineStep = this.goToMedicineStep.bind(this)
        this.state.patientDetailsID = this.props.patientDetailsID;
        this.state.treatmentID_prev = this.props.treatmentID;
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
        getDoctorsNames().then(doctors => {
            this.setState({
                doctorNames: doctors
            })
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
            "current": true,
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
            await addTreatmentID(dataTBS);
        }
        this.setState({
            activeStep: 1,
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
            activeStep: 2
        })
    }

    handleNext = () => {
        const currentStep = this.state.activeStep;
        if (currentStep === 2) {
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
                    changeCurrent(this.state.treatmentID_prev).then((res) => {
                        if (res === 204) {
                            this.props.getTreatment()
                            this.props.onClose()
                        }
                    })

                } else if (res === 400) {
                    alert("Not found");
                } else {
                    alert("An error ocurred");
                }
            })
        }
    };

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
                                this.state.activeStep === 1 ?
                                    <div>
                                        <Typography className={classes.instructions} variant="subtitle1">Medication</Typography>
                                        <div style={{ height: 500, maxWidth: '800px' , minWidth: '800px'}}>
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
                                    :
                                    this.state.activeStep === 2 ?
                                        <div>
                                            <Typography className={classes.instructions} variant="subtitle1">Medication settings</Typography>
                                            <Typography className={classes.instructions} variant="subtitle2">Please add the frequency for meds!</Typography>
                                            <div style={{ height: 500, maxWidth: '800px' ,  minWidth:'800px'}}>
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
                                        </div> :
                                        this.state.activeStep === 0 ?
                                            <div style={{ minWidth: 800, margin: 0, padding: 0 }}>
                                                <Typography className={classes.instructions} variant="h6">Treatment History</Typography>
                                                <div style={{ height: '10px' }} />
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
                                                                                id="doctorId"
                                                                                select
                                                                                label="Prescribed By"
                                                                                fullWidth
                                                                                value={this.state.doctorId}
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
                                                <div>
                                                </div>
                                            </div>
                                            :
                                            null
                            }
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

NewTreatmentForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NewTreatmentForm));