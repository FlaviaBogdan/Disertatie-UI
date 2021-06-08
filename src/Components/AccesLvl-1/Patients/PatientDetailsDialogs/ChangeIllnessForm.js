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
import withStyles from '@material-ui/core/styles/withStyles';
import { modifyIllness, getDiseaseList} from '../../../utils/UserFunctions'

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

class IllnessForm extends React.Component {
    state = {
        patient_id: "",
        illnessField: "",
        illnessArray: [],
        disease2: '',
        diseaseList: []
    }
    constructor(props) {
        super(props);
        this.state.patient_id = this.props.patientDetails
        this.state.illnessArray = this.props.illness

    }

    componentWillMount(){
        getDiseaseList().then((res)=>{
            if(res.status === 200){
                this.setState({
                    diseaseList: res.data
                })
            }
        })
    }
    addIllnessToArray() {
        let initialArray = this.state.illnessArray;
        initialArray.push(this.state.illnessField);
        this.setState({
            illnessArray: initialArray,
            illnessField: ""
        })
    }
    addIllnessToArray2() {
        let initialArray = this.state.illnessArray;
        initialArray.push(this.state.disease2);
        this.setState({
            illnessArray: initialArray,
            disease2: ""
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
    }

    closeDialog = () => {
        const details ={
            patientDetailsID: this.state.patient_id,
            illness : this.state.illnessArray
        }
        modifyIllness(details).then((res)=>{
            if(res.status === 204){
                let obj = JSON.parse(res.config.data);
                this.props.onClose(obj.illness);
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
                        <Grid item xs={10}>

                            <ValidationTextField
                                InputProps={{
                                    className: classes.multilineColor
                                }}
                                id="disease2"
                                select
                                label="Disease from system"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.disease2}
                                onChange={this.changeField.bind(this)}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                {this.state.diseaseList.map((disease) => (
                                    <option key={disease._id} value={disease.name}>
                                        {disease.name}
                                    </option>
                                )
                                )}
                            </ValidationTextField>

                        </Grid>
                        <Grid item xs={2}>
                  
                            <Button color="primary" style={{ marginTop: 10 }} variant="contained" onClick={() => this.addIllnessToArray2()}>
                                    Add
                                                                                </Button>
                   
                        </Grid>
                        <Grid item xs={10}>
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

IllnessForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(IllnessForm));