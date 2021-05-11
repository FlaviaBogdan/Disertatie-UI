import RoutingConfig from './Components/Routes';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authSuccessfull: false,
    }
  }
  render() {
    return (
      <div>
        <RoutingConfig />
      </div>
    );
  }
}
export default App;

