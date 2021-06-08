import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TableContainer from '@material-ui/core/TableContainer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import DialogIllness from './PatientDetailsDialogs/ChangeIllness'
import GhqTotal from './Graf/GhqTotal';
import './Patients.css'
import Collapse from '@material-ui/core/Collapse';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DialogSpecialist from './PatientsDialogs/Specialists'
import DialogAddress from './PatientsDialogs/RegisterUser'
import DialogNote from './PatientDetailsDialogs/AddNoteDialog'
import { getPatientsForUser, removeDoctorForPatient, getPatientsWithSameIllness, addNotes, getGHQbyPatient, getPatientByUserID, getVSForUser, getUserProfile, getCurrentTreatmentForUser, getUserDetails, getUserName, getDrugByID } from '../../utils/UserFunctions'
import jwt_decode from 'jwt-decode'
import withStyles from '@material-ui/core/styles/withStyles';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import RegisterTreatmentDialog from './PatientDetailsDialogs/NewTreatment'
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Ghq from './Graf/Ghq';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import VitalSignsGrid from './Graf/AllVitalSigns'
import questions from '../../Questionaire/questions.json';
import SimilarPatients from './Similars/SimilarPatients'
import Temperature from './Graf/DinamicVitalSigns'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import VitalSignsComparation from './Graf/VitalSignsComparation';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const vertical = 'top';
const horizontal = 'right';

const columns = [
  { id: 'newImage', label: 'Img', minWidth: 100 },
  { id: 'firstName', label: 'First Name', minWidth: 100 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  { id: 'birthday', label: 'Birthday', minWidth: 100 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'phone', label: 'Telephone', minWidth: 100 },
  { id: 'severity', label: 'Disease', minWidth: 100 },
  { id: 'gravity', label: 'Gravity', minWidth: 100 },
];

function createData(illness, notes, treatmentHistory, userID, newImage, firstName, lastName, birthday, gender, phone, severity, gravity, address, _id) {
  return {
    illness, notes, treatmentHistory, userID, newImage, firstName, lastName, birthday, gender, phone, severity, gravity, address: [
      { country: address.country, city: address.city, postalCode: address.postalCode, street: address.street, details: address.adrLine }
    ],
    _id
  };
}

const styles = theme => ({
  container: {
    maxWidth: "100%",
    padding: "5px",
  },
  root4: {
    flexGrow: 1,
    position: 'absolute',
    overflowY: false
  },
  root6: {
    minWidth: 480,
    maxWidth: 480,
    maxHeight: 500
  },
  root5: {
    width: 400,
    height: 300,
  },
  paper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `2px 3px 3px`,
    overflowX: 'auto',
  },
  rootList: {
    width: '100%',
    maxWidth: '60ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  rootDetails: {
    '& > *': {
      borderBottom: 'unset',
    },
    borderRadius: '20px',
    margin: '5px',
    boxShadow: "3",
    padding: '5px',
    maxWidth: 300,
    minWidth: 300,
    minHeight: 630,
    maxHeight: 630,
  },
  paperDetails: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `2px 3px 3px`,
    overflowX: 'auto',
  },
  rootDetailsList: {
    '& > *': {
      borderBottom: 'unset',
    },
    borderRadius: '20px',
    margin: '5px',
    boxShadow: "3",
    padding: '5px',
    maxWidth: 1150,
    minWidth: 1150,
    minHeight: 630,
    maxHeight: 630,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    borderRadius: '20px',
    margin: '5px',
    boxShadow: "3",
    padding: '5px',
    maxWidth: 1400,
    minHeight: 630,
    maxHeight: 630,
  },
  avatar: {
    backgroundColor: "#0277bd",
  },
});


class Row extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      open2: false,
      specialistDialog: false,

    };
    this.setOpen2 = this.setOpen2.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  openForm(dialogName) {
    this.setState({ specialistDialog: true });
  }

  async callbackFromDialog(dialogName) {
    this.setState({ [dialogName]: false });
    this.forceUpdate()
  }

  unassignMe(id) {
    this.props.callbackUnassign(id);
  }

  setOpen2 = (event) => {
    let newOp = !this.state.open2;
    this.setState({
      open2: newOp
    })
  };

  setOpen = (event) => {
    let newOp = !this.state.open;
    this.setState({
      open: newOp
    })
  };

  render() {
    return (
      <React.Fragment>
        <TableRow key={this.props.row._id}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!this.state.open)}>
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <center>
              <img src={this.props.row.newImage} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "80px" }} />
            </center>
          </TableCell>
          <TableCell align="left">{this.props.row.firstName}</TableCell>
          <TableCell align="left">{this.props.row.lastName}</TableCell>
          <TableCell align="left">{this.props.row.birthday}</TableCell>
          <TableCell align="left">{this.props.row.gender}</TableCell>
          <TableCell align="left">{this.props.row.phone}</TableCell>
          <TableCell align="left">{this.props.row.severity}</TableCell>
          <TableCell align="left">
            {this.props.row.gravity === 1 ?
              < Brightness1Icon style={{ color: 'red' }} />
              : this.props.row.gravity === 2 ?
                < Brightness1Icon style={{ color: 'orange' }} /> :
                this.props.row.gravity === 3 ?
                  < Brightness1Icon style={{ color: 'green' }} /> :
                  null
            }
          </TableCell>
          <TableCell>
            <Button color="primary" onClick={() => this.unassignMe(this.props.row._id)}>
              Unassign
            </Button>
          </TableCell>
          <TableCell>
            <Button color="primary" onClick={() => this.openForm("specialistDialog")} >
              Request Specialist
            </Button>
          </TableCell>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => this.props.setLoading(this.props.row)}>
              {this.state.open2 ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        {this.state.specialistDialog && <DialogSpecialist open={this.state.specialistDialog} currentPatient={this.props.row} callback={(open) => this.callbackFromDialog(open)} />}
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Address Details
                </Typography>
                {this.props.row.address.map((addressDetails) => (
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2" gutterBottom >
                        Country:   {addressDetails.country}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" gutterBottom component="div">
                        City:  {addressDetails.city}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" gutterBottom component="div">
                        Postal Code:  {addressDetails.postalCode}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" gutterBottom component="div">
                        Street:  {addressDetails.street}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" gutterBottom component="div">
                        Details:  {addressDetails.details}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
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

class PatientsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      pageGHQ: 0,
      rowsPerPageGHQ: 5,
      pageGHQHistory: 0,
      rowsPerPageGHQHistory: 5,
      pageVS: 0,
      rowsPerPageVS: 5,
      pageMeds: 0,
      rowsPerPageMeds: 5,
      currentDrugs: [],
      addNoteDialog: false,
      loading: true,
      rows: [],
      subValue: 0,
      valueGHQ: 0,
      currentUser: "",
      clickedPatient: [],
      addNewPatientDialog: false,
      componentLoaded: false,
      value: 0,
      valueHealth: 0,
      createdByUser: "",
      vitalSigns: [],
      docDetails: {},
      openPatientDetails: true,
      treatmentHistory: [],
      lvlAccess: 0,
      medicalStaffArr: [],
      loadingDetails: true,
      addIllnessDialog: false,
      questions: [],
      patientNote: "",
      registerTreatment: false,
      currentQuestionnaire: {},
      questionnaireHistory: [],
      dataLoaded: false,
      similarPatients: [],
      openNotification: false,
      messageNotification: "",
      typeNotification: "",


    };
    this.state.questions = questions;
    this.handleChangePageMeds = this.handleChangePageMeds.bind(this);
    this.handleChangeRowsPerPageMeds = this.handleChangeRowsPerPageMeds.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePageGHQ = this.handleChangePageGHQ.bind(this);
    this.handleChangeRowsPerPageGHQ = this.handleChangeRowsPerPageGHQ.bind(this);
    this.handleChangePageGHQHistory = this.handleChangePageGHQHistory.bind(this);
    this.handleChangeRowsPerPageGHQHistory = this.handleChangeRowsPerPageGHQHistory.bind(this);
    this.handleChangePageVS = this.handleChangePageVS.bind(this);
    this.handleChangeRowsPerPageVS = this.handleChangeRowsPerPageVS.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  openRegisterTreatment() {
    this.setState({
      registerTreatment: true
    })
 
  }


  handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      openNotification: false
    })

  };

  async callbackFromDialogNote(dialogName, note) {
    this.setState({ [dialogName]: false });
    var someProperty = { ...this.state.clickedPatient }
    someProperty.notes.unshift(note);
    this.setState({
      currentTreatment: someProperty
    })
  }

  callbackFromDialogIlness(dialogName, illness) {
    this.setState({ [dialogName]: false });
    let illnessString = ""
    illness.forEach(function (objIllness) {
      illnessString = illnessString + objIllness + "; "
    })
    var someProperty = { ...this.state.clickedPatient }
    someProperty.severity = illnessString
    this.setState({
      clickedPatient: someProperty
    })
    this.forceUpdate()
  }


  addPatientNote() {
    let that = this;
    let today = new Date();

    const note = {
      content: this.state.patientNote,
      createdBy: this.state.currentUser,
      createdOn: today,
    }

    const details = {
      note: note,
      patientDetailsID: this.state.clickedPatient._id
    }

    addNotes(details).then((res) => {
      let patient = this.state.clickedPatient;
      if (res.status === 204) {
        let obj = JSON.parse(res.config.data);
        let createOnDate = new Date(obj.note.createdOn);
        var dd = String(createOnDate.getDate()).padStart(2, '0');
        var mm = String(createOnDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = createOnDate.getFullYear();
        var hh = String(createOnDate.getHours());
        var min = String(createOnDate.getMinutes());
        obj.note.dateTimeFormatted = dd + '.' + mm + '.' + yyyy + " " + hh + ":" + min + " - ";
        getUserName(obj.note.createdBy).then((name) => {
          obj.note.createdByName = name;
          patient.notes.unshift(obj.note)
          that.setState({
            clickedPatient: patient
          })
        })
      }
      else {
        alert("FAIL!")
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

  openPatientDetails(indicator) {
    this.setState({
      openPatientDetails: indicator
    })
  }

  openFormNote() {
    this.setState({ addNoteDialog: true });
  }

  openFormIllness() {
    this.setState({ addIllnessDialog: true });
  }

  handleChange = (event, newValue) => {
    if (newValue === 2) {
      let severity = this.state.clickedPatient.illness;
      let id = this.state.clickedPatient.userID;
      let similarPatients = [];
      severity.forEach(function (severity) {
        getPatientsWithSameIllness(severity, id).then((patients) => {
          patients.forEach(function (patient) {
            similarPatients.push(patient);
          })
        })
      })
      this.setState({
        similarPatients: similarPatients,
      })
    }

    if (newValue === 4) {
      getGHQbyPatient(this.state.clickedPatient.userID).then((res) => {
        res.data.forEach(function (questionnaire) {
          let dateCurrent = new Date(questionnaire.creationDate);
          var dd = String(dateCurrent.getDate()).padStart(2, '0');
          var mm = String(dateCurrent.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = dateCurrent.getFullYear();
          let creationDate = dd + '/' + mm + '/' + yyyy;
          questionnaire.currentDate = creationDate;
        })
        let questions = this.state.questions;
        questions.forEach(function (obj) {
          obj.answer = res.data[0].answers[obj.id];
        })
        let dateCurrent = new Date(res.data[0].creationDate);
        var dd = String(dateCurrent.getDate()).padStart(2, '0');
        var mm = String(dateCurrent.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dateCurrent.getFullYear();
        let creationDate = dd + '/' + mm + '/' + yyyy;
        let currentQuest = {
          qAndA: questions,
          scores: res.data[0].scores,
          createdBy: res.data[0].patientID,
          creationDate: creationDate
        }
        this.setState({
          currentQuestionnaire: currentQuest,
          dataLoaded: true,
          questionnaireHistory: res.data
        })
      })

    }

    this.setState({
      value: newValue
    });
  };

  handleChangeHealth = (event, newValue) => {
    this.setState({
      valueHealth: newValue
    });
  };

  handleChangeGHQ = (event, newValue) => {
    this.setState({
      valueGHQ: newValue
    });
  };

  handleChangeSubValue = (event, newValue) => {
    this.setState({
      subValue: newValue
    });
  };

  unassign(patID) {
    const details = {
      patientDetailsID: patID,
      user: this.state.currentUser,
      lvlAccess: this.state.lvlAccess
    }

    removeDoctorForPatient(details).then(res => {
      if (res.status === 204) {

        this.setState({
          messageNotification: "You were successfully unassigned!",
          typeNotification: 'success',
          openNotification: true
        })

        getPatientsForUser(this.state.currentUser, this.state.lvlAccess).then(patients => {
          let patientsData = []
          for (let i = 0; i < patients.length; i++) {
            let diseaseArray = patients[i].illness;
            let disease = "";
            for (let j = 0; j < diseaseArray.length; j++) {
              if (j === 0 && j !== diseaseArray.length - 1) {
                disease = diseaseArray[j] + "; ";
              }
              else if (j !== diseaseArray.length - 1) {
                disease = disease + diseaseArray[j] + "; ";
              } else {
                disease = disease + diseaseArray[j];
              }
            }

            let dateOfBirth = new Date(patients[i].dateOfBirth);
            var dd = String(dateOfBirth.getDate()).padStart(2, '0');
            var mm = String(dateOfBirth.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = dateOfBirth.getFullYear();
            let birthday = dd + '/' + mm + '/' + yyyy;

            let image = patients[i].image;
         
            patientsData.push(createData(patients[i].illness, patients[i].notes, [i].userID, image, patients[i].firstName, patients[i].lastName, birthday, patients[i].gender, patients[i].phone, disease, patients[i].gravityCode, patients[i].address, patients[i]._id))
          }

          this.setState({
            rows: patientsData
          })
        })
      }
      else if (res === 400) {
        alert("Not found");
      }
      else {
        alert("An error ocurred");
      }
    })
  }

  getStripedStyle(index) {
    return { background: index % 2 ? '#fafafa' : '#F5F5F5' };
  }

  openForm(dialogName) {
    this.setState({ [dialogName]: true });
  }



  async callbackFromDialog(dialogName) {
    this.setState({ [dialogName]: false });
    this.forceUpdate()
  }

  async getTreatment(){
    getPatientByUserID(this.state.clickedPatient.userID).then((user)=>{

 
      let diseaseArray = user.illness;
        let disease = "";
        for (let j = 0; j < diseaseArray.length; j++) {
          if (j === 0 && j !== diseaseArray.length - 1) {
            disease = diseaseArray[j] + "; ";
          }
          else if (j !== diseaseArray.length - 1) {
            disease = disease + diseaseArray[j] + "; ";
          } else {
            disease = disease + diseaseArray[j];
          }
        }
    
      user.disease = disease;
      let dateOfBirth = new Date(user.dateOfBirth);

        var dd = String(dateOfBirth.getDate()).padStart(2, '0');
        var mm = String(dateOfBirth.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dateOfBirth.getFullYear();
        user.birthday = dd + '/' + mm + '/' + yyyy;

        // user.image = patients[i].image;

        //a.push(createData(patients[i].illness, patients[i].notes, patients[i].treatmentHistory, patients[i].userID, image, patients[i].firstName, patients[i].lastName, birthday, patients[i].gender, patients[i].phone, disease, patients[i].gravityCode, patients[i].address, patients[i]._id))
        this.setLoading(user);
    })
    
  }

  setLoading = (patient) => {
    let vitalSigns = []

    getVSForUser(patient.userID).then((res) => {
      res.data.forEach(function (obj) {
        let resDate = new Date(obj.date);
        var dd = String(resDate.getDate()).padStart(2, '0');
        var mm = String(resDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = resDate.getFullYear();
        let creationDate = dd + '/' + mm + '/' + yyyy;
        obj.creationDate = creationDate
        vitalSigns.push(obj)
      })
      this.setState({
        vitalSigns: vitalSigns
      })
    })

    patient.notes.forEach(function (obj) {
      let creationDate = new Date(obj.createdOn);
      var dd = String(creationDate.getDate()).padStart(2, '0');
      var mm = String(creationDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = creationDate.getFullYear();
      var hh = String(creationDate.getHours());
      var min = String(creationDate.getMinutes());
      obj.dateTimeFormatted = dd + '.' + mm + '.' + yyyy + " " + hh + ":" + min + " - ";

      getUserName(obj.createdBy).then((res) => {
        obj.createdByName = res;
      })
    })

    patient.notes.reverse();

    getPatientByUserID(patient.userID).then((res) => {
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

          let doctorBirthday = new Date(doctor.dateOfBirth);
          var dd = String(doctorBirthday.getDate()).padStart(2, '0');
          var mm = String(doctorBirthday.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = doctorBirthday.getFullYear();
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
          let nurseBirthday = new Date(nurse.dateOfBirth);

          var dd = String(nurseBirthday.getDate()).padStart(2, '0');
          var mm = String(nurseBirthday.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = nurseBirthday.getFullYear();
          nurse.birthday = dd + '/' + mm + '/' + yyyy;

          staff.push(nurse)

          this.setState({
            medicalStaffArr: staff,

          })

          if (i === nursesLen - 1) {
            this.setState({
              loadingDetails: false,

            })
          }
        })
      }
      this.setState({
        loading: !this.state.loading,
        clickedPatient: patient
      })
    })

    let that = this;

    patient.treatmentHistory.forEach(function (obj) {
      getCurrentTreatmentForUser(obj).then((res) => {
        let treatmentHistory = [];
        if (res.data.current === true) {
          res.data.notes.forEach(function (obj) {

            let creationDate = new Date(obj.createdOn);
            var dd = String(creationDate.getDate()).padStart(2, '0');
            var mm = String(creationDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = creationDate.getFullYear();
            var hh = String(creationDate.getHours());
            var min = String(creationDate.getMinutes());

            obj.dateTimeFormatted = dd + '.' + mm + '.' + yyyy + " " + hh + ":" + min + " - ";

            getUserName(obj.createdBy).then((res) => {
              obj.createdByName = res;

            })
          })

          res.data.notes.reverse();

          getUserDetails(res.data.doctorID).then((res2) => {
            getUserName(res.data.createdBy).then((res3) => {
              res.data.doctorDetails = res2;
              that.setState({
                docDetails: res2,
                createdByUser: res3,
              })
            })
          })

          res.data.drugs.forEach(function (obj) {
            getDrugByID(obj.medID).then((res) => {
              if (res.status === 200) {
                obj.name = res.data.Name;
                obj.Administration = res.data.Administration;
                obj.DCI = res.data.DCI;
                obj.Concentration = res.data.Concentration;
              }
            })
          })

          that.setState({
            currentTreatment: res.data,
            currentDrugs: res.data.drugs,
          })
        }
        else {
          if (res.status === 200) {
            if (res.data.doctorID && res.data.createdBy) {
              getUserDetails(res.data.doctorID).then((res2) => {
                getUserName(res.data.createdBy).then((res3) => {
                  res.data.doctorDetails = res2;
                  res.data.createdByName = res3;

                  res.data.drugs.forEach(function (obj) {
                    getDrugByID(obj.medID).then((res4) => {
                      if (res.status === 200) {
                        obj.name = res4.data.Name;
                        obj.administration = res4.data.Administration;
                      }
                    })
                  })

                  treatmentHistory.push(res.data)
         
                  that.setState({
                    treatmentHistory: treatmentHistory
                  })
                })
              })
            }
            else if (res.data.doctorID) {
              getUserDetails(res.data.doctorID).then((res2) => {
                res.data.doctorDetails = res2;
                treatmentHistory.push(res.data)
                that.setState({
                  treatmentHistory: treatmentHistory
                })
              })
            }
            else if (res.data.createdBy) {
              getUserName(res.data.createdBy).then((res3) => {
                res.data.createdByName = res3;
                treatmentHistory.push(res.data)
                that.setState({
                  treatmentHistory: treatmentHistory
                })
              })
            }
          }
        }
      })
    })
  };

  handleChangePageGHQ = (event, newPage) => {
    this.setState({
      pageGHQ: newPage
    })
  };

  handleChangeRowsPerPageGHQ = (event) => {
    this.setState({
      rowsPerPageGHQ: +event.target.value,
      page: 0
    })
  };

  handleChangePageGHQHistory = (event, newPage) => {
    this.setState({
      pageGHQHistory: newPage
    })
  };

  handleChangeRowsPerPageGHQHistory = (event) => {
    this.setState({
      rowsPerPageGHQ: +event.target.value,
      page: 0
    })
  };
  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    })
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0
    })
  };

  handleChangePageVS = (event, newPage) => {
    this.setState({
      pageVS: newPage
    })
  };

  handleChangeRowsPerPageVS = (event) => {
    this.setState({
      rowsPerPageVS: +event.target.value,
      pageVS: 0
    })
  };

  handleChangePageMeds = (event, newPage) => {
    this.setState({
      pageMeds: newPage
    })
  };

  handleChangeRowsPerPageMeds = (event) => {
    this.setState({
      rowsPerPageMeds: +event.target.value,
      pageMeds: 0
    })
  };

  async componentWillMount() {
    const token = localStorage.usertoken
    if (token) {
      try {
        const decoded = jwt_decode(token)
        let id = decoded._id;
        let accessLvl = decoded.lvlAccess;
        const patients = await getPatientsForUser(id, accessLvl);
        let a = []
        for (let i = 0; i < patients.length; i++) {
          let diseaseArray = patients[i].illness;
          let disease = "";
          for (let j = 0; j < diseaseArray.length; j++) {
            if (j === 0 && j !== diseaseArray.length - 1) {
              disease = diseaseArray[j] + "; ";
            }
            else if (j !== diseaseArray.length - 1) {
              disease = disease + diseaseArray[j] + "; ";
            } else {
              disease = disease + diseaseArray[j];
            }
          }

          let dateOfBirth = new Date(patients[i].dateOfBirth);

          var dd = String(dateOfBirth.getDate()).padStart(2, '0');
          var mm = String(dateOfBirth.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = dateOfBirth.getFullYear();
          let birthday = dd + '/' + mm + '/' + yyyy;

          let image = patients[i].image;
  
          a.push(createData(patients[i].illness, patients[i].notes, patients[i].treatmentHistory, patients[i].userID, image, patients[i].firstName, patients[i].lastName, birthday, patients[i].gender, patients[i].phone, disease, patients[i].gravityCode, patients[i].address, patients[i]._id))
        }
        this.setState({
          rows: a
        })
        this.setState({
          currentUser: decoded._id,
          lvlAccess: decoded.lvlAccess
        })
      } catch (err) {
        alert(err);
      }
    }
    else {
      alert("USER NOT LOGGED IN")
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {localStorage.usertoken ?
          <header className="App-Login" >
            <div style={{ height: '75px' }} />
            <RemoveScrollBar />
            {this.state.loading ?
              <Card className={classes.root}>
                <CardContent className={classes.paper}>
                  <TableContainer className={classes.container} style={{ maxHeight: '500px' }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                          <TableCell >
                            Actions
                            </TableCell>
                          <TableCell />

                          <TableCell />
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => (
                          <Row key={row.name} row={row} setLoading={this.setLoading} callbackUnassign={(patientID) => this.unassign(patientID)} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 50]}
                    component="div"
                    count={this.state.rows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                  <Button color="primary" variant="contained" onClick={() => this.openForm("addNewPatientDialog")}>
                    Add new patient
                  </Button>
                  {this.state.addNewPatientDialog && <DialogAddress open={this.state.addNewPatientDialog} callback={(open) => this.callbackFromDialog(open)} />}
                </CardContent>
              </Card>
              :
              this.state.loadingDetails ? null :
                <div>
                  <Grid container spacing={1}>
                    <Grid item xs>
                      <Card className={classes.rootDetails} >
                        <div id="container1">
                          <div id="container3">
                            <CardContent className={classes.paperDetails}>
                              <div style={{ maxHeight: '610px' }}>
                                <Grid container direction="row" spacing={1} direction="row" style={{ maxHeight: '573px', marginLeft: '15px' }}>
                                  <Grid item xs={12}>
                                    <Breadcrumbs aria-label="breadcrumb">
                                      <Link color="inherit" href="/patients" >
                                        Patients
                                    </Link>
                                      <Typography color="textPrimary">Details</Typography>
                                    </Breadcrumbs>
                                  </Grid>
                                  <Grid item xs={12} />
                                  <Grid item xs={12}>
                                    <center>
                                      <img src={this.state.clickedPatient.newImage} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: '120px' }} />
                                    </center>
                                  </Grid>

                                  <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom color="textSecondary">
                                      General Data
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      First Name:  {this.state.clickedPatient.firstName}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Last Name:  {this.state.clickedPatient.lastName}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Birthday:  {this.state.clickedPatient.birthday}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Gender:  {this.state.clickedPatient.gender}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom color="textSecondary">
                                      Severity - <Button color="primary" size="small" onClick={() => this.openFormIllness()} style={{ marginBottom: '2px' }}>Change</Button>
                                    </Typography>
                                    {this.state.addIllnessDialog && <DialogIllness open={this.state.addIllnessDialog} patient_id={this.state.clickedPatient._id} illness={this.state.clickedPatient.illness} callback={(open, illn) => this.callbackFromDialogIlness(open, illn)} />}
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Severity: {this.state.clickedPatient.severity}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom color="textSecondary">
                                      Address
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Country:  {this.state.clickedPatient.address[0].country}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      City:  {this.state.clickedPatient.address[0].city}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Postal code:  {this.state.clickedPatient.address[0].postalCode}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Street:  {this.state.clickedPatient.address[0].street}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Details:  {this.state.clickedPatient.address[0].details}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom color="textSecondary">
                                      Communication
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      Phone:  {this.state.clickedPatient.phone}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                                      email:  {this.state.clickedPatient.phone}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    </Grid>
                    <Grid item xs>
                      <Card className={classes.rootDetailsList} >
                        <div id="container1">
                          <div id="container2">
                            <CardContent className={classes.paper}>
                              <Grid container direction="row" spacing={2}>
                                <Grid item xs={12} style={{ backgroundColor: '#FFF' }}>
                                  <div style={{
                                    display: "flex",
                                    backgroundColor: '#FFF',
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}>
                                    <center>
                                      <Tabs
                                        value={this.state.value}
                                        indicatorColor="primary"

                                        textColor="primary"
                                        onChange={this.handleChange}
                                        aria-label="disabled tabs example"
                                      >
                                        <Tab label="Medical Staff" />
                                        <Tab label="Treatment History" />
                                        <Tab label="Current treatment" />
                                        <Tab label="Health" />
                                        <Tab label="GHQ" />
                                        <Tab label="Notes" />
                                      </Tabs>
                                    </center>
                                  </div>
                                </Grid>
                                <Grid item xs={12} >
                                  {this.state.value === 0 ?
                                    <div >
                                      <Grid container spacing={2} style={{ maxHeight: '525px' }} >
                                        <Grid item xs={12} >
                                          <Grid container justify="center" spacing={2} style={{ marginTop: 10, marginBottom: 10 }}>
                                            {this.state.medicalStaffArr.map((value) => (
                                              <Grid key={value._id} item>
                                                <Card className={classes.root5}>
                                                  <CardHeader
                                                    avatar={
                                                      <Avatar aria-label="recipe" className={classes.avatar}>
                                                        {value.lvlAccess === 1 ? 'D' : 'N'}
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
                                                      <Grid item xs={6}>
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
                                                      <Grid item xs={6}>
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
                                                      <Grid item xs={12}>
                                                        <Grid container spacing={1}>
                                                          <Grid item xs={2}>
                                                            <center>
                                                              <ContactPhoneIcon color="secondary" style={{ width: '30px', marginTop: 2, height: '30px', display: 'inline-block' }} />
                                                            </center>
                                                          </Grid>
                                                          <Grid item xs={10}>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                              Mobile: {value.phone},  Phone: {value.fix},  Fax: {value.fax}
                                                            </Typography>
                                                          </Grid>
                                                        </Grid>
                                                      </Grid>
                                                    </Grid>
                                                  </CardContent>
                                                </Card>
                                              </Grid>
                                            ))}
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </div>
                                    :
                                    null
                                  }
                                  {this.state.value === 1 ?
                                    <div style={{}}>
                                      <Grid container spacing={4} style={{ padding: '50px', maxHeight: '525px' }}>
                                        {this.state.treatmentHistory.map((value) => (
                                          <Grid key={value._id} item xs>
                                            <Card className={classes.root6} style={{ borderStyle: 'solid', borderColor: '#01579b', borderWidth: '2px', borderRadius: '5px' }} >
                                              <CardContent>
                                                <Grid container spacing={3}>
                                                  <Grid item xs={12} sm={6}>
                                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>Treatment Details</Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Name: {value.name}</Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Description: {value.description}</Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Created On: {value.createdOn}</Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Created By: {value.createdByName}</Typography>
                                                  </Grid>
                                                  <Grid item xs={12} sm={6}>
                                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>Doctor Details</Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Name: {value.doctorDetails.firstName} {value.doctorDetails.lastName}</Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                                      Address: {value.doctorDetails.address.country}, {value.doctorDetails.address.city}, {value.doctorDetails.address.postalCode}, {value.doctorDetails.address.street}, {value.doctorDetails.address.adrLine}
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Mobile: {value.doctorDetails.phone}</Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>Phone: {value.doctorDetails.fix}</Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>fax: {value.doctorDetails.fax}</Typography>
                                                  </Grid>
                                                </Grid>
                                                <List  >
                                                  <ListItem style={{ backgroundColor: "#01579b" }}>
                                                    <Grid container spacing={3} direction="row">
                                                      <Grid item xs={4}>
                                                        <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Name</Typography>
                                                      </Grid>
                                                      <Grid item xs={4}>
                                                        <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Administration</Typography>
                                                      </Grid>
                                                      <Grid item xs={4}>
                                                        <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Frequency</Typography>
                                                      </Grid>
                                                    </Grid>
                                                  </ListItem>
                                                  {value.drugs.map((drug, index) => (
                                                    <ListItem key={drug.medID} style={{ ...this.getStripedStyle(index) }}>
                                                      <Grid container spacing={3} direction="row">
                                                        <Grid item xs={4}>
                                                          <Typography variant="subtitle2" gutterBottom>{drug.name}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                          <Typography variant="subtitle2" gutterBottom>{drug.administration}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                          <Typography variant="subtitle2" gutterBottom>{drug.frequency}</Typography>
                                                        </Grid>
                                                      </Grid>
                                                    </ListItem>
                                                  ))}
                                                </List>
                                              </CardContent>
                                            </Card>
                                          </Grid>
                                        ))}
                                      </Grid>
                                    </div>
                                    :
                                    null
                                  }
                                  {this.state.value === 2 ?
                                    <div >
                                      <div style={{
                                        display: "flex",
                                        backgroundColor: '#FFF',
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}>
                                        <center>
                                          <Tabs
                                            value={this.state.subValue}
                                            indicatorColor="secondary"
                                            textColor="secondary"
                                            onChange={this.handleChangeSubValue}
                                            aria-label="disabled tabs example"
                                          >
                                            <Tab label="Details" />
                                            <Tab label="Similar treatments" />
                                            <Tab label="Statistics" />
                                          </Tabs>
                                        </center>
                                      </div>
                                      {this.state.addNoteDialog ? <DialogNote treatmentID={this.state.currentTreatment._id} open={this.state.addNoteDialog} currentUser={this.state.currentUser} callback={(open, note) => this.callbackFromDialogNote(open, note)} /> : null}
                                      {this.state.subValue === 0 ?
                                        <Grid container spacing={2} style={{ marginLeft: '15px', marginTop: '15px', maxHeight: '470px' }}>
                                          <Grid item xs={12}>
                                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>This is the current treatment, if you want to change it
                                              <Button size="small" style={{ marginBottom: '5px' }} color="primary" onClick={() => this.openRegisterTreatment()}>
                                                click here!
                                              </Button>
                                              {this.state.registerTreatment ? <RegisterTreatmentDialog treatmentID={this.state.currentTreatment._id} getTreatment={() => this.getTreatment()} patientDetailsID={this.state.clickedPatient._id} open={this.state.registerTreatment} callback={(open) => this.callbackFromDialog(open)} /> : null}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={4} >
                                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>Treatment Details</Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Name: {this.state.currentTreatment.name}</Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Description: {this.state.currentTreatment.description}</Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Created On: {this.state.currentTreatment.createdOn}</Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Created By: {this.state.createdByUser}</Typography>
                                            <br />
                                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>Doctor Details</Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Name: {this.state.docDetails.firstName} {this.state.docDetails.lastName}</Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                              Address: {this.state.docDetails.address.country}, {this.state.docDetails.address.city}, {this.state.docDetails.address.postalCode}, {this.state.docDetails.address.street}, {this.state.docDetails.address.adrLine}
                                            </Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Mobile: {this.state.docDetails.phone}</Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Phone: {this.state.docDetails.fix}</Typography>
                                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Fax: {this.state.docDetails.fax}</Typography>
                                          </Grid>
                                          <Grid item xs={8}>
                                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>Medication Details</Typography>
                                            <TableContainer component={Paper} style={{ maxHeight: '400px', maxWidth: '700px', marginTop: '10px' }}>
                                              <Table aria-label="collapsible table">
                                                <TableHead>
                                                  <TableRow style={{ backgroundColor: '#01579b', color: '#000' }}>
                                                    <TableCell style={{ color: '#FFF' }}>Name</TableCell>
                                                    <TableCell align="right" style={{ color: '#FFF' }}>DCI</TableCell>
                                                    <TableCell align="right" style={{ color: '#FFF' }}>Administration</TableCell>
                                                    <TableCell align="right" style={{ color: '#FFF' }}>Concentration</TableCell>
                                                    <TableCell align="right" style={{ color: '#FFF' }}>Frequency</TableCell>
                                                    <TableCell align="right" style={{ color: '#FFF' }}>Notes</TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  {this.state.currentDrugs.slice(this.state.pageMeds * this.state.rowsPerPageMeds, this.state.pageMeds * this.state.rowsPerPageMeds + this.state.rowsPerPageMeds).map((row) => (
                                                    <TableRow key={row.medID}>
                                                      <TableCell align="left">{row.name}</TableCell>
                                                      <TableCell align="left">{row.DCI}</TableCell>
                                                      <TableCell align="left">{row.Administration}</TableCell>
                                                      <TableCell align="left">{row.Concentration}</TableCell>
                                                      <TableCell align="left">{row.frequency}</TableCell>
                                                      <TableCell align="left">{row.notes}</TableCell>
                                                    </TableRow>
                                                  ))}
                                                </TableBody>
                                              </Table>
                                              <TablePagination
                                                rowsPerPageOptions={[5, 10, 50]}
                                                component="div"
                                                count={this.state.currentDrugs.length}
                                                rowsPerPage={this.state.rowsPerPageMeds}
                                                page={this.state.pageMeds}
                                                onChangePage={this.handleChangePageMeds}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPageMeds}
                                              />
                                            </TableContainer>
                                          </Grid>
                                          <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                              Notes -
                                              <Button size="small" style={{ marginBottom: '5px' }} color="primary" onClick={() => this.openFormNote()}>
                                                Add new
                                              </Button>
                                            </Typography>
                                            <List className={classes.rootList}>
                                              {this.state.currentTreatment.notes.map((note) => (
                                                <div>
                                                  <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                      primary={note.createdByName}
                                                      secondary={
                                                        <React.Fragment>
                                                          <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                          >
                                                            {note.dateTimeFormatted}
                                                          </Typography>
                                                          {note.content}
                                                        </React.Fragment>
                                                      }
                                                    />
                                                  </ListItem>
                                                  <Divider variant="inset" component="li" />
                                                </div>
                                              ))}
                                            </List>
                                          </Grid>
                                        </Grid>
                                        : null}
                                      {this.state.subValue === 1 ?
                                        <SimilarPatients patientsArray={this.state.similarPatients} />
                                        :
                                      null
                                      }
                                      {this.state.subValue === 2 ?
                                        <VitalSignsComparation patientsArray={this.state.similarPatients} currentPatient={this.state.clickedPatient.userID} />
                                        :
                                        null}
                                    </div>
                                    :
                                    null
                                  }
                                  {this.state.value === 3 ?
                                    <div >
                                      <Grid container spacing={2} style={{ maxHeight: '525px' }} >
                                        <Grid item xs={12} style={{ backgroundColor: '#FFF' }}>
                                          <div style={{
                                            display: "flex",
                                            backgroundColor: '#FFF',
                                            justifyContent: "center",
                                            alignItems: "center",

                                          }}>
                                            <center>
                                              <Tabs
                                                value={this.state.valueHealth}
                                                indicatorColor="secondary"

                                                textColor="secondary"
                                                onChange={this.handleChangeHealth}
                                                aria-label="disabled tabs example"
                                              >
                                                <Tab label="Vital Signs" />
                                                <Tab label="Monitor signs" />
                                              </Tabs>
                                            </center>
                                            {/* </div> */}
                                          </div>
                                        </Grid>
                                        {this.state.valueHealth === 0 ?
                                          <Grid item xs={12} style={{ padding: 20 }}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={12}>
                                                <TableContainer component={Paper} style={{ maxHeight: '500px', marginTop: '10px' }}>
                                                  <Table aria-label="collapsible table">
                                                    <TableHead>
                                                      <TableRow style={{ backgroundColor: '#01579b', color: '#000' }}>
                                                        <TableCell style={{ color: '#FFF' }}>Date</TableCell>
                                                        <TableCell align="right" style={{ color: '#FFF' }}>Temperature(°C)</TableCell>
                                                        <TableCell align="right" style={{ color: '#FFF' }}>Oxygen level</TableCell>
                                                        <TableCell align="right" style={{ color: '#FFF' }}>Heart rate</TableCell>
                                                        <TableCell align="right" style={{ color: '#FFF' }}>Respiratory Rate</TableCell>
                                                        <TableCell align="right" style={{ color: '#FFF' }}>BP - systolic</TableCell>
                                                        <TableCell align="right" style={{ color: '#FFF' }}>BP - diastolic</TableCell>
                                                        <TableCell align="right" style={{ color: '#FFF' }}>Patient status</TableCell>
                                                        <TableCell align="right" style={{ color: '#FFF' }}>Symptoms</TableCell>
                                                      </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                      {this.state.vitalSigns.slice(this.state.pageVS * this.state.rowsPerPageVS, this.state.pageVS * this.state.rowsPerPageVS + this.state.rowsPerPageVS).map((row) => (
                                                        <TableRow key={row.medID}>
                                                          <TableCell align="left">{row.creationDate}</TableCell>
                                                          <TableCell style={{ color: row.temperatureC <= 36 ? "#FFA500" : row.temperatureC > 37 ? "#FF0000" : "#000" }} align="right">{row.temperatureC}</TableCell>
                                                          <TableCell style={{ color: row.bloodOxygenLevel <= 80 ? "#FFA500" : row.bloodOxygenLevel > 100 ? "#FF0000" : "#000" }} align="right">{row.bloodOxygenLevel}</TableCell>
                                                          <TableCell style={{ color: row.heartRate <= 60 ? "#FFA500" : row.heartRate > 100 ? "#FF0000" : "#000" }} align="right">{row.heartRate}</TableCell>
                                                          <TableCell style={{ color: row.respiratoryRate <= 12 ? "#FFA500" : row.respiratoryRate > 18 ? "#FF0000" : "#000" }} align="right">{row.respiratoryRate}</TableCell>
                                                          <TableCell style={{ color: row.bloodPressure.systolic <= 110 ? "#FFA500" : row.bloodPressure.systolic > 130 ? "#FF0000" : "#000" }} align="right">{row.bloodPressure.systolic}</TableCell>
                                                          <TableCell style={{ color: row.bloodPressure.diastolic <= 70 ? "#FFA500" : row.bloodPressure.diastolic > 80 ? "#FF0000" : "#000" }} align="right">{row.bloodPressure.diastolic}</TableCell>
                                                          <TableCell align="right">{row.health.status}</TableCell>
                                                          <TableCell align="right">{row.health.symptoms}</TableCell>
                                                        </TableRow>
                                                      ))}
                                                    </TableBody>
                                                  </Table>
                                                  <TablePagination
                                                    rowsPerPageOptions={[5, 10, 50]}
                                                    component="div"
                                                    count={this.state.vitalSigns.length}
                                                    rowsPerPage={this.state.rowsPerPageVS}
                                                    page={this.state.pageVS}
                                                    onChangePage={this.handleChangePageVS}
                                                    onChangeRowsPerPage={this.handleChangeRowsPerPageVS}
                                                  />
                                                </TableContainer>
                                              </Grid>
                                              <Grid item xs={12}>
                                                <VitalSignsGrid vitalSigns={this.state.vitalSigns} />
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          :
                                          null
                                        }
                                        {this.state.valueHealth === 1 ?
                                          <Grid item xs={12} style={{ padding: 20 }}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={12}>
                                                <Temperature vitalSigns={this.state.vitalSigns} typeGraf="bp" />
                                              </Grid>
                                              <Grid item xs={12}>
                                                <Temperature vitalSigns={this.state.vitalSigns} typeGraf="temperature" />
                                              </Grid>
                                              <Grid item xs={12}>
                                                <Temperature vitalSigns={this.state.vitalSigns} typeGraf="bloodOxygenLevel" />
                                              </Grid>
                                              <Grid item xs={12}>
                                                <Temperature vitalSigns={this.state.vitalSigns} typeGraf="respiratoryRate" />
                                              </Grid>
                                              <Grid item xs={12}>
                                                <Temperature vitalSigns={this.state.vitalSigns} typeGraf="heartRate" />
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          :
                                          null
                                        }
                                      </Grid>
                                    </div>
                                    :
                                    null
                                  }
                                  {this.state.value === 4 ?
                                    <div >
                                      <Grid container spacing={2} style={{ maxHeight: '525px' }} >
                                        <Grid item xs={12} style={{ backgroundColor: '#FFF' }}>
                                          <div style={{
                                            display: "flex",
                                            backgroundColor: '#FFF',
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}>
                                            <center>
                                              <Tabs
                                                value={this.state.valueGHQ}
                                                indicatorColor="secondary"
                                                textColor="secondary"
                                                onChange={this.handleChangeGHQ}
                                                aria-label="disabled tabs example"
                                              >
                                                <Tab label="Current" />
                                                <Tab label="History" />
                                              </Tabs>
                                            </center>
                                          </div>
                                        </Grid>
                                        {this.state.valueGHQ === 0 ?
                                          <Grid item xs={12} style={{ padding: 20 }}>
                                            {this.state.dataLoaded ?
                                              <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                  <TableContainer component={Paper} style={{ maxHeight: '500px', marginTop: '10px' }}>
                                                    <Table aria-label="collapsible table">
                                                      <TableHead>
                                                        <TableRow style={{ backgroundColor: '#01579b', color: '#000' }}>
                                                          <TableCell style={{ color: '#FFF' }}>Question</TableCell>
                                                          <TableCell align="right" style={{ color: '#FFF' }}>Answer</TableCell>
                                                        </TableRow>
                                                      </TableHead>
                                                      <TableBody>
                                                        {this.state.currentQuestionnaire.qAndA.slice(this.state.pageGHQ * this.state.rowsPerPageGHQ, this.state.pageGHQ * this.state.rowsPerPageGHQ + this.state.rowsPerPageGHQ).map((row) => (
                                                          <TableRow key={row.id}>
                                                            <TableCell align="left">{row.text}</TableCell>
                                                            <TableCell align="right">{row.answer === 0 ? 'Better than usual' : row.answer === 1 ? "Same as usual" : row.answer === 2 ? "Worse than usual" : "Much worse than usual"}</TableCell>
                                                          </TableRow>
                                                        ))}
                                                      </TableBody>
                                                    </Table>
                                                    <TablePagination
                                                      rowsPerPageOptions={[5, 10, 50]}
                                                      component="div"
                                                      count={this.state.currentQuestionnaire.qAndA.length}
                                                      rowsPerPage={this.state.rowsPerPageGHQ}
                                                      page={this.state.pageGHQ}
                                                      onChangePage={this.handleChangePageGHQ}
                                                      onChangeRowsPerPage={this.handleChangeRowsPerPageGHQ}
                                                    />
                                                  </TableContainer>
                                                </Grid>
                                                <Grid item xs={6}>
                                                  <TableContainer component={Paper} style={{ maxHeight: '500px', marginTop: '10px' }}>
                                                    <Table aria-label="collapsible table">
                                                      <TableBody>
                                                        <TableRow>
                                                          <TableCell style={{ color: '#000' }}>Somatic symptoms</TableCell>
                                                          <TableCell style={{ color: '#000' }}>{this.state.currentQuestionnaire.scores.f1}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                          <TableCell style={{ color: '#000' }}>Anxiety/insomnia</TableCell>
                                                          <TableCell style={{ color: '#000' }}>{this.state.currentQuestionnaire.scores.f2}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                          <TableCell style={{ color: '#000' }}>Social dysfunction</TableCell>
                                                          <TableCell style={{ color: '#000' }}>{this.state.currentQuestionnaire.scores.f3}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                          <TableCell style={{ color: '#000' }}>Severe depression</TableCell>
                                                          <TableCell style={{ color: '#000' }}>{this.state.currentQuestionnaire.scores.f4}</TableCell>
                                                        </TableRow>
                                                        <TableRow style={{ backgroundColor: '#D3D3D3' }}>
                                                          <TableCell style={{ color: '#000' }}>Total</TableCell>
                                                          <TableCell style={{ color: '#000' }}>{this.state.currentQuestionnaire.scores.total}</TableCell>
                                                        </TableRow>
                                                        <TableRow style={{ backgroundColor: '#D3D3D3' }}>
                                                          <TableCell style={{ color: '#000' }}>
                                                            Recommendation</TableCell>
                                                          <TableCell style={{ color: this.state.currentQuestionnaire.scores.total <= 24 ? "#000" : this.state.currentQuestionnaire.scores.total <= 48 ? "#FFA500" : "#FF0000" }}>{this.state.currentQuestionnaire.scores.total <= 24 ? "No recommendation" : this.state.currentQuestionnaire.scores.total <= 48 ? "We recommend a visit to the patient" : "Patient should be consulted immediately"}</TableCell>
                                                        </TableRow>
                                                      </TableBody>
                                                    </Table>
                                                  </TableContainer>
                                                </Grid>
                                              </Grid>
                                              :
                                              null
                                            }
                                          </Grid>
                                          :
                                          null
                                        }
                                        {this.state.valueGHQ === 1 ?
                                          <Grid item xs={12} style={{ padding: 20 }}>
                                            {this.state.dataLoaded ?
                                              <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                  <TableContainer component={Paper} style={{ maxHeight: '500px', marginTop: '10px' }}>
                                                    <Table aria-label="collapsible table">
                                                      <TableHead>
                                                        <TableRow style={{ backgroundColor: '#01579b', color: '#000' }}>
                                                          <TableCell style={{ color: '#FFF' }}>Date</TableCell>
                                                          <TableCell align="right" style={{ color: '#FFF' }}>Somatic symptoms</TableCell>
                                                          <TableCell align="right" style={{ color: '#FFF' }}>Anxiety/insomnia</TableCell>
                                                          <TableCell align="right" style={{ color: '#FFF' }}>Social dysfunction</TableCell>
                                                          <TableCell align="right" style={{ color: '#FFF' }}>Severe depression</TableCell>
                                                          <TableCell align="right" style={{ color: '#FFF' }}>Total</TableCell>
                                                        </TableRow>
                                                      </TableHead>
                                                      <TableBody>
                                                        {this.state.questionnaireHistory.slice(this.state.pageGHQ * this.state.rowsPerPageGHQ, this.state.pageGHQ * this.state.rowsPerPageGHQ + this.state.rowsPerPageGHQ).map((row) => (
                                                          <TableRow key={row.id}>
                                                            <TableCell align="left">{row.currentDate}</TableCell>
                                                            <TableCell align="right">{row.scores.f1}</TableCell>
                                                            <TableCell align="right">{row.scores.f2}</TableCell>
                                                            <TableCell align="right">{row.scores.f3}</TableCell>
                                                            <TableCell align="right">{row.scores.f4}</TableCell>
                                                            <TableCell align="right" style={{ backgroundColor: '#D3D3D3' }} >{row.scores.total}</TableCell>
                                                          </TableRow>
                                                        ))}
                                                      </TableBody>
                                                    </Table>
                                                    <TablePagination
                                                      rowsPerPageOptions={[5, 10, 50]}
                                                      component="div"
                                                      count={this.state.currentQuestionnaire.qAndA.length}
                                                      rowsPerPage={this.state.rowsPerPageGHQ}
                                                      page={this.state.pageGHQ}
                                                      onChangePage={this.handleChangePageGHQ}
                                                      onChangeRowsPerPage={this.handleChangeRowsPerPageGHQ}
                                                    />
                                                  </TableContainer>
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <Ghq questionnaireHistory={this.state.questionnaireHistory} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <GhqTotal questionnaireHistory={this.state.questionnaireHistory} />
                                                </Grid>
                                              </Grid>
                                              :
                                              null
                                            }
                                          </Grid>
                                          :
                                          null
                                        }
                                      </Grid>
                                    </div>
                                    :
                                    null
                                  }
                                  {this.state.value === 5 ?
                                    <div >
                                      <Grid container spacing={2} style={{ maxHeight: '525px', padding: '20px' }} >
                                        <Grid item xs={11}>
                                          <ValidationTextField
                                            InputProps={{
                                              className: classes.multilineColor
                                            }}
                                            fullWidth
                                            id="patientNote"
                                            label="Notes"
                                            value={this.state.patientNote}
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            rowsMax={90}
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            onChange={this.changeField.bind(this)}
                                          />
                                        </Grid>
                                        <Grid item xs={1}>
                                          <Button variant="contained" color="primary" style={{ height: '118px' }} onClick={() => this.addPatientNote()}>
                                            Add
                                          </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <List>
                                            {this.state.clickedPatient.notes.map((note) => (
                                              <div>
                                                <ListItem alignItems="flex-start">
                                                  <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                  </ListItemAvatar>
                                                  <ListItemText
                                                    primary={note.createdByName}
                                                    secondary={
                                                      <React.Fragment>
                                                        <Typography
                                                          component="span"
                                                          variant="body2"
                                                          className={classes.inline}
                                                          color="textPrimary"
                                                        >
                                                          {note.dateTimeFormatted}
                                                        </Typography>
                                                        {note.content}
                                                      </React.Fragment>
                                                    }
                                                  />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                              </div>
                                            ))}
                                          </List>
                                        </Grid>
                                      </Grid>
                                    </div>
                                    :
                                    null
                                  }
                                </Grid>
                              </Grid>
                            </CardContent>
                          </div>
                        </div>
                        <Snackbar open={this.state.openNotification} autoHideDuration={3000} onClose={this.handleCloseNotification} anchorOrigin={{ vertical, horizontal }}>
                          <Alert onClose={this.handleCloseNotification} severity={this.state.typeNotification}>
                            {this.state.messageNotification}
                          </Alert>
                        </Snackbar>
                      </Card>
                    </Grid>
                  </Grid>
             
                </div>
            }
          </header>
          :
          this.props.history.push(`/login`)
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PatientsTable);
