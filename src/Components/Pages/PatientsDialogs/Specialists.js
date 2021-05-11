import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AddressForm from './SpecialistsForm';

class AddressDialog extends React.Component {
  state = {
    open: false,
    currentPacient: {},
  };
  constructor(props) {
    super(props);
   console.log("HERE?")
    this.state.open = this.props.open
    this.state.currentPacient = this.props.currentPacient;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (name) => {
    this.setState({ open: false });
    this.props.callback("specialistDialog")
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth='lg'
          aria-labelledby="Dialog Modify Address"
          aria-describedby="Address can be modified"
        >
          
          <DialogContent>
            <AddressForm onClose={this.handleClose} pacient={this.state.currentPacient} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default AddressDialog;