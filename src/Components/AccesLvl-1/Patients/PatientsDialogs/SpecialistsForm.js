import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { DataGrid } from '@material-ui/data-grid';
import jwt_decode from 'jwt-decode';
import { getDoctorsDetails, getPatientDoctorList, addPatientDoctors} from '../../../utils/UserFunctions'



const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 1200,
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

const columns = [
    { field: 'id', headerName: 'ID', width: 110, hide: true },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 90 },
    { field: 'birthday', headerName: 'Birthday', width: 120 },
    { field: 'fullAddress', headerName: 'Address', width: 350 },
    { field: 'specialization', headerName: 'Specialization', width: 150 },
    { field: 'experience', headerName: 'Experience', width: 80 },
    { field: 'phone', headerName: 'Mobile', width: 110 },
    { field: 'fax', headerName: 'Fax', width: 110 }
];

class SpecialistsForm extends React.Component {
    state = {
        currentUserID: "",
        patient: "",
        doctors: "",
        selectedRows: [],
        loaded : false,
    }
    constructor(props) {
        super(props);
        this.state.patient = this.props.patient
    }

    selectionChange(e) {
        const selectedIDs = new Set(e.selectionModel);
        let doctors = this.state.doctors;
        let selectedRowData = doctors.filter((row) =>
            selectedIDs.has(row.id)
        );
      
        this.setState({
            selectedRows: selectedRowData
        })
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

        const allDoctors = await getDoctorsDetails();
        const myDoctors = await getPatientDoctorList(this.state.patient._id);

        var filtered = allDoctors;

        for(let i = 0; i < myDoctors.length ; i++){
            filtered = filtered.filter(function (value, index, arr) {
                return value.userID !== myDoctors[i];
            });
        }

        filtered.forEach(function (obj) {
            obj.id = obj.userID;
            obj.name = obj.lastName + " " + obj.firstName;
            if (obj.address){
                obj.fullAddress = obj.address.country + ", " + obj.address.city + ", " + obj.address.postalCode + ", " + obj.address.street + ", " + obj.address.adrLine;
            }
           else{
                obj.fullAddress = ""
           }
            delete obj.userID;
            delete obj.address;
            let test = new Date(obj.dateOfBirth);
            var dd = String(test.getDate()).padStart(2, '0');
            var mm = String(test.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = test.getFullYear();
            obj.birthday = dd + '/' + mm + '/' + yyyy;
            delete obj.image;
            delete obj.lvlAccess;
            delete obj._id;
            delete obj.firstName;
            delete obj.lastName;
            delete obj.fix;
        });
        this.setState({
            doctors:filtered,
            loaded: true
        })
    }

    closeDialog = () =>{
        let errorStatus = false;
        let detailsID = this.state.patient._id;
        let rows = this.state.selectedRows;
        rows.forEach(function (obj) {
            const details = {
                patientDetailsID: detailsID,
                doctors: obj.id
            }
            addPatientDoctors(details).then(res => {
                if (res.status === 204) {                 
                } else if (res === 400) {
                    errorStatus = true;
                    alert("Not found");
                } else {
                    errorStatus = true;
                    alert("An error ocurred");
                }
            })
        });
        if (!errorStatus){
            this.props.onClose("specialistDialog");
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                {this.state.loaded ? (
                    <div className={classes.paper}>
                        <Typography component="h5" variant="h5" style={{ marginBottom: '15px', marginTop: '10px' }}>
                            Request Specialist
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
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={this.state.doctors}
                                columns={columns}
                                pageSize={5}
                                checkboxSelection
                                onSelectionModelChange={(e) => {
                                    this.selectionChange(e)
                                }}
                            >
                            </DataGrid>
                        </div>
                        <siv style={{height:'10px'}}/>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.closeDialog}
                        >
                            Request Changes
                        </Button>
                    </div>
                ):
                null
                }            
            </main>
        );
    }
}

SpecialistsForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SpecialistsForm));