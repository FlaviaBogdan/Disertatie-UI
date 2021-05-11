import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AddressForm from './ModifyAddressForm';

class AddressDialog extends React.Component {
  state = {
    open: false,
    address: {},
  };
  constructor(props) {
    super(props);
    this.state.address = this.props.address
    this.state.open = this.props.open
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (name) => {
    this.setState({ open: false });
    this.props.callback("addNewPatientDialog")
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
            <AddressForm onClose={this.handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default AddressDialog;