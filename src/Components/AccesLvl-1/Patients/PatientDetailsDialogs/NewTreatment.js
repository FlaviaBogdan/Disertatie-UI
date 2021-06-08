import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import RegisterForm from './NewTreatmentForm';

class NewTreatmentDialog extends React.Component {
  state = {
    open: false,
  };
  constructor(props) {
    super(props);
    this.state.open = this.props.open;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.callback("registerTreatment");
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth='lg'
          aria-labelledby="Dialog Register User"
          aria-describedby="Register can be modified"
        >
          <DialogContent>
            <RegisterForm onClose={this.handleClose} treatmentID={this.props.treatmentID} getTreatment={this.props.getTreatment} patientDetailsID={this.props.patientDetailsID} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default NewTreatmentDialog;