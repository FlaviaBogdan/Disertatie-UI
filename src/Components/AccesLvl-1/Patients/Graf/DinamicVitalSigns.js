import * as React from 'react';
import { Palette } from '@devexpress/dx-react-chart';
import Paper from '@material-ui/core/Paper';
import {
    schemeCategory10,
    schemeAccent,
    schemeDark2,
    schemeSet1,
    schemeSet3,
} from 'd3-scale-chromatic';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    Legend,
    AreaSeries,
    Title,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

export default class Demo extends React.PureComponent {
    state = {
        data: [],
        loading: false,
    };
    constructor(props) {
        super(props);
        this.state.data = this.props.vitalSigns;
    }

    componentWillMount(){
        if (this.props.typeGraf === "bp"){
            let test = this.props.vitalSigns;
            let newValues = test.map(function(obj){
                let bp = obj.bloodPressure;
                obj.systolic = bp.systolic;
                obj.diastolic = bp.diastolic;
                return obj;
            })
            this.setState({
                data: newValues
            })
        }
    }


    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                {this.props.typeGraf === "bp" ?
                    <Chart
                        data={chartData}
                    >
                        <ArgumentAxis />
                        <Palette scheme={schemeSet3} />
                        <ValueAxis />
                        <AreaSeries
                            name="Systolic"
                            valueField="systolic"
                            argumentField="creationDate"
                        />
                        <AreaSeries
                            name="Diastolic"
                            valueField="diastolic"
                            argumentField="creationDate"
                        />
                        <Title text="Blood Pressure" />
                        <Tooltip />
                        <Legend />
                    </Chart>
                    :
                    null
                }
                {this.props.typeGraf === "temperature" ?
                <Chart
                        palette="Harmony Light"
                    data={chartData}
                >
                    <ArgumentAxis />
                        <Palette scheme={schemeDark2}/>
                    <ValueAxis />
                    <AreaSeries
                        valueField="temperatureC"
                        argumentField="creationDate"
                    />
                    <Title text="Temperature" />
                    <Tooltip />
                </Chart>
                :
                null
                }
                {this.props.typeGraf === "bloodOxygenLevel" ?
                    <Chart
                        data={chartData}
                    >
                        <ArgumentAxis />
                        <ValueAxis />
                        <Palette scheme={schemeCategory10} />
                        <AreaSeries
                            valueField="bloodOxygenLevel"
                            argumentField="creationDate"
                        />
                        <Title text="Oxygen level in blood" />
                        <Tooltip />
                    </Chart>
                    :
                    null
                }
                {this.props.typeGraf === "heartRate" ?
                    <Chart
                        palette="Harmony Light"
                        data={chartData}
                    >
                        <ArgumentAxis />
                        <Palette scheme={schemeAccent} />
                        <ValueAxis />
                        <AreaSeries
                            valueField="heartRate"
                            argumentField="creationDate"
                        />
                        <Title text="Heart rate" />
                        <Tooltip />
                    </Chart>
                    :
                    null
                }
                {this.props.typeGraf === "respiratoryRate" ?
                    <Chart
                        palette="Harmony Light"
                        data={chartData}
                    >
                        <ArgumentAxis />
                        <Palette scheme={schemeSet1} />
                        <ValueAxis />
                        <AreaSeries
                            valueField="respiratoryRate"
                            argumentField="creationDate"
                        />
                        <Title text="Respiratory rate" />
                        <Tooltip />
                    </Chart>
                    :
                    null
                }
            </Paper>
        );
    }
}
