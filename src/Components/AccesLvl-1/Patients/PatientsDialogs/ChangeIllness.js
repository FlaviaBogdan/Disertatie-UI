import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ChangeIllnessForm from './ChangeIllnessForm';

class IllnessDialog extends React.Component {
    state = {
        open: false,
    };
    constructor(props) {
        super(props);
        this.state.open = this.props.open
        console.log("addIllnessDialog")
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (test) => {
        this.setState({ open: false });
        console.log("TESTTT ILNESS DIALOG ", test)
        this.props.callback("addIllnessDialog", test);
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
                        <ChangeIllnessForm onClose={(test) => this.handleClose(test)} patientDetails={this.props.patient_id} illness={this.props.illness}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default IllnessDialog;