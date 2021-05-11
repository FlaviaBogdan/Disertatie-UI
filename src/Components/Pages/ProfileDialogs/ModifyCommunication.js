import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ComForm from './ModifyCommunicationForm';

class CommunicationDialog extends React.Component {
    state = {
        open: false,
        currentUser: {},
    };
    constructor(props) {
        super(props);
        this.state.currentUser = this.props.currentUser
        this.state.open = this.props.open
    }
    componentWillMount = () =>{
        console.log("PROPS: ", this.props.currentUser)
        console.log("STATE: ", this.state.currentUser)
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.callback("modifyCommunicationDialogOpen")
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
                        <ComForm onClose={this.handleClose} currentUser={this.state.currentUser} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default CommunicationDialog;