'use strict';

function getCookie(name) {
    return (
        decodeURIComponent(
            document.cookie.replace(
                new RegExp(
                    "(?:(?:^|.*;)\\s*" +
                        encodeURIComponent(name).replace(
                            /[\-\.\+\*]/g,
                            "\\$&"
                        ) +
                        "\\s*\\=\\s*([^;]*).*$)|^.*$"
                ),
                "$1"
            )
        ) || null
    );
}

var updateInterval = 5000;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            last: null
        }
        this.updateChart = this.updateChart.bind(this);
    }

    componentDidMount() {

        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/user/' + getCookie('access_token') + '/values/' + this.props.sensorId + '/period/' + this.props.hourRange
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

        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/user/' + getCookie('access_token') + '/values/' + this.props.sensorId + '/last/1'
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
            React.createElement('div', null,
                React.createElement(CanvasJSChart, {options : options})
            )
        );
    }
}