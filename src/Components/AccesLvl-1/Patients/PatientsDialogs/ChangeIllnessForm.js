import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { DataGrid } from '@material-ui/data-grid';
import jwt_decode from 'jwt-decode';
import { getDoctorsDetails, getPatientDoctorList, modifyIllness } from '../../../utils/UserFunctions'



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
        patient_id: "",
        illnessField: "",
        illnessArray: []
    }
    constructor(props) {
        super(props);
        console.log("FORM")
        this.state.patient_id = this.props.patientDetails
        this.state.illnessArray = this.props.illness
       // console.log("  this.props.illness  ", this.props.illness)
        // this.addIllnessToArray = this.addIllnessToArray.bind(this)
        // this.deleteEntry = this.deleteEntry.bind(this)
    }

    addIllnessToArray() {
        let initialArray = this.state.illnessArray;
        console.log(initialArray, " initialArray")
        initialArray.push(this.state.illnessField);
        this.setState({
            illnessArray: initialArray,
            illnessField: ""
        })
    }

    changeField = (event) => {
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    
    }

    deleteEntry(value){
        let initialArray = this.state.illnessArray;

        let finalArray = initialArray.filter((obj)=>{
            if(obj !== value){
                return obj;
            }
        
        })
        this.setState({
            illnessArray: finalArray,
        })
        console.log("VAL ", finalArray)
    }



    closeDialog = () => {
        const details ={
            patientDetailsID: this.state.patient_id,
            illness : this.state.illnessArray
        }
        modifyIllness(details).then((res)=>{
            if(res.status === 204){
                console.log("ILLNESSSS ", res)
                let obj = JSON.parse(res.config.data);
                this.props.onClose(obj.illness);
            }
            else{
                alert("ERROR!")
            }
        })
  
        // let today = new Date();
        // const note = {
        //     content : this.state.note,
        //     createdBy: this.state.currentUser,
        //     createdOn: today,
        // }
        // const details = {
        //     note: note,
        //     treatmentID: this.state.currentTreatmentID
        // }
        // addNote(details).then((res) => {
        //     if(res == 204){
        //         this.props.onClose()
        //     }
        //     else{
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


                        <Grid item xs={10}>
                            {/* <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                fullWidth
                                required
                                id="email"
                                label="Illness"
                                value={this.state.illnessField}
                                defaultValue={this.state.illnessField}
                                variant="outlined"
                                onChange={this.changeField.bind(this)}
                            /> */}
                            <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                fullWidth
                                id="illnessField"
                                label="Illness"
                                value={this.state.illnessField}
                                variant="outlined"

                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.changeField.bind(this)}
                            />

                        </Grid>
                        <Grid item xs={2}>
                            <Button color="primary" style={{marginTop:10}}variant="contained" onClick={() => this.addIllnessToArray()}>Add</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <List style={{maxHeight:'600px'}}>
                                    {this.state.illnessArray.map((value) => ( 
                                        <div>
                                        <ListItem>
                                            <ListItemText
                                                primary={value}
                                            />
                                            <ListItemSecondaryAction>

                                                <IconButton aria-label="delete" size="small" edge="end" onClick={() => this.deleteEntry(value)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                          
                                        </ListItem>
                                            <Divider light />
                                        </div>
                                    ))}
                            
                            </List>
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