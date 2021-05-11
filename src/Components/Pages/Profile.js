import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import './Login.css';
import Paper from '@material-ui/core/Paper';

import ImageUploader from 'react-images-upload';

import DialogAddress from './ProfileDialogs/ModifyAddress'
import DialogGeneralData from './ProfileDialogs/ModifyGeneralData'
import jwt_decode from 'jwt-decode';
import DialogCommunication from './ProfileDialogs/ModifyCommunication'
import { modifyUserPhoto, getUserDetails, getUserProfilePhoto } from '../utils/UserFunctions'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    // paper: {
    //     marginTop: theme.spacing.unit * 2,
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    // },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "#0B267B",
        marginRight: '50px',
        backgroundColor: 'rgba(255,255,255, 0.8)'

    },
    paper3: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "#0B267B",
        marginRight: '0px',
      backgroundColor: 'rgba(255,255,255, 0.8)'
    },
    paper2: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "#0B267B",
        marginLeft: '50px',
        backgroundColor: 'rgba(255,255,255, 0.8)'
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
        minWidth: 85,
        minHeight: 85,
    },

    icon: {
        width: 70,
        height: 70,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 0.5,
    },

    submit: {
        marginTop: theme.spacing.unit * 3,
    },

    // root: {
    //     borderRadius: '20px',
    //     margin: '10px',
    //     marginLeft:'50px',
    //     boxShadow: "3",
    //     padding: '2px',
    //     maxWidth: 600,
    //     minHeight: 600,
    // },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    title: {
        fontSize: 14,
    },

    pos: {
        marginBottom: 12,
    },
});


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            picture: null,
            file: null,
            currentPictureURL: "",
            currentUser: {},
            currentAddress: {},
            openModifyGeneralData: false,
            modifyAddressDialogOpen: false,
            modifyCommunicationDialogOpen: false,
            modifyGeneralDataDialogOpen: false,
            currentUserID: "",
        }
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }


    changeField = (event) => {
        console.log("WHAT IS CHANGED: " + event.target.id);
        console.log("NEW VALUE: " + event.target.value)
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    }

    async componentWillMount() {
        const token = localStorage.usertoken
   
        if (token) {
            try {
                const decoded = jwt_decode(token)
                const userIdToBeSent = decoded._id;
                const userImage = await getUserProfilePhoto(userIdToBeSent);
                const userDetails = await getUserDetails(userIdToBeSent);
                console.log("CUURENT USER DETAILS:  ", userDetails.address)
                let test = new Date(userDetails.dateOfBirth);

                var dd = String(test.getDate()).padStart(2, '0');
                var mm = String(test.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = test.getFullYear();
                userDetails.dateOfBirth = dd + '/' + mm + '/' + yyyy;
                console.log("IMG HERE: ", userImage)
                this.setState({
                    currentUser: userDetails,
                    currentPictureURL: [userImage],
                    currentAddress: userDetails.address
                });
                console.log("CUURENT USER INFO:  ", this.state.currentAddress)
                this.setState({
                    currentUserID: decoded._id
                })
            } catch (err) {
                alert(err);
            }

        }
       
    }

    onSubmit = (e) => {
        console.log("MAYBEEEE");
        this.props.history.push('/home');

        // const user = {
        //   email: this.state.email,
        //   password: this.state.password
        // }
        // login(user).then(res => {
        //   if (res === 200) {
        //     this.props.history.push(`/`)
        //     this.props.onClose(true);
        //   } else if (res === 401) {
        //     alert("Wrong username or password");
        //   } else {
        //     alert("An error ocurred");
        //   }
        // })
        // e.preventDefault();
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }
    onDrop(pictureFiles, pictureDataURLs) {
        console.log("pictureDataURLs", pictureDataURLs)
        console.log("pictureFiles", pictureFiles)
        this.setState({
            pictures: pictureFiles,
            currentPictureURL: pictureDataURLs,
        });
        modifyUserPhoto(pictureDataURLs, this.state.currentUserID)
    }

    openForm(dialogName) {
        console.log("DIALOG NAME: " + dialogName )
        this.setState({ [dialogName]: true });

    }
    async callbackFromDialog(dialogName) {
        this.setState({ [dialogName]: false });
        const userDetails = await getUserDetails(this.state.currentUserID);
        console.log("CUURENT USER DETAILS:  ", userDetails.address)
        let test = new Date(userDetails.dateOfBirth);

        var dd = String(test.getDate()).padStart(2, '0');
        var mm = String(test.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = test.getFullYear();
        userDetails.dateOfBirth = dd + '/' + mm + '/' + yyyy;

        this.setState({
            currentUser: userDetails,
            currentAddress: userDetails.address
        });
        this.forceUpdate()
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>

                <div style={{ height: '60px' }} />
                <header className="App-Login" >
                    {this.state.openModifyGeneralData ? 
                        <Paper className={classes.paper2}>
                            <center>
                                <img src={this.state.currentPictureURL} style={{ width: "300px", height: "300px", marginTop: '20px', borderRadius: "200px" }} />
                            </center>
                            <ImageUploader
                                withIcon={false}
                                label="Select a photo"
                                buttonText='Upload'
                                onChange={this.onDrop}
                                buttonStyles={{ backgroundColor: '#01579b' }}
                                singleImage={true}
                                fileContainerStyle={{ border: "none", boxShadow: "none" }}
                                imgExtension={['.jpg', '.gif', '.png', '.jpg']}
                                maxFileSize={5242880}
                            />

                        </Paper>
                        :
                        null
                        }
                    <Grid container spacing={1} direction="row">
                        <Grid item xs={12}>
                            <div style={{ height: '10px' }} />
                        </Grid>

                        <Grid item xs={12}>

                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Paper className={classes.paper2}>
                                        <div style={{ height: '37px' }} />
                                        <center>
                                            <img src={this.state.currentPictureURL} style={{ width: "300px", height: "300px", marginTop: '20px', borderRadius: "200px" }} />
                                        </center>
                                        <ImageUploader
                                            withIcon={false}
                                            label="Select a photo"
                                            buttonText='Upload'
                                            onChange={this.onDrop}
                                            buttonStyles={{ backgroundColor: '#01579b' }}
                                            singleImage={true}
                                            fileContainerStyle={{ border: "none", boxShadow: "none", backgroundColor: 'rgba(255,255,255, 0.0)' }}
                                            imgExtension={['.jpg', '.gif', '.png', '.jpg']}
                                            maxFileSize={5242880}
                                        />
                                        <div style={{ height: '37px' }} />
                                    </Paper>

                                </Grid>
                                <Grid item xs>
                                    <Grid container spacing={1} direction="column">

                                        <Grid item xs>
                                            <Grid container spacing={1} direction="row">
                                                <Grid item xs>
                                                    <Paper className={classes.paper3}>
                                                        <Typography variant="h6" gutterBottom >ADDRESS</Typography>
                                                        <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                                            <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >COUNTRY: </Typography>
                                                            <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentAddress.country}</Typography>
                                                            <br />
                                                            <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >CITY:  </Typography>
                                                            <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentAddress.city}</Typography>
                                                            <br />
                                                            <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >POSTAL CODE: </Typography>
                                                            <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentAddress.postalCode}</Typography>
                                                            <br />
                                                            <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >STREET: </Typography>
                                                            <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentAddress.street}</Typography>
                                                            <br />
                                                            <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >DETAILS: </Typography>
                                                            <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentAddress.adrLine}</Typography>
                                                        </div>
                                                    
                                                        <Grid
                                                            justify="flex-end" // Add it here :)
                                                            container
                                                            spacing={1}
                                                        >
                                                            <Grid item>
                                                                <Button variant="contained" color="primary" onClick={() => this.openForm("modifyAddressDialogOpen")}>
                                                                    Modify Address
                                                    </Button>
                                                            </Grid>
                                                        </Grid>
                                                        {this.state.modifyAddressDialogOpen && <DialogAddress open={this.state.modifyAddressDialogOpen} address={this.state.currentAddress} callback={(open) => this.callbackFromDialog(open)} />}
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs >

                                                    <Paper className={classes.paper} style={{height:'311px', width:'inherit'}}>
                                                        <Typography variant="h6" gutterBottom >COMMUNICATION CHANNELS</Typography>
                                                        <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                                            <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >MOBILE: </Typography>
                                                            <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentUser.phone}</Typography>
                                                            <br />
                                                            <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >TELEPHONE: </Typography>
                                                            <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}>  {this.state.currentUser.fix}</Typography>
                                                            <br />
                                                            <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >FAX: </Typography>
                                                            <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentUser.fax}</Typography>


                                                        </div>
                                                        <div style={{ height: '80px' }} />
                                                        <Grid
                                                            justify="flex-end" // Add it here :)
                                                            container
                                                            spacing={24}
                                                        >
                                                            <Grid item>

                                                                <Button variant="contained" color="primary" onClick={() => this.openForm("modifyCommunicationDialogOpen")}>
                                                                    Modify Communication DATA
                                                    </Button>
                                                            </Grid>
                                                        </Grid>
                                                        {this.state.modifyCommunicationDialogOpen && <DialogCommunication open={this.state.modifyCommunicationDialogOpen} currentUser={this.state.currentUser} callback={(open) => this.callbackFromDialog(open)} />}
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <Grid item xs>
                                            <Paper className={classes.paper}>
                                                <Typography variant="h6" gutterBottom >GENERAL DATA</Typography>
                                                <Grid container spacing={3}>
                                                    <Grid item xs style={{ textAlign: 'left', padding: '20px' }}>  
                                                    <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >FIRST NAME: </Typography>
                                                        <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentUser.firstName}</Typography>  
                                                        <br />
                                                        <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >LAST NAME: </Typography>
                                                        <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentUser.lastName}</Typography>
                                                        <br />
                                                                                                <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >DATE OF BIRTH: </Typography>
                                                        <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentUser.dateOfBirth}</Typography>  
                                                    </Grid>
                                                    <Grid item xs style={{ textAlign: 'left', padding: '20px' }}>


                                                        <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >GENDER: </Typography>
                                                        <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentUser.gender}</Typography>
                                                        <br />
                                                          <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >SPECIALIZATION: </Typography>
                                                        <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentUser.specialization}</Typography>
                                                        <br />
                                                        <Typography variant="subtitle1" style={{ display: 'inline-block' }} gutterBottom >EXPERIENCE (YEARS): </Typography>
                                                        <Typography variant="subtitle2" style={{ display: 'inline-block', marginLeft: 5 }} gutterBottom nowrap={true}> {this.state.currentUser.experience}</Typography>
                                                    </Grid>
                                                    <Grid item xs style={{ textAlign: 'left' }}>

                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    justify="flex-end" // Add it here :)
                                                    container
                                                    spacing={1}
                                                >
                                                    <Grid item>
                                                        <Button variant="contained" color="primary" onClick={() => this.openForm("modifyGeneralDataDialogOpen")}>
                                                            Modify General Data
                                                    </Button>
                                                    </Grid>
                                                </Grid>
                                                {this.state.modifyGeneralDataDialogOpen && <DialogGeneralData open={this.state.modifyGeneralDataDialogOpen} currentUser={this.state.currentUser} callback={(open) => this.callbackFromDialog(open)} />}
                                            </Paper>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </header>
            </React.Fragment>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Profile));