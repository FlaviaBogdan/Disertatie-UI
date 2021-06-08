import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DarkTheme from "./Theme/DarkTheme"
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={DarkTheme}>
      <App />,
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);