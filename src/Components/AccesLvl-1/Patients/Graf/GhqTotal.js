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
        vitalSigns: [],
        loading: true,
    };
    constructor(props) {
        super(props);
        let test = this.props.questionnaireHistory;
        this.state.data = test;
    }
    componentWillMount() {
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
                        <Palette scheme={schemeSet3} />
                        <ValueAxis />
                        <AreaSeries
                  
                            valueField="total"
                            argumentField="currentDate"
                        />
               
                        <Title text="Total value" />
                
                    </Chart>
                  
                }
            </Paper>
        );
    }
}