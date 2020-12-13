import React, { Component } from 'react';
import './App.css';
import CanvasJSReact from './canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var xVal = 1;
var yVal = 15;
var updateInterval = 5000;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            last: null
        }
        this.updateChart = this.updateChart.bind(this);
    }

    componentDidMount() {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: '/api/values/2/period/1'
        };

        axios(config)
            .then(response => {
                const data_array = [];
                response.data.forEach(item => data_array.push({ x: Date.parse(item.ts), y: item.value }));
                return data_array;
            })
            .then(data => {
                this.setState({ chartData: data });
                //console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setInterval(this.updateChart, updateInterval);
    }

    updateChart() {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: '/api/values/2/last/1'
        };

        axios(config)
            .then(response => {
                const data_arrayy = [];
                response.data.forEach(item => data_arrayy.push({ x: Date.parse(item.ts), y: item.value }));
                console.log(data_arrayy);
                return data_arrayy;
            })
            .then(data => {
                this.setState({ last: data[0] });
                //console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(this.state.last);
        var joined = this.state.chartData;
        joined.push(this.state.last);
        joined.shift();
        console.log(joined);
        this.setState({ chartData: joined });
        this.render();
    }

    render() {
        const options = {
            title: {
                text: "Dynamic Line Chart"
            },
            data: [{
                type: "line",
                dataPoints: this.state.chartData
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}


export default App;