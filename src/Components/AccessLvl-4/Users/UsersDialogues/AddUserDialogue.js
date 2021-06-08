import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import NoteForm from './AddUserForm';

class NoteDialog extends React.Component {
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

    handleClose = (user) => {
        this.setState({ open: false });
        this.props.callback("openRegisterForm", user);
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
                        <NoteForm onClose={(user) => this.handleClose(user)} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default NoteDialog;