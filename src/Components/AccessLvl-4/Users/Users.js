import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import HomeIcon from '@material-ui/icons/Home';
import TableContainer from '@material-ui/core/TableContainer';
import DialogRegister from './UsersDialogues/AddUserDialogue'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { withRouter } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';

import DeleteIcon from '@material-ui/icons/Delete';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import './Users.css';
import Card from '@material-ui/core/Card';
import { getUserName, getNursesAsUser, getDoctorsAsUser, deleteUser, deleteUserDetails } from '../../utils/UserFunctions';
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


const columns = [
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    // { id: 'lastName', label: 'Last Name', minWidth: 100 },
    // { id: 'birthday', label: 'Birthday', minWidth: 100 },
    // { id: 'gender', label: 'Gender', minWidth: 100 },
    // { id: 'phone', label: 'Telephone', minWidth: 100 },
    // { id: 'severity', label: 'Disease', minWidth: 100 },
    // { id: 'gravity', label: 'Gravity', minWidth: 100 },
];


class LoginForm extends React.Component {
    state = {
        loading: true,
        currentUserID: "",
        page: 0,
        rowsPerPage: 5,
        openRegisterForm: false,
        doctorList: [],
        nurseList: [],
        listLength: 0
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
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    }

    registerUser(){
        this.setState({ openRegisterForm: true });
    }

    async componentWillMount() {


        getNursesAsUser().then((res) => {
            // this.setState({
            //     nurseList: res,
            // })
            getDoctorsAsUser().then((res2) => {
                console.log("res2 ", res2)
                let length = res.length + res2.length
                this.setState({
                    nurseList: res,
                    doctorList: res2,
                    listLength: length
                })
                let that = this;
                setTimeout(function () {
                    that.setState({
                        loading: false,
                    })
                }, 2000);
            })
        })
        console.log("this.state.usersList", this.state.usersList)
    }

   
    deleteEntry(row) {
        console.log("ROWW ", row)
        deleteUser(row._id).then((res) => {
            console.log("delete res ", res);
        })
        deleteUserDetails(row._id).then((res2) => {
            console.log("delete res 2", res2);
        })
        if (row.lvlAccess === 1) {
            let doctors = this.state.doctorList;
            let newList = doctors.filter(function (obj) {
                if (obj._id !== row._id) {
                    return obj
                }
            })
            this.setState({
                doctorList: newList
            })
        }
        if (row.lvlAccess === 2) {
            let nurses = this.state.nurseList;
            let newList = nurses.filter(function (obj) {
                if (obj._id !== row._id) {
                    return obj
                }
            })
            this.setState({
                nurseList: newList
            })
        }
    }

    async callbackFromDialog(dialogName) {
        this.setState({ [dialogName]: false });
        this.forceUpdate()
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

    render() {
        const { classes } = this.props;
        return (
            <header className="backgroundLogin">
                {this.state.loading ? null :
                    <Card className={classes.root}>
                        <CardContent className={classes.paper}>
                            <TableContainer className={classes.container} style={{ maxHeight: '500px' }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>

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

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.doctorList.map((row) => (
                                            <TableRow key={row._id}>
                                                <TableCell>
                                                    {row.email}
                                                </TableCell>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton aria-label="delete" size="small" edge="end" onClick={() => this.deleteEntry(row)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {this.state.nurseList.map((row) => (
                                            <TableRow key={row._id}>
                                                <TableCell>
                                                    {row.email}
                                                </TableCell>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton aria-label="delete" size="small" edge="end" onClick={() => this.deleteEntry(row)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                                            <div style={{height:10}}/>
                            <Button color="primary" variant="contained" fullWidth onClick={() => this.registerUser()}>
                                Add new user
                            </Button>
                            {this.state.openRegisterForm && <DialogRegister open={this.state.openRegisterForm} callback={(open) => this.callbackFromDialog(open)} />}
                        </CardContent>
                    </Card>
                }
            </header>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));