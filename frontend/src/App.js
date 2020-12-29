import React, { Component } from 'react';
import './App.css';
import CanvasJSReact from './canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
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
            url: '/api/user/2/values/' + this.props.sensorId + '/period/' + this.props.hourRange
        };

        axios(config)
            .then(response => {
                const data_array = [];
                response.data.forEach(item => data_array.push({ x: new Date(Date.parse(item.ts)), y: item.value, markerColor: "#f6c23e" }));
                return data_array;
            })
            .then(data => {
                this.setState({ chartData: data });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.render();
        setInterval(this.updateChart, updateInterval);
    }

    updateChart() {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: '/api/user/2/values/' + this.props.sensorId + '/last/1'
        };

        axios(config)
            .then(response => {
                const data_arrayy = [];
                response.data.forEach(item => data_arrayy.push({ x: new Date(Date.parse(item.ts)), y: item.value, markerColor: "#f6c23e" }));
                return data_arrayy;
            })
            .then(data => {
                this.setState({ last: data[0] });
            })
            .then(data => {
                var joined = this.state.chartData;
                joined.push(this.state.last);
                if (joined.length > 43200) {
                    joined.shift();
                }
                
                this.setState({ chartData: joined });
                this.render();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const options = {
            zoomEnabled: true,
            title: {
                text: this.props.type + " nas últimas " + this.props.hourRange + "h",
                fontFamily: "Nunito",
                fontColor: "#5a5c69",
                fontSize: 25,
                horizontalAlign: "left"
            },
            axisX:{
                title: "Hora",
                intervalType: "hour",        
                valueFormatString: "HH:mm:ss", 
                titleFontColor: "#5a5c69",
                labelFontColor: "#5a5c69",
                labelFontFamily: "Nunito",
                titleFontFamily: "Nunito",
                gridColor: "#5a5c69",
                lineColor: "#5a5c69"
            },
            axisY:{
                title: this.props.yAxis,
                gridThickness: 0.5,
                titleFontColor: "#5a5c69",
                labelFontColor: "#5a5c69",
                labelFontFamily: "Nunito",
                titleFontFamily: "Nunito",
                gridColor: "#5a5c69"
            },
            toolTip:{   
                content: "{x}: {y}"      
            },
            data: [{
                type: "spline",
                lineColor: this.props.lineColor,
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