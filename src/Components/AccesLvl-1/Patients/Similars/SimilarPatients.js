import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import TableContainer from '@material-ui/core/TableContainer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import jwt_decode from 'jwt-decode'
import withStyles from '@material-ui/core/styles/withStyles';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Grid from '@material-ui/core/Grid';

const columns = [
    { id: 'name', label: 'Name', minWidth: 100, hide: true },
    { id: 'age', label: 'Age', minWidth: 100 },
    { id: 'illness', label: 'Illness', minWidth: 100 },
    { id: 'doctorNames', label: 'Doctors', minWidth: 100 },
    { id: 'nursesNames', label: 'Nurses', minWidth: 100 },
    { id: 'treatmentName', label: 'Treatment Name', minWidth: 100 },
    { id: 'treatmentDescription', label: 'Description', minWidth: 100 },
    { id: 'treatmentDoctor', label: 'Prescribed by', minWidth: 100 },
];

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
        };

    }

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
                 
                    <TableCell align="left">{this.props.row.name}</TableCell>
                    <TableCell align="left">{this.props.row.age}</TableCell>
                    <TableCell align="left">{this.props.row.illnessString}</TableCell>
                    <TableCell align="left">{this.props.row.doctorNames}</TableCell>
                    <TableCell align="left">{this.props.row.nursesNames}</TableCell>
                    <TableCell align="left">{this.props.row.treatments[0].name}</TableCell>
                    <TableCell align="left">{this.props.row.treatments[0].description}</TableCell>
                    <TableCell align="left">{this.props.row.treatments[0].doctorName}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Medication
                                </Typography>
                                <List style={{ width: '400px', marginTop: '20px', maxHeight: '200px', overflow: 'auto' }} >

                                    <ListItem style={{ backgroundColor: "#01579b" }}>
                                        <Grid container spacing={3} direction="row">
                                            <Grid item xs={3}>
                                                <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Name</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Concentration</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="subtitle2" style={{ color: '#FFF' }} gutterBottom>Administration</Typography>
                                            </Grid>
                                      
                                        </Grid>
                                    </ListItem>
                                    {this.props.row.treatments[0].drugs.map((drug, index) => (
                                        <ListItem key={drug.medID} >
                                            <Grid container spacing={3} direction="row">
                                                <Grid item xs={3}>
                                                    <Typography variant="subtitle2" gutterBottom>{drug.name}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant="subtitle2" gutterBottom>{drug.concentration}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant="subtitle2" gutterBottom>{drug.administration}</Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>




                                    ))}
                                </List>

                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}

class PatientsTable extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            rows: [],
            currentUser: "",
            loading: true

        };
        console.log("NOT LOADING ", this.props.patientsArray)
        this.state.rows = this.props.patientsArray
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

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


    async componentWillMount() {
        const token = localStorage.usertoken
        if (token) {
            try {
                const decoded = jwt_decode(token)
                let id = decoded._id;
                this.setState({
                    currentUser: id,

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
                    <header>
                        <div style={{ height: '75px' }} />
                        <RemoveScrollBar />
                        {this.state.loading ?
                            <div>

                                <TableContainer className={classes.container} style={{ maxHeight: '400px' }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow style={{ backgroundColor: '#01579b', color: '#FFF' }}>
                                                <TableCell style={{ backgroundColor: '#01579b', color: '#FFF' }}/>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align="left"
                                                        style={{ minWidth: column.minWidth, backgroundColor: '#01579b', color: '#FFF' }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                          
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => (
                                                <Row key={row.medID} row={row} />
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
                            </div>
                            : null
                        }
                    </header>
                    :
                    this.props.history.push(`/login`)
                }
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(PatientsTable);
