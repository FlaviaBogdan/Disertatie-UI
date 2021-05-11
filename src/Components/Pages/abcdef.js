import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { getDrugs } from '../../utils/UserFunctions'


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name', width: 180 },
    { field: 'DCI', headerName: 'DCI', width: 130 },
    { field: 'Administration', headerName: 'Administration', width: 130 },
    { field: 'Concentration', headerName: 'Concentration', width: 130 },
    { field: 'Action', headerName: 'Action', width: 130 },


];

class DataGridDemo extends React.Component {
    state = {
        //Add user
        email: 'example@yahoo.com',
        drugsData: [],

    }

    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        const data = await getDrugs();
        console.log(data[0].Name)
        // let test = data;
        // for(let i = 0 ; i < test.length ; i++){
        //     test[i].id = test[i]._id;
        // }
        this.setState({
            drugsData: data
        })
        console.log(this.state.drugsData[0])
    }



    // selectionChange(e) {
    //     const selectedIDs = new Set(e.selectionModel);
    //     const selectedRowData = this.state.data.filter((row) =>
    //         selectedIDs.has(row.id)
    //     );
    //     console.log("selected rowData:", selectedRowData);

    // }

    render() {
        const { classes } = this.props;

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
                // onSelectionModelChange={(e) => {
                //     this.selectionChange(e)
                // }}



                // onSelectionChange={itm => console.log(itm)}
                // onRowSelected={(e) => console.log(e.data)}
                />
            </div>
        );
    }
}

DataGridDemo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(DataGridDemo);