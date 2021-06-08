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
import jwt_decode from 'jwt-decode';
import { getVsForAllUsers } from '../../../utils/UserFunctions';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    Title,
    SplineSeries,
    Legend,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Grid from '@material-ui/core/Grid';


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



class PatientsTable extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            rows: [],
            currentUser: "",
            loading: true,
            data: [],
            nrPatients: [],
            currentPatient: ""

        };
        console.log("NOT LOADING ", this.props.currentPatient)
        this.state.rows = this.props.patientsArray;
        this.state.currentPatient = this.props.currentPatient;
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
     

        let patients = this.state.rows;
        getVsForAllUsers(patients, this.state.currentPatient).then((res) => {

            if (res.status === 200) {
                this.setState({
                    data: res.data,
                    loading: false,
                })

            }
            console.log("TEST data ", res.data)

        });


    }


    render() {
        const { data: chartData } = this.state;
        return (
            <div style={{ maxHeight: '470px' }}>
                <div style={{ height: 20 }} />
                <Paper style={{ maxHeight: '500px' }}>


                    {this.state.loading ? null :
                        <Chart
                            data={chartData}
                        >
                            <ArgumentAxis />
                            <ValueAxis />
                            {this.state.data[0].temperatureC.map((row) => (


                                <SplineSeries
                                    name={row.patientName}
                                    valueField={row.name}
                                    argumentField="_id"
                                />


                            ))}
                            <Title text="Temperature evolution" />
                            <Legend />
                            <Tooltip />
                        </Chart>
                    }
                    <div style={{ height: 20 }} />
                    <Paper style={{ maxHeight: '500px' }}>
                        {this.state.loading ? null :
                            <Chart
                                data={chartData}
                            >
                                <ArgumentAxis />
                                <ValueAxis />
                                {this.state.data[0].bloodOxygenLevel.map((row) => (


                                    <SplineSeries
                                        name={row.patientName}
                                        valueField={row.name}
                                        argumentField="_id"
                                    />

                                ))}
                                <Title text="Oxygen level evolution" />
                                <Legend />
                                <Tooltip />
                            </Chart>
                        }
                    </Paper>


                    <div style={{ height: 20 }} />
                    <Paper style={{ maxHeight: '500px' }}>
                        {this.state.loading ? null :
                            <Chart
                                data={chartData}
                            >
                                <ArgumentAxis />
                                <ValueAxis />
                                {this.state.data[0].heartRate.map((row) => (


                                    <SplineSeries
                                        name={row.patientName}
                                        valueField={row.name}
                                        argumentField="_id"
                                    />

                                ))}
                                <Title text="Heart rate evolution" />
                                <Legend />
                                <Tooltip />
                            </Chart>
                        }
                    </Paper>
                    <div style={{ height: 20 }} />
                    <Paper style={{ maxHeight: '500px' }}>
                        {this.state.loading ? null :
                            <Chart
                                data={chartData}
                            >
                                <ArgumentAxis />
                                <ValueAxis />
                                {this.state.data[0].respiratoryRate.map((row) => (


                                    <SplineSeries
                                        name={row.patientName}
                                        valueField={row.name}
                                        argumentField="_id"
                                    />

                                ))}
                                <Title text="Respiratory rate evolution" />
                                <Legend />
                                <Tooltip />
                            </Chart>
                        }
                    </Paper>
                    <div style={{ height: 20 }} />
                    <Paper style={{ maxHeight: '500px' }}>
                        {this.state.loading ? null :
                            <Chart
                                data={chartData}
                            >
                                <ArgumentAxis />
                                <ValueAxis />
                                {this.state.data[0].systolic.map((row) => (


                                    <SplineSeries
                                        name={row.patientName}
                                        valueField={row.name}
                                        argumentField="_id"
                                    />

                                ))}
                                <Title text="BP - systolic" />
                                <Legend />
                                <Tooltip />
                            </Chart>
                        }
                    </Paper>
                    <div style={{ height: 20 }} />
                    <Paper style={{ maxHeight: '500px' }}>
                        {this.state.loading ? null :
                            <Chart
                                data={chartData}
                            >
                                <ArgumentAxis />
                                <ValueAxis />
                                {this.state.data[0].diastolic.map((row) => (


                                    <SplineSeries
                                        name={row.patientName}
                                        valueField={row.name}
                                        argumentField="_id"
                                    />

                                ))}
                                <Title text="BP - diastolic" />
                                <Legend />
                                <Tooltip />
                            </Chart>
                        }
                    </Paper>
                    <div style={{ height: 20 }} />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(PatientsTable);
