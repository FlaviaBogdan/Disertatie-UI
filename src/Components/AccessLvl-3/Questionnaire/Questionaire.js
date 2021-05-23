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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import withStyles from '@material-ui/core/styles/withStyles';
import questions from '../../Questionaire/questions.json';
import './Symptoms.css';
import TextField from '@material-ui/core/TextField';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Card from '@material-ui/core/Card';
import { addVitalSigns, getTodayRegister, addQuestionnaire } from '../../utils/UserFunctions';
import jwt_decode from 'jwt-decode';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    smallRadioButton: {
        "& svg": {
            width: "0.8em",
            height: "0.8em"
        }
    },
    checkboxLabel: {
        fontSize: 40
    },
    root2: {
        width: '100%',
        // maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    paper: {
        // marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },

    multilineColor: {
        color: 'black'
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

    root: {
        borderRadius: '20px',
        margin: '10px',
        marginTop: '100px',
        boxShadow: "3",
        padding: '10px',
        minWidth: 800,
        maxWidth: 900,
        position: 'absolute',
        minHeight: 500,
        maxHeight: '600px'
    }
});


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


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentUserID: "",
            today: "",
            healthState: "",

        }
        this.state.questions = questions;
        this.sendResult = this.sendResult.bind(this)
        // this.handleClick = this.handleClick.bind(this)
        // this.sendSymptoms = this.sendSymptoms.bind(this)
    }

    async componentWillMount() {
        const token = localStorage.usertoken
        if (token) {
            try {
                const decoded = jwt_decode(token)
                let tod = new Date();
                this.setState({
                    currentUserID: decoded._id,
                    today: tod
                })
            } catch (err) {
                alert(err);
            }
        }
    }

    changeField = (event) => {
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
    }

    handleChange = (event, question) => {
        console.log("event", event)
        console.log("question", question)
        // this.setState({
        //     healthState: event.target.value
        // })
        this.state.questions.filter((elem) => {
            if (elem.id === question) {
                console.log("GOOD")
                elem.answer = parseInt(event.target.value)
            }
        })
    };



    sendResult() {
        let questions = this.state.questions;
        let answers = {

        };
        let completed = true;
        console.log("questions", questions)
        questions.forEach(function (obj) {
            if (!obj.answer && obj.answer !== 0) {
                completed = false;
            }
            else {
                answers[obj.id] = obj.answer
            }
        })
        console.log("answers", answers)
        if (!completed) {
            alert("Please respond to all the questions before submitting the form!")
        }
        else {
            let tod = new Date();
            
            let f1 = answers.q1 + answers.q2 + answers.q3 + answers.q4 + answers.q5 + answers.q6 + answers.q7;
            let f2 = answers.q8 + answers.q9 + answers.q10 + answers.q11 + answers.q12 + answers.q13 + answers.q14;
            let f3 = answers.q15 + answers.q16 + answers.q17 + answers.q18 + answers.q19 + answers.q20 + answers.q21;
            let f4 = answers.q22 + answers.q23 + answers.q24 + answers.q25 + answers.q26 + answers.q27 + answers.q28;

            let total = f1 + f2 + f3 + f4;
            const scores = {
                f1: f1,
                f2: f2,
                f3: f3,
                f4: f4,
                total: total
            }
            const data = {
                patientID : this.state.currentUserID,
                scores: scores,
                answers: answers,
                creationDate: tod
            }
            addQuestionnaire(data).then((res)=>{
                if(res.status === 201){
                    console.log("addQuestionnaire", res)
                }
            })
        }
        // this.setState({
        //     submitted: true,
        //     systolic: 1000
        // })
        // console.log("Nice ", this.state)
        // const details = {

        //     temperatureC: this.state.temperature,
        //     bloodOxygenLevel: this.state.bloodOxygenLvl,
        //     heartRate: this.state.heartRate,
        //     respiratoryRate: this.state.respiratoryRate,

        //     systolic: this.state.systolic,
        //     diastolic: this.state.distolic,


        //     date: this.state.today,
        //     userID: this.state.currentUserID,

        // }
        // addVitalSigns(details).then((res) => {
        //     console.log("RES ", res)
        //     if (res.status === 201) {
        //         this.setState({
        //             vitalSignsID: res.data.vitalSignsID,
        //             submitted: true,
        //         })
        //     }
        // })

        // console.log("Nice2 ", this.state)
    }

    onSubmit = (e) => {

        e.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
            <header className="backgroundLogin">
                <div style={{ height: '100px' }} />

                {/* <RemoveScrollBar /> */}

                <Card className={classes.root}>
                    <CardContent >
                        <div className={classes.paper}>

                            <Typography variant="h5" component="h2">
                                Questionnaire
                                        </Typography>
                        </div>
                        {/* <div style={{ alignContent: "left", textAlign: 'left', maxHeight: '200px' }}> */}
                        <List className={classes.root2} style={{ maxHeight: '430px', overflowX: 'scroll' }}>
                            {this.state.questions.map((question, index) => (
                                <div>
                                    <ListItem alignItems="flex-start" key={question.id}>
                                        <ListItemAvatar>
                                            <Avatar style={{ width: 50, height: 50, marginBottom: 20, marginTop: 5, backgroundColor: "#01579b" }} alt="Remy Sharp">{++index}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText style={{ marginTop: 10, marginLeft: 20 }}
                                            primary={
                                                <React.Fragment>
                                                    <Typography variant="body1" >
                                                        {question.text}
                                                    </Typography>

                                                </React.Fragment>
                                            }

                                            secondary={
                                                <React.Fragment>
                                                    <FormControl component="fieldset">
                                                        <RadioGroup aria-label="answer" name="answer" onChange={(event) => this.handleChange(event, question.id)} row>
                                                            <FormControlLabel value="0" className={classes.smallRadioButton} control={<Radio />} label="Better than usual" />
                                                            <FormControlLabel value="1" className={classes.smallRadioButton} control={<Radio />} label="Same as usual" />
                                                            <FormControlLabel value="2" className={classes.smallRadioButton} control={<Radio size="small" />} label="Worse than usual" />
                                                            <FormControlLabel value="3" className={classes.smallRadioButton} control={<Radio />} label="Much worse than usual" />

                                                        </RadioGroup>
                                                    </FormControl>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider style={{ marginBottom: '20px' }} />
                                </div>

                            ))}
                        </List>
                        <Grid
                            justify="center" // Add it here :)
                            container
                            spacing={1}
                        >
                            <Grid item>
                                <Button
                                    // fullWidth
                                    type="submit"
                                    variant="contained"
                                    onClick={this.sendResult}
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </header>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));