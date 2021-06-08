import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { addNote , getUserName} from '../../../utils/UserFunctions'



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
        currentTreatmentID: "",
        note: "",
        currentUser: ""

    }
    constructor(props) {
        super(props);
        this.state.currentTreatmentID = this.props.treatmentID
        this.state.currentUser = this.props.currentUser
    }

    changeField = (event) => {
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    }

    closeDialog = () => {
        let today = new Date();
        const note = {
            content: this.state.note,
            createdBy: this.state.currentUser,
            createdOn: today,
        }
        const details = {
            note: note,
            treatmentID: this.state.currentTreatmentID
        }
        addNote(details).then((res) => {
            console.log("RESULT NOTE ", res)
            if (res.status === 204) {
                let obj = JSON.parse(res.config.data);
                let note = obj.note;
                let creationDate = new Date(note.createdOn);
                var dd = String(creationDate.getDate()).padStart(2, '0');
                var mm = String(creationDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = creationDate.getFullYear();
                var hh = String(creationDate.getHours());
                var min = String(creationDate.getMinutes());
                note.dateTimeFormatted = dd + '.' + mm + '.' + yyyy + " " + hh + ":" + min + " - ";

                getUserName(note.createdBy).then((res) => {
                    note.createdByName = res;
                    this.props.onClose(note)
                })
            
            }
            else {
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

AddNoteForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AddNoteForm));