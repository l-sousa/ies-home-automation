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
            url: '/api/values/2/period/12'
        };

        axios(config)
            .then(response => {
                const data_array = [];
                response.data.forEach(item => data_array.push({ x: new Date(Date.parse(item.ts)), y: item.value, markerColor: "#f6c23e" }));
                return data_array.reverse();
            })
            .then(data => {
                this.setState({ chartData: data });
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
                response.data.forEach(item => data_arrayy.push({ x: new Date(Date.parse(item.ts)), y: item.value, markerColor: "#f6c23e" }));
                console.log(data_arrayy);
                return data_arrayy;
            })
            .then(data => {
                this.setState({ last: data[0] });
            })
            .then(data => {
                console.log("Last");
                console.log(this.state.last);
                var joined = this.state.chartData;
                joined.push(this.state.last);
                if (joined.length > 43200) {
                    joined.shift();
                }
                
                console.log(joined);
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
                text: "Luminosidade nas últimas 12h",
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
                title: "% de luminosidade",
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
                lineColor: "#f6c23e",
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