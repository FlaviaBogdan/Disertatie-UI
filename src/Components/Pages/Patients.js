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
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DialogSpecialist from './PatientsDialogs/Specialists'
import DialogAddress from './PatientsDialogs/ModifyAddress'
import { getPatientsForUser, removeDoctorForPatient } from '../utils/UserFunctions'
import jwt_decode from 'jwt-decode'
import withStyles from '@material-ui/core/styles/withStyles';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import Grid from '@material-ui/core/Grid';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
const columns = [
  { id: 'patientCode', label: 'Patient Code', minWidth: 100 },
  { id: 'firstName', label: 'First Name', minWidth: 100 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  { id: 'birthday', label: 'Birthday', minWidth: 100 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'phone', label: 'Telephone', minWidth: 100 },
  { id: 'severity', label: 'Disease', minWidth: 100 },
  { id: 'gravity', label: 'Gravity', minWidth: 100 },
];

// {
//   id: 'size',
//   label: 'Size\u00a0(km\u00b2)',
//   minWidth: 170,
//   align: 'right',
//   format: (value) => value.toLocaleString('en-US'),
// },
// {
//   id: 'density',
//   label: 'Density',
//   minWidth: 170,
//   align: 'right',
//   format: (value) => value.toFixed(2),
// },

function createData(patientCode, firstName, lastName, birthday, gender,  phone, severity, gravity, address, _id) {

  return {
    patientCode, firstName, lastName, birthday, gender, phone, severity, gravity, address: [
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
  paper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `2px 3px 3px`,
    overflowX: 'auto',
  },

  root: {
    borderRadius: '20px',
    margin: '5px',
    boxShadow: "3",
    padding: '5px',
    maxWidth: 1400,
    maxHeight: 630,
  },
});


class Row extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      open: false,
      open2: false,
      specialistDialog: false,
    };

    this.setOpen2 = this.setOpen2.bind(this);
    this.setOpen = this.setOpen.bind(this);

  }
  openForm(dialogName) {
    console.log("DIALOG NAME2: " + dialogName)
    this.setState({ specialistDialog: true });
    console.log("DIALOG NAME222: " + this.state.specialistDialog)

  }
  async callbackFromDialog(dialogName) {
    this.setState({ [dialogName]: false });
    // const userDetails = await getUserDetails(this.state.currentUserID);
    // console.log("CUURENT USER DETAILS:  ", userDetails.address)

    // this.setState({
    //   currentUser: userDetails,
    //   currentAddress: userDetails.address
    // });
    this.forceUpdate()
  }

  unassignMe(id){
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
        <TableRow >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!this.state.open)}>
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <center>
              <img src={this.props.row.image} style={{ width: "30px", height: "30px", borderRadius: "20px" }} />
            </center>
          </TableCell>
          <TableCell align="left">{this.props.row.firstName}</TableCell>
          <TableCell align="left">{this.props.row.lastName}</TableCell>
          <TableCell align="left">{this.props.row.birthday}</TableCell>
          <TableCell align="left">{this.props.row.gender}</TableCell>

      
          <TableCell align="left">{this.props.row.phone}</TableCell>
          <TableCell align="left">{this.props.row.severity}</TableCell>
          {/* <TableCell align="left">{row.gravity}</TableCell> */}
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
        {this.state.specialistDialog && <DialogSpecialist open={this.state.specialistDialog} currentPacient={this.props.row} callback={(open) => this.callbackFromDialog(open)} />}
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


class StickyHeadTable2 extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      page: 0,
      rowsPerPage: 5,
      loading: true,
      rows: [],
      currentUser: "",
      clickedPatient: [],
      addNewPatientDialog: false,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }


  unassign(patID){
    const details={
      patientDetailsID: patID,
      doctor: this.state.currentUser
    }
    console.log("patID " , details);
    removeDoctorForPatient(details).then(res => {

      if (res.status === 204) {
        alert("You were succesfully unassigned as a doctor for patient " + patID);
        getPatientsForUser(this.state.currentUser).then(patients => {
        let a = []
        // patientCode, firstName, lastName, birthday, gender,  emailAddress, phone, severity, gravity, city, country
        for (let i = 0; i < patients.length; i++) {
          console.log("PATIENTSSSS:", patients[i].illness)
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
          let test = new Date(patients[i].dateOfBirth);
  
          var dd = String(test.getDate()).padStart(2, '0');
          var mm = String(test.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = test.getFullYear();
          let birthday = dd + '/' + mm + '/' + yyyy;
          console.log("IMG " , patients[i].image)
          a.push(createData(patients[i].image, patients[i].firstName, patients[i].lastName, birthday, patients[i].gender, patients[i].phone, disease, patients[i].gravityCode, patients[i].address, patients[i]._id))
        }
          this.setState({
            rows: a
          })
        })
      } else if (res === 400) {

        alert("Not found");
      } else {

        alert("An error ocurred");
      }
    })
  }

  openForm(dialogName) {
    console.log("DIALOG NAME: " + dialogName)
    this.setState({ [dialogName]: true });
    console.log("TEST" , this.state.specialistDialog)

  }
  async callbackFromDialog(dialogName) {
    this.setState({ [dialogName]: false });
    // const userDetails = await getUserDetails(this.state.currentUserID);
    // console.log("CUURENT USER DETAILS:  ", userDetails.address)

    // this.setState({
    //   currentUser: userDetails,
    //   currentAddress: userDetails.address
    // });
    this.forceUpdate()
  }
  setLoading = (test) => {
    console.log("TEST CALLBACK: ", test)

    this.setState({
      loading: !this.state.loading,
      clickedPatient: test
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




  async componentWillMount() {
    const token = localStorage.usertoken
    if (token) {
      try {
        const decoded = jwt_decode(token)
        const patients = await getPatientsForUser(decoded._id);
        let a = []
        // patientCode, firstName, lastName, birthday, gender,  emailAddress, phone, severity, gravity, city, country
        for (let i = 0; i < patients.length; i++) {
          console.log("PATIENTSSSS:", patients[i].illness)
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

          let test = new Date(patients[i].dateOfBirth);

          var dd = String(test.getDate()).padStart(2, '0');
          var mm = String(test.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = test.getFullYear();
          let birthday = dd + '/' + mm + '/' + yyyy;
          let image = patients[i].image;
          let newImg = [image]
          console.log("IMG ", newImg)
          a.push(createData(newImg, patients[i].firstName, patients[i].lastName, birthday, patients[i].gender, patients[i].phone, disease, patients[i].gravityCode, patients[i].address, patients[i]._id))
        }
        this.setState({
          rows: a
        })
        console.log("TESTFSDFSFDS   " + patients.length)
        this.setState({
          currentUser: decoded._id
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
                          <Row key={row.name} row={row} setLoading={this.setLoading} callbackUnassign={(patientID) => this.unassign(patientID)}/>
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

              <Card className={classes.root}>
                <CardContent className={classes.paper}>
                  <Button variant="contained" color="primary" onClick={() => this.setLoading()}>
                    Primary
                  </Button>
                  <Typography variant="subtitle1">
                    YOU FOOL: {this.state.clickedPatient.firstName}
                  </Typography>
                </CardContent>
              </Card>
            }
          </header>
          :
          this.props.history.push(`/login`)
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StickyHeadTable2);
