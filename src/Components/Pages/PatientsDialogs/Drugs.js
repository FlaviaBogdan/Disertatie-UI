import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { getDrugs } from '../../utils/UserFunctions'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
const columns = [
    { field: 'id', headerName: 'ID', width: 110 },
    { field: '_id', headerName: '_id', width: 110, hide: true },
    { field: 'Name', headerName: 'Name', width: 250 },
    { field: 'DCI', headerName: 'DCI', width: 250 },
    { field: 'Administration', headerName: 'Administration', width: 250 },
    { field: 'Concentration', headerName: 'Concentration', width: 190 },
    { field: 'Action', headerName: 'Action', width: 400 },


];
const ValidationTextField = withStyles({
    root: {
        "& .MuiFormLabel-root": {
            color: "black" // or black
        },
        '& input:valid + fieldset': {
            borderColor: '#01579b',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: '01579b',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);



class DrugsTable extends React.Component {
    state = {
        drugsData: [],
        addedDrugs: false,
        selectedRows: [],
    }



    async componentDidMount() {
        const data = await getDrugs();

        this.setState({
            drugsData: data
        })
        console.log(this.state.drugsData[0])
    }

    addDrugs = () => {
        if (this.state.addedDrugs === true) {
            this.setState({
                addedDrugs: false,
            })
        }
        if (this.state.addedDrugs === false) {
            this.setState({
                addedDrugs: true,
            })
        }
    }

    addFrequency(item) {
        console.log("ITEM ", item)
    }

    selectionChange(e) {
        const selectedIDs = new Set(e.selectionModel);
        const selectedRowData = this.state.drugsData.filter((row) =>
            selectedIDs.has(row.id)
        );
        this.setState({
            selectedRows: selectedRowData
        })
        console.log("ID HERE PLS: ", selectedRowData)
        // this.props.callbackSelected(selectedRowData);
    }

    render() {
        return (
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={this.state.drugsData}

                    columns={columns}
                    pageSize={7}
                    checkboxSelection
                    filterModel={{
                        items: [
                            { columnField: 'Name', operatorValue: 'contains', value: 'rice' },
                        ],
                    }}
                    onSelectionModelChange={(e) => {
                        this.selectionChange(e)
                    }}
                >

                </DataGrid>
                <div style={{ height: '10px' }} />
                <Button variant="contained" color="primary" fullWidth onClick={this.addDrugs}>
                    {this.state.addedDrugs ? 'Reset' : 'Add Drugs'}
                </Button>
                {this.state.addedDrugs ?

                    <List>
                        {this.state.selectedRows.map((item) => (

                            <ListItem>
                                <Typography variant="subtitle2">{item.Name}</Typography>
                                <div style={{ width: '10px' }} />
                                <ValidationTextField

                                    style={{ width: '250px' }}

                                    id="frequency"
                                    label="Frequency"
                                    value={item.frequency}
                                    variant="outlined"

                                    onChange={this.addFrequency(item)}
                                />
                                <div style={{ width: '10px' }} />
                                <ValidationTextField

                                    style={{ width: '400px' }}

                                    id="comment"
                                    label="Note"
                                    value={item.comment}
                                    variant="outlined"

                                // onChange={this.changeField.bind(this)}
                                />
                            </ListItem>
                        ))}

                    </List>


                    : null
                }
            </div>
        );
    }
}

DrugsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(DrugsTable);