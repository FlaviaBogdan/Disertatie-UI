import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import './NoAccess.css'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import BlockIcon from '@material-ui/icons/Block';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

       
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <center className="pageDef">
                    <BlockIcon color="primary" style={{height:'200px', width:'200px'}}/>
                    <Typography variant="h4" color="primary">
                        NO ACCESS
                    </Typography>
                </center>
               
            </React.Fragment>
        )
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default NavBar;