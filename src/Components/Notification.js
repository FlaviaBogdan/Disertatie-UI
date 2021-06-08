import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom'

import withStyles from '@material-ui/core/styles/withStyles';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CardContent from '@material-ui/core/CardContent';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const vertical = 'top';
const horizontal = 'right';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

        }
        console.log("FSFDSFS test?")
        this.state.open = this.props.open
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setOpen(false);
    };

    setOpen(value) {
        this.setState({
            open: value
        })
    }

    render() {
        return (
            <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={this.handleClose} severity={this.props.type}>
                    {this.props.message}
                </Alert>
            </Snackbar>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(LoginForm);