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
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { withRouter } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';

import DeleteIcon from '@material-ui/icons/Delete';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import './Disease.css';
import Card from '@material-ui/core/Card';
import { getUserName, getNursesAsUser, deleteDisease, createDisease, getDiseaseList } from '../../utils/UserFunctions';
import jwt_decode from 'jwt-decode';
import CardContent from '@material-ui/core/CardContent';



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
    // { id: 'email', label: 'Email', minWidth: 100 },
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
        diseaseList: [],
        illness: "",
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

    addIllness() {
        console.log("test  ", this.state.illness)
        let disease = this.state.illness;
        createDisease(disease).then((res)=>{
            console.log("TEST ILLNESSS ", res)
            if(res.status === 201){
                let diseaseCreated = res.data.details;
                console.log("TEST RES  ", diseaseCreated)
                let diseaseArr = this.state.diseaseList;
                // let test = {
                //     name: diseaseCreated.name
                // }
                diseaseArr.push(diseaseCreated);
                this.setState({
                    diseaseList: diseaseArr
                })
            }
        })
    }


    changeField = (event) => {
        this.setState({
            illness: event.target.value
        })
    }

    async componentWillMount() {
        getDiseaseList().then((res) => {
            console.log("DISEASE LIST   ", res)
            this.setState({
                diseaseList: res.data,
                loading: false
            })
        })


        console.log("this.state.diseaseList", this.state.diseaseList)
    }


    deleteEntry(row) {
        deleteDisease(row._id).then((res)=>{
            console.log("TEST 22223  ", res)
            if(res.status === 201){
                let diseaseArray = this.state.diseaseList;
                let newList = diseaseArray.filter(function (obj) {
                    console.log("OBJ ID ", obj._id , " row id ", row._id )
                    if (obj._id !== row._id) {
                        return obj
                    }
                })
                this.setState({
                    diseaseList: newList
                })
            }
        })
    }


    render() {
        const { classes } = this.props;
        return (
            <header className="backgroundLogin">
                {this.state.loading ? null :
                    <Card className={classes.root}>
                        <CardContent className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} style={{padding:25, alignText:'center'}}>
                                    <Typography variant="h5">
                                        Disease settings
                                    </Typography>
                                    </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={10}>
                                            <ValidationTextField
                                                InputProps={{
                                                    className: classes.multilineColor
                                                }}
                                                fullWidth
                                                required
                                                id="illness"
                                                label="Disease"
                                                value={this.state.illness}

                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.changeField.bind(this)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button color="primary" variant="contained" style={{marginTop:'10px'}} fullWidth onClick={() => this.addIllness()}>
                                                Add 
                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
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
                                                    <TableCell align="right">
                                                        Actions
                            </TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.diseaseList.map((row) => (
                                                    <TableRow key={row._id}>
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
                                </Grid>

                            </Grid>

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