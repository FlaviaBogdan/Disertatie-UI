import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { DataGrid } from '@material-ui/data-grid';
import jwt_decode from 'jwt-decode';
import { getDoctorsDetails, getPatientDoctorList, addNote } from '../../../utils/UserFunctions'



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

class SpecialistsForm extends React.Component {
    state = {
        currentTreatmentID: "",
        note: "",
        currentUser: ""

    }
    constructor(props) {
        super(props);
        console.log("FORM")
        this.state.currentTreatmentID = this.props.treatmentID
        this.state.currentUser = this.props.currentUser
    }

    changeField = (event) => {
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
        console.log(this.state.note, " NOTESSS")
    }



    closeDialog = () => {
        let today = new Date();
        const note = {
            content : this.state.note,
            createdBy: this.state.currentUser,
            createdOn: today,
        }
        const details = {
            note: note,
            treatmentID: this.state.currentTreatmentID
        }
        addNote(details).then((res) => {
            if(res == 204){
                this.props.onClose()
            }
            else{
                alert("ERROR!")
            }
        })
      
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />

                <div className={classes.paper}>
                    <NoteAddIcon style={{
                        color: '#01579b',
                        height: '50px',
                        width: '50px',
                    }} />
                    <div style={{ height: '20px' }} />
                    <Grid
                        justify="begin" // Add it here :)
                        container
                        spacing={1}
                    >
                        {/* <Grid item xs={12}>
                            <Typography style={{ textAlign: 'left' }} component="subtitle2" variant="subtitle2">
                                Add a note and click on submit
                            </Typography>
                            <div style={{ height: '5px' }} />
                        </Grid> */}

                
                        <Grid item xs={12}>
                            <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                fullWidth
                                id="note"
                                label="Add a note and click on submit"
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
                        </Grid>
                    </Grid>

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

SpecialistsForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SpecialistsForm));