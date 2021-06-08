import RoutingConfig from './Components/Routes';
import React from 'react';
import './App.css';
import * as PusherPushNotifications from "@pusher/push-notifications-web";


const beamsClient = new PusherPushNotifications.Client({
  instanceId: "c670f437-a379-4025-ba82-b5022c498a8b",
});
beamsClient.start()
  .then(() => beamsClient.addDeviceInterest('hello'))
  .then(() => console.log('Successfully registered and subscribed!'))
  .catch(console.error);

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

