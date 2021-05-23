import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import HomeIcon from '@material-ui/icons/Home';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from 'react-router-dom'
import { red } from '@material-ui/core/colors';
import PersonIcon from '@material-ui/icons/Person';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import './Symptoms.css';
import TextField from '@material-ui/core/TextField';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Card from '@material-ui/core/Card';
import { addVitalSigns, getUserProfile, getPatientByUserID } from '../../utils/UserFunctions';
import jwt_decode from 'jwt-decode';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({


    root: {
        flexGrow: 1,
        position: 'absolute',
        overflowY: false
    },
    // paper: {
    //     height: 300,
    //     width: 550,

    // },

    root2: {
        width: 400,
        height: 600,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: "#0277bd",
    },
});





class LoginForm extends React.Component {
    state = {
        loading: true,
        currentUserID: "",
        medicalStaffArr: [],

    }
    constructor(props) {
        super(props);
        let user = ""
        const token = localStorage.usertoken
        if (token) {
            try {
                const decoded = jwt_decode(token)
                user = decoded._id;
                console.log("USER" + user)
                this.state.currentUserID = user;

            } catch (err) {
                alert(err);
            }
        }


    }

    async componentWillMount() {
        console.log("PATIENT2  ");
      
        getPatientByUserID(this.state.currentUserID).then((res) => {
      
            let doctors = res.doctors;
            let nurses = res.nurses
            const doctorLen = doctors.length;
            const nursesLen = nurses.length;
           

            for (let i = 0; i < doctorLen; i++) {
                getUserProfile(doctors[i]).then((doctor) => {
                    let staff = this.state.medicalStaffArr;
                    doctor.name = doctor.firstName + " " + doctor.lastName;
                    delete doctor.firstName;
                    delete doctor.firstName;
                    let test = new Date(doctor.dateOfBirth);

                    var dd = String(test.getDate()).padStart(2, '0');
                    var mm = String(test.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = test.getFullYear();
                    doctor.birthday = dd + '/' + mm + '/' + yyyy;
                    staff.push(doctor)
                    this.setState({
                        medicalStaffArr: staff,
                      
                    })
                })
            }
            for (let i = 0; i < nursesLen; i++) {
                getUserProfile(nurses[i]).then((nurse) => {
                    let staff = this.state.medicalStaffArr;
                    nurse.name = nurse.firstName + " " + nurse.lastName;
                    delete nurse.firstName;
                    delete nurse.firstName;
                    let test = new Date(nurse.dateOfBirth);

                    var dd = String(test.getDate()).padStart(2, '0');
                    var mm = String(test.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = test.getFullYear();
                    nurse.birthday = dd + '/' + mm + '/' + yyyy;
                    staff.push(nurse)
                    this.setState({
                        medicalStaffArr: staff,

                    })
                    console.log("MB " + nursesLen + "  " + i)
                    if (i === nursesLen -1){
                     
                        this.setState({
                            loading: false,

                        })
                    }
                })
            }


           
        })      
 
    }


    render() {
        const { classes } = this.props;
        return (
            <header className="backgroundLogin">
        \
                {this.state.loading ? null :
                    <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={12} style={{ height: '75px' }}></Grid>
                        <Grid item xs={12} >
                            <Grid container justify="center" spacing={2}>
                                {this.state.medicalStaffArr.map((value) => (
                                    <Grid key={value._id} item>
                                        <Card className={classes.root2}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        {value.lvlAccess === 1 ?  'D' : 'N'}
                                 </Avatar>
                                                }

                                                title={value.name} 
                                                subheader={value.lvlAccess === 1 ? 'Doctor' : 'Nurse'}
                                            />
                                            <CardMedia
                                                className={classes.media}
                                                image={value.image}
                                                title="Paella dish"
                                            />
                                            <CardContent>
                                                <Grid container spacing={2} direction="row">
                                                    <Grid item xs={4}>
                                                        <center>
                                                            <PersonIcon color="secondary" style={{width:'50px', height:'50px', marginTop:15}}/>
                                                        </center>
                                                    
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        
                                                      
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Gender: {value.gender}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Birthday: {value.birthday}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Specialization: {value.specialization}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Experience: {value.experience}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <center>
                                                            <HomeIcon color="secondary" style={{ width: '50px', height: '50px', marginTop: 15 }} />
                                                        </center>

                                                    </Grid>
                                                    <Grid item xs={8}>
                                                      
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Country: {value.address.country}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            City: {value.address.city}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Postal code: {value.address.postalCode}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Street: {value.address.street}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Details: {value.address.adrLine}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <center>
                                                            <ContactPhoneIcon color="secondary" style={{ width: '50px', height: '50px', marginTop: 5 }} />
                                                        </center>
                                                    </Grid>
                                                    <Grid item xs={8}>

                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Mobile: {value.phone}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Phone: {value.fix}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Fax: {value.fax}
                                                        </Typography>
                                                       
                                                    </Grid>
                                                </Grid>
                                               
                                                
                                            
                                            </CardContent>


                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                    </Grid>

                }
            </header>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));