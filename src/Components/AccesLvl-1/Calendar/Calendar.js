import * as React from 'react';
import './Calendar.css';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { getPatientsNames, getNursesNames, getDoctorsNames,addVisits, deleteVisit, getUserDetails, getPatientAddressByID, modifyVisit, getVisitsForUser } from '../../utils/UserFunctions';
import withStyles from '@material-ui/core/styles/withStyles';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import jwt_decode from 'jwt-decode';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  Resources,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';


const styles = theme => ({
  paper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `2px 3px 3px`,
  },

  root: {
    borderRadius: '20px',
    margin: '5px',
    boxShadow: "3",
    padding: '5px',
    maxWidth: 1300,
    maxHeight: 600,
  },
});

const messages = {
  moreInformationLabel: '',
};


const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

const TextEditor = (props) => {
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange1 = (nextValue) => {
    if (nextValue === true) {
      onFieldChange({ patientVisit: nextValue });
      onFieldChange({ clinicVisit: false });
    }
  };

  const onCustomFieldChange2 = (nextValue) => {
    if (nextValue === true) {
      onFieldChange({ clinicVisit: nextValue });
      onFieldChange({ patientVisit: false });
    }
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label
        text="Place"
        type="title"
      />
      <AppointmentForm.BooleanEditor
        label="Patient Visit"
        value={appointmentData.patientVisit}
        onValueChange={onCustomFieldChange1}
      />
      <AppointmentForm.BooleanEditor
        label="Clinic Visit"
        value={appointmentData.clinicVisit}
        onValueChange={onCustomFieldChange2}

      />
    </AppointmentForm.BasicLayout>
  );
};


const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        <Room className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.address}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
      data: [],
      currentDate: date,
      appointmentD: [],
      resources: [],
      currentUser: "",
      lvlAccess: 0,
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    this.commitChanges = this.commitChanges.bind(this);
    this.getPatientAddress = this.getPatientAddress.bind(this)
  }


  async componentWillMount() {
    const token = localStorage.usertoken

    if (token) {
      try {
        const decoded = jwt_decode(token)
        this.setState({
          currentUser: decoded._id,
          lvlAccess : decoded.lvlAccess
        })
      } catch (err) {
        alert(err);
      }
    }
    else {
      alert("USER NOT LOGGED IN")
    }

    const patientsNameList = await getPatientsNames();

    let newPatients = {
      patients: []
    };

    for (let i = 0; i < patientsNameList.length; i++) {
      newPatients.patients.push({
        "text": patientsNameList[i].text,
        "id": patientsNameList[i].id,
        "color": "#009ACD"
      });
    }

    const nurseNamesList = await getNursesNames();
    const doctorNamesList = await getDoctorsNames();
    
    const visitsForUser = await getVisitsForUser(this.state.currentUser, this.state.lvlAccess);

    let newVisits = {
      visits: []
    };

    for (let i = 0; i < visitsForUser.length; i++) {
      newVisits.visits.push({
        "title": visitsForUser[i].title,
        "id": visitsForUser[i]._id,
        "startDate": visitsForUser[i].startDate,
        "endDate": visitsForUser[i].endDate,
        "nurseID": visitsForUser[i].nurseID,
        "doctorID": visitsForUser[i].doctorID,
        "patientID": visitsForUser[i].patientID,
        "address": visitsForUser[i].address,
        "clinicVisit": visitsForUser[i].clinicVisit,
        "patientVisit": visitsForUser[i].patientVisit,
        "color": "#009ACD"
      });
    }

    this.setState({
      data: newVisits.visits
    });
    if(this.state.lvlAccess ===1){
      this.setState({
        resources: [{
          fieldName: 'patientID',
          title: 'Patient',
          instances: newPatients.patients
        },
        {
          fieldName: 'nurseID',
          title: 'Nurse',
          instances: nurseNamesList
        }],

      })
    }
    if (this.state.lvlAccess === 2) {
      this.setState({
        resources: [{
          fieldName: 'patientID',
          title: 'Patient',
          instances: newPatients.patients
        },
        {
          fieldName: 'doctorID',
          title: 'Doctor',
          instances: doctorNamesList
        }],

      })
    }
   
  }

  async getPatientAddress(patientID) {
    let address = "";
    await getPatientAddressByID(patientID).then((res) => {
      address = res.country + ", " + res.city + ", " + res.postalCode + ", " + res.street + ", " + res.adrLine;
    }).catch((er) => {

    });
    return address;
  }

  async commitChanges({ added, changed, deleted }) {
    if (added) {
      let address = ""
      if (added.clinicVisit) {
        await getUserDetails(added.doctorID).then((res) => {
          address = res.address.country + ", " + res.address.city + ", " + res.address.postalCode + ", " + res.address.street + ", " + res.address.adrLine;
        });

      }
      if (added.patientVisit) {
        await getPatientAddressByID(added.patientID).then((res) => {
          address = res.country + ", " + res.city + ", " + res.postalCode + ", " + res.street + ", " + res.adrLine;
        });
      }
      if(this.state.lvlAccess === 1){
        const visit = {
          createdBy: this.state.currentUser,
          doctorID: this.state.currentUser,
          patientID: added.patientID,
          title: added.title,
          startDate: added.startDate,
          endDate: added.endDate,
          nurseID: added.nurseID,
          clinicVisit: added.clinicVisit,
          patientVisit: added.patientVisit,
          address: address
        }

        await addVisits(visit);
      }

      if (this.state.lvlAccess === 2) {
        const visit = {
          createdBy: this.state.currentUser,
          patientID: added.patientID,
          title: added.title,
          startDate: added.startDate,
          endDate: added.endDate,
          nurseID: this.state.currentUser,
          clinicVisit: added.clinicVisit,
          patientVisit: added.patientVisit,
          doctorID: added.doctorID,
          address: address
        }

        await addVisits(visit);
      }
    
      const visits = await getVisitsForUser(this.state.currentUser, this.state.lvlAccess);

      let newVisits = {
        visits: []
      };
 
      for (let i = 0; i < visits.length; i++) {
        newVisits.visits.push({
          "title": visits[i].title,
          "id": visits[i]._id,
          "startDate": visits[i].startDate,
          "endDate": visits[i].endDate,
          "nurseID": visits[i].nurseID,
          "doctorID": visits[i].doctorID,
          "patientID": visits[i].patientID,
          "address": visits[i].address,
          "clinicVisit": visits[i].clinicVisit,
          "patientVisit": visits[i].patientVisit,
          "color": "#0047AB"
        });
      }

      this.setState({
        data: newVisits.visits
      });
    }

    if (deleted !== undefined) {
      deleteVisit(deleted);
      this.setState({
        data: this.state.data.filter(appointment => appointment.id !== deleted)
      });
    }

    if (changed) {
      let dataHere = this.state.data;

      for (let i = 0; i < dataHere.length; i++) {
        let currentChange = changed[dataHere[i].id]
        if (currentChange) {
          let changeObj = {};
          console.log("DOC ID" , currentChange.doctorID)
          changeObj.id = dataHere[i].id;
          currentChange.title ? changeObj.title = currentChange.title : changeObj.title = dataHere[i].title;
          currentChange.startDate ? changeObj.startDate = currentChange.startDate : changeObj.startDate = dataHere[i].startDate;
          currentChange.endDate ? changeObj.endDate = currentChange.endDate : changeObj.endDate = dataHere[i].endDate;
          currentChange.nurseID ? changeObj.nurseID = currentChange.nurseID : changeObj.nurseID = dataHere[i].nurseID;
          currentChange.doctorID ? changeObj.doctorID = currentChange.doctorID : changeObj.doctorID = dataHere[i].doctorID;
          currentChange.patientID ? changeObj.patientID = currentChange.patientID : changeObj.patientID = dataHere[i].patientID;
         
          if(currentChange.doctorID){
            await getUserDetails(changeObj.doctorID).then((res) => {
              changeObj.address = res.address.country + ", " + res.address.city + ", " + res.address.postalCode + ", " + res.address.street + ", " + res.address.adrLine;
            });
          }
          
          if (currentChange.clinicVisit !== undefined) {
            changeObj.clinicVisit = currentChange.clinicVisit;
            if (currentChange.clinicVisit === true) {
              await getUserDetails(changeObj.doctorID).then((res) => {
                changeObj.address = res.address.country + ", " + res.address.city + ", " + res.address.postalCode + ", " + res.address.street + ", " + res.address.adrLine;
              });
            }
          } else {
            changeObj.clinicVisit = dataHere[i].clinicVisit;
          }
          if (currentChange.patientVisit === undefined && dataHere[i].patientVisit === true && currentChange.patientID !== dataHere[i].patientID) {
            changeObj.address = await this.getPatientAddress(changeObj.patientID);
          }
          if (currentChange.patientVisit !== undefined) {
            changeObj.patientVisit = currentChange.patientVisit
            if (currentChange.patientVisit === true) {
              changeObj.address = await this.getPatientAddress(changeObj.patientID)
            }
          } else {
            changeObj.patientVisit = dataHere[i].patientVisit;
          }
          await modifyVisit(changeObj);
          const visits = await getVisitsForUser(this.state.currentUser, this.state.lvlAccess);
          let newVisits = {
            visits: []
          };
          for (let i = 0; i < visits.length; i++) {
            newVisits.visits.push({
              "title": visits[i].title,
              "id": visits[i]._id,
              "startDate": visits[i].startDate,
              "endDate": visits[i].endDate,
              "nurseID": visits[i].nurseID,
              "doctorID": visits[i].doctorID,
              "patientID": visits[i].patientID,
              "address": visits[i].address,
              "clinicVisit": visits[i].clinicVisit,
              "patientVisit": visits[i].patientVisit,
              "color": "#0047AB"
            });
          }
          this.setState({
            data: newVisits.visits
          });
        }
      }
    }
  };

  render() {
    const { data, currentDate, resources } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        {localStorage.usertoken ?
          <header className="styleBackground" >
            <RemoveScrollBar />
            <div style={{ height: '75px' }} />
            <Card className={classes.root}>
              <CardContent className={classes.paper}>
                <Scheduler
                  data={data}
                  height={550}
                >
                  <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={this.currentDateChange}
                  />
                  <EditingState
                    onCommitChanges={this.commitChanges}
                  />
                  <IntegratedEditing />
                  <WeekView
                    startDayHour={9}
                    endDayHour={19}
                  />
                  <Toolbar />
                  <DateNavigator />
                  <Appointments />
                  <AppointmentTooltip
                    showCloseButton
                    contentComponent={Content}
                    showOpenButton
                    showDeleteButton
                  >
                    <Button>Test</Button>
                  </AppointmentTooltip>
                  <AppointmentForm
                    basicLayoutComponent={BasicLayout}
                    textEditorComponent={TextEditor}
                    messages={messages}
                  />

                  <Resources
                    data={resources}
                    mainResourceName="patientID"
                  />
                </Scheduler>
              </CardContent>
            </Card>
          </header>
          :
          this.props.history.push(`/login`)
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Calendar);




