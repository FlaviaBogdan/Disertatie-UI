import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Box from '@material-ui/core/Box';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { getPatientTreatHistoryIDs, getCurrentTreatmentForUser, getDrugByID, getUserDetails, getUserName, removeUserSettings, addUserSettings } from '../../utils/UserFunctions';
import jwt_decode from 'jwt-decode';
import TablePagination from '@material-ui/core/TablePagination';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
    // paper: {
    //     // marginTop: theme.spacing.unit * 8,
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    // },

    multilineColor: {
        color: 'black'
    },
    popover: {
        pointerEvents: 'none',
        height: '300px',
        width: '300px'
    },
    avatar: {
        // margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
        minWidth: 75,
        minHeight: 75,
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    icon: {
        width: 50,
        height: 50,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0.5),
    },

    submit: {
        marginTop: theme.spacing(3),
    },

    root2: {
        flexGrow: 1,
    },

    root3: {
        '& > *': {
            borderBottom: 'unset',
        },
    },

    // root: {
    //     borderRadius: '20px',
    //     margin: '10px',
    //     boxShadow: "3",
    //     padding: '10px',
    //     minWidth: 700,
    //     maxWidth: 800,
    //     position: 'absolute',
    //     minHeight: 300,
    //     maxHeight: 500,
    // }
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
        minWidth: 900,
        maxWidth: 1300,
        maxHeight: 600,
    },
});





class Row extends React.Component {
    constructor(props) {
        super(props)
        console.log("ROW CONSTR ", this.props.row.newImage)
        // super(props);
        this.state = {
            open: false,
            open2: false,
            specialistDialog: false,
            currentTime: "",
        };
        this.deleteEntry = this.deleteEntry.bind(this)
    }

    setOpen = (event) => {
        let newOp = !this.state.open;
        this.setState({
            open: newOp
        })
    };
    openForm(dialogName) {
        this.setState({ specialistDialog: true });
    }

    async callbackFromDialog(dialogName) {
        this.setState({ [dialogName]: false });
        this.forceUpdate()
    }


    onDelete(userAdministrationRow) {
        // console.log("userAdministrationRow", userAdministrationRow)
    }

    addNewRow(medID) {

        this.props.callbackAdd(medID)
    }

    changeField = (event) => {
        console.log(event.target.id + "  " + event.target.value)
        this.props.callbackVirtualValueSet(event.target.id, event.target.value)

    }

    deleteEntry(row, medID) {
        this.props.callbackOnDelete(row, medID)

    }



    render() {
        return (
            <React.Fragment>
                <TableRow key={this.props.row.medID}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!this.state.open)}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align="left">{this.props.row.name}</TableCell>
                    <TableCell align="left">{this.props.row.administration}</TableCell>
                    <TableCell align="left">{this.props.row.frequency}</TableCell>
                    <TableCell align="left">{this.props.row.notes}</TableCell>

                </TableRow>

                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Med Administration settings
                                </Typography>
                                <TextField
                                    id={this.props.row.medID}
                                    label="Alarm clock"
                                    type="time"
                                    defaultValue="07:30"
                                    // className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    onChange={this.changeField.bind(this)}
                                />
                                <Button color="primary" style={{ marginLeft: '40px', marginTop: '10px' }} onClick={() => { this.addNewRow(this.props.row.medID) }}>
                                    Add
                                </Button>
                                <List style={{ width: '400px', marginTop: '20px', maxHeight: '200px', overflow: 'auto' }} >

                                    <ListItem style={{ backgroundColor: "#01579b" }}>
                                        <Grid container spacing={3} direction="row">
                                            <Grid item xs={3}>
                                                <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Hour</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Minute</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Format</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography align="right" variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Delete</Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    {this.props.row.userAdministration.map((time, index) => (
                                        <ListItem key={time.medID} >
                                            <Grid container spacing={3} direction="row">
                                                <Grid item xs={3}>
                                                    <Typography variant="subtitle2" gutterBottom>{time.hour}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant="subtitle2" gutterBottom>{time.minute}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant="subtitle2" gutterBottom>{time.time}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>

                                                    <IconButton aria-label="delete" size="small" onClick={() => this.deleteEntry(time, this.props.row.medID)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </ListItem>




                                    ))}
                                </List>
                                {/* <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell />
                                            <TableCell />
                                            <TableCell align="right" style={{ color: '#FFF' }}>
                                                <Button variant="contained" size="small" color="primary" onClick={() => {this.addNewRow(this.props.row.medID)}}>Add entry</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hour</TableCell>
                                            <TableCell>Minute</TableCell>
                                            <TableCell align="right">Time</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.row.userAdministration.map((userAdministrationRow) => (
                                            <TableRow >
                                                <TableCell component="th" scope="row">
                                                    {userAdministrationRow.hour}
                                                </TableCell>
                                                <TableCell>{userAdministrationRow.minute}</TableCell>
                                                <TableCell align="right">{userAdministrationRow.time}</TableCell>
                                                <TableCell align="right">
                                                    <Button color="primary" size="small" onClick={() => {this.onDelete(userAdministrationRow)}}>Delete</Button>
                                                </TableCell>
                                                {/* <TableCell align="right">
                                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table> */}

                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}

function createData(medID, name, administration, frequency, notes, userAdministration) {
    return {
        medID,
        name,
        administration,
        frequency,
        notes,
        userAdministration
    };
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            currentUserID: "",
            currentTreatment: {},
            loading: true,
            drugs: [],
            treatmentHistory: [],
            anchorEl: null,
            open: false,
            rows: [],
            page: 0,
            rowsPerPage: 5,
            createdByUser: "",
            docDetails: {},
        }
        this.setCurrentTreatment = this.setCurrentTreatment.bind(this);
        this.virtualValueSet = this.virtualValueSet.bind(this)
        this.addRow = this.addRow.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    onDelete(time, medIDCallback) {
        let currTreatment = this.state.currentTreatment._id;
        let details = {
            treatmentID: currTreatment,
            drugID: medIDCallback,
            admSettings: time
        }

        removeUserSettings(details).then((res) => {
            if (res === 204) {
                let test = this.state.rows;
                let test2 = test.map(function (obj) {
                    if (obj.medID === medIDCallback) {
                        let index = -1;
                        for (let j = 0; j < obj.userAdministration.length; j++) {
                            if (obj.userAdministration[j].hour === time.hour) {
                                if (obj.userAdministration[j].minute === time.minute) {
                                    if (obj.userAdministration[j].time === time.time) {
                                        index = j;
                                    }
                                }
                            }
                        }
                        if(index!== -1){
                            delete obj.userAdministration[index];
                        }                   
                    }           
                    return obj
                });
                this.setState({
                    rows: test2
                })
            }
        })
    }

    addRow(medID2) {
        let test = this.state.rows;
        let currTreatment = this.state.currentTreatment._id;
        let test2 = test.map(function (obj) {
            if (obj.medID === medID2) {
                let time = obj.newValue;
                let hour = parseInt(time.substring(0, 2));
                let minute = parseInt(time.substring(3, 7));
                let format = ""
                if (hour >= 12 && hour <= 23) {
                    format = "PM"
                    if (hour >= 13) {
                        hour = hour - 12
                    }
                }
                else {
                    if (hour === 0) {
                        hour = 12
                    }
                    format = "AM"
                }
                if (minute === 0) {
                    minute = "00"
                }
                const settings = {
                    hour: hour,
                    minute: minute,
                    time: format
                }
                let details = {
                    treatmentID: currTreatment,
                    drugID: medID2,
                    admSettings: settings
                }
                addUserSettings(details).then((res) => {
                    if (res === 204) {
 
                    }
                })
                obj.userAdministration.push({
                    hour: hour,
                    minute: minute,
                    time: format
                })
                return obj;
            }
            else {
                return obj;
            }

        });

        this.setState({
            rows: test2
        })

    }
    virtualValueSet(medId2, time) {
        let test = this.state.rows;
        test.find(({ medID }) => medID === medId2).newValue = time
        this.setState({
            rows: test
        })
    }

    async componentWillMount() {
        const token = localStorage.usertoken
        if (token) {
            try {
                const decoded = jwt_decode(token)
                this.setState({
                    currentUserID: decoded._id,
                })
                let that = this;
                const test = await getPatientTreatHistoryIDs(decoded._id);
                test.forEach(function (obj) {
                    console.log("ID: ", test)
                    let treatmentHistory = [];
                    getCurrentTreatmentForUser(obj).then((res) => {
                        let rowsToSet = [];
                        if (res.status === 200) {
                          
                            if (res.data.current === true) {
                                getUserDetails(res.data.doctorID).then((res2) => {
                                    getUserName(res.data.createdBy).then((res3) => {
                                        res.data.doctorDetails = res2;
                                        console.log("res3 ", res3)
                                        that.setState({
                                            docDetails: res2,
                                            createdByUser: res3,
                                            loading:false
                                        })
                                    })
                                })                             
                                res.data.drugs.forEach(function (obj) {
                                    getDrugByID(obj.medID).then((res) => {
                                        if (res.status === 200) {
                                            obj.name = res.data.Name;
                                            obj.administration = res.data.Administration;
                                            let admDate = new Date(obj.administrationHour);
                                            obj.administrationHour = admDate.toLocaleTimeString('en-US');
                                            rowsToSet.push(createData(obj.medID, res.data.Name, res.data.Administration, obj.frequency, obj.notes, obj.userAdministration))
                                        }

                                    })

                                })

                                that.setState({
                                    currentTreatment: res.data,
                                    drugs: res.data.drugs,
                                    rows: rowsToSet,
                                })
                            }
                            else {
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
            }
            catch (err) {
                alert(err);
            }
        }
    }

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


    getStripedStyle(index) {
        return { background: index % 2 ? '#fafafa' : '#F5F5F5' };
    }

    setCurrentTreatment(currentTreatment) {
        this.setState({
            currentTreatment: currentTreatment
        })
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })

    };


    render() {
        const { classes } = this.props;
        return (
            <header className="backgroundLogin">

                <div style={{ height: '75px' }} />
                {this.state.loading === false ?
                    <Card className={classes.root}>
                        <CardContent >

                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Current Treatment" />
                                <Tab label="Treatment History" />
                            </Tabs>
                            <div style={{ height: 20 }} />
                            {this.state.value === 0 ?
                                <Typography variant="h2">
                                    <Grid container spacing={2}>


                                        <Grid item xs={12} >
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="subtitle1" gutterBottom>Treatment Details</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Name: {this.state.currentTreatment.name}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Description: {this.state.currentTreatment.description}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Created On: {this.state.currentTreatment.createdOn}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Created By: {this.state.createdByUser}</Typography>

                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="subtitle1" gutterBottom>Doctor Details</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Name: {this.state.docDetails.firstName} {this.state.docDetails.lastName}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        Address: {this.state.docDetails.address.country}, {this.state.docDetails.address.city}, {this.state.docDetails.address.postalCode}, {this.state.docDetails.address.street}, {this.state.docDetails.address.adrLine}
                                                    </Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Mobile: {this.state.docDetails.phone}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Phone: {this.state.docDetails.fix}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>fax: {this.state.docDetails.fax}</Typography>
                                                </Grid>
                                            </Grid>
                                            {/* <div style={{ textAlign: 'left', paddingLeft: '20px' }}>

                                                <Typography variant="subtitle1" gutterBottom>Name: {this.state.currentTreatment.name}</Typography>
                                                <Typography variant="subtitle1" gutterBottom>Description: {this.state.currentTreatment.description}</Typography>
                                                <Typography variant="subtitle1" gutterBottom>Name: {this.state.currentTreatment.name}</Typography>

                                            </div> */}
                                        </Grid>
                                        <Grid item xs={12}>

                                        </Grid>
                                    </Grid>
                                    <TableContainer component={Paper} style={{ maxHeight: '400px' }}>
                                        <Table aria-label="collapsible table">
                                            <TableHead>

                                                <TableRow style={{ backgroundColor: '#01579b', color: '#000' }}>
                                                    <TableCell />
                                                    <TableCell style={{ color: '#FFF' }}>Name</TableCell>
                                                    <TableCell align="right" style={{ color: '#FFF' }}>Administration</TableCell>
                                                    <TableCell align="right" style={{ color: '#FFF' }}>Frequency</TableCell>
                                                    <TableCell align="right" style={{ color: '#FFF' }}>Notes</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => (
                                                    <Row key={row.name} row={row} callbackVirtualValueSet={(medId, time) => this.virtualValueSet(medId, time)} callbackOnDelete={(time, medId) => this.onDelete(time, medId)} callbackAdd={(medID) => this.addRow(medID)} />
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 50]}
                                            component="div"
                                            count={this.state.rows.length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        />
                                    </TableContainer>


                                    {/* <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rows={this.state.drugs}
                                            columns={columns}
                                            pageSize={5}

                                        >
                                        </DataGrid>
                                    </div> */}
                                </Typography>
                                :
                                <Grid container spacing={3} style={{ padding: '20px' }}>
                                    {this.state.treatmentHistory.map((value) => (
                                        <Grid key={value._id} item xs={12} sm={12} style={{ borderStyle: 'solid', borderColor: '#01579b', borderWidth: '2px', borderRadius: '5px', backgroundColor: '#F8F8F8' }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="subtitle1" gutterBottom>Treatment Details</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Name: {value.name}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Description: {value.description}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Created On: {value.createdOn}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Created By: {value.createdByName}</Typography>

                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="subtitle1" gutterBottom>Doctor Details</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Name: {value.doctorDetails.firstName} {value.doctorDetails.lastName}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        Address: {value.doctorDetails.address.country}, {value.doctorDetails.address.city}, {value.doctorDetails.address.postalCode}, {value.doctorDetails.address.street}, {value.doctorDetails.address.adrLine}
                                                    </Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Mobile: {value.doctorDetails.phone}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>Phone: {value.doctorDetails.fix}</Typography>
                                                    <Typography variant="subtitle2" gutterBottom>fax: {value.doctorDetails.fax}</Typography>
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


                                        </Grid>
                                    ))}

                                </Grid>
                            }
                        </CardContent>
                    </Card>
                    : null
                }


            </header>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));