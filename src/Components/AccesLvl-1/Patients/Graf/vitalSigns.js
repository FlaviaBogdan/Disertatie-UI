import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    Title,
    SplineSeries,
    Legend,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';




export default class Demo extends React.PureComponent {
    state = {
        data: [],
        vitalSigns: [],
        loading : true,
    };
    constructor(props) {
        super(props);
        this.state.data = this.props.vitalSigns;
        console.log("this.props.vitalSigns", this.props.vitalSigns)
    }
    componentWillMount(){
        console.log(this.state.data, "data")
        let formattedData = this.state.data;
        let newData = formattedData.map(function (obj) {
            let bp = obj.bloodPressure;
            obj.systolic = bp.systolic;
            obj.diastolic = bp.diastolic;
            return obj;
        })
        console.log("newData", newData)
        this.setState({
            data: newData,
            loading: false
        })

    }

    render() {
        const { data: chartData } = this.state;

        return (
            
            <Paper>
                {this.state.loading ? null : 
                <Chart
                    data={chartData}
                >
                    <ArgumentAxis />
                    <ValueAxis />

                    <SplineSeries
                        name="Temperature"
                        valueField="temperatureC"
                        argumentField="creationDate"
                    />
                    <SplineSeries
                        name="Oxygen level"
                        valueField="bloodOxygenLevel"
                        argumentField="creationDate"
                    />
                    <SplineSeries
                        name="Heart rate"
                        valueField="heartRate"
                        argumentField="creationDate"
                    />
                    <SplineSeries
                        name="Respiratory Rate"
                        valueField="respiratoryRate"
                        argumentField="creationDate"
                    />
                    <SplineSeries
                        name="BP - systolic"
                        valueField="systolic"
                        argumentField="creationDate"
                        /> <SplineSeries
                            name="BP - diastolic"
                            valueField="diastolic"
                            argumentField="creationDate"
                        />
                        <Title text="Last 7 days evolution" />
                        <Legend />
                        <Tooltip />
                </Chart>
                }
            </Paper>
        );
    }
}
