import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SpecialistsForm from './SpecialistsForm';

class Specialists extends React.Component {
  state = {
    open: false,
    currentPatient: {},
  };
  constructor(props) {
    super(props);
    this.state.open = this.props.open
    this.state.currentPatient = this.props.currentPatient;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
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
        >
          <DialogContent>
            <SpecialistsForm onClose={this.handleClose} patient={this.state.currentPatient} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Specialists;