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
        loading: true,
    };
    constructor(props) {
        super(props);
        let test = this.props.questionnaireHistory;
        this.state.data = test;
    }
    componentWillMount() {
        console.log(this.state.data, "data")
        let formattedData = this.state.data;
        let test = []
        for (let i = 0; i < formattedData.length; i++) {
            test.unshift(formattedData[i])
        }
        let newData = test.map(function (obj) {
            obj.f1 = obj.scores.f1;
            obj.f2 = obj.scores.f2;
            obj.f3 = obj.scores.f3;
            obj.f4 = obj.scores.f4;
            obj.total = obj.scores.total;
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
                            name="Somatic symptoms "
                            valueField="f1"
                            argumentField="currentDate"
                        />
                        <SplineSeries
                            name="Anxiety/insomnia"
                            valueField="f2"
                            argumentField="currentDate"
                        />
                        <SplineSeries
                            name="Social dysfunction"
                            valueField="f3"
                            argumentField="currentDate"
                        />
                        <SplineSeries
                            name="Severe depression"
                            valueField="f4"
                            argumentField="currentDate"
                        />
                        <SplineSeries
                            name="Total"
                            valueField="total"
                            argumentField="currentDate"
                        /> 
                        <Title text="Evolution" />
                        <Legend />
                        <Tooltip />

                    </Chart>
                }
            </Paper>
        );
    }
}
