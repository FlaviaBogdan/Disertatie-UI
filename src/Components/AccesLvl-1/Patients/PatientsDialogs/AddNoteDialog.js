import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import NoteForm from './AddNoteForm';

class NoteDialog extends React.Component {
    state = {
        open: false,
        treatmentID: ""
    };
    constructor(props) {
        super(props);
        this.state.open = this.props.open;
        this.state.treatmentID = this.props.treatmentID;
        console.log("addNoteDialog")
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.callback("addNoteDialog");
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
                        <NoteForm onClose={this.handleClose} treatmentID={this.state.treatmentID} currentUser={this.props.currentUser}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default NoteDialog;