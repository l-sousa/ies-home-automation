import React, { Component } from 'react';
import './App.css';

var updateInterval = 5000;

class CardInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { last: null }
        this.updateValues = this.updateValues.bind(this);
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
        setInterval(this.updateValues, updateInterval);
    }

    updateValues() {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: '/api/user/2/values/' + this.props.sensorId + '/last/1'
        };

        axios(config)
            .then(response => {
                response.data.forEach(item => this.setState({ last: item.value }));
            })
            .then(data => {
                this.render();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        var e_width = "width: " + this.props.last + "%";
        var e_class = "progress-bar " + this.props.barColor;
        return (
            <div>
                <h4 class="small font-weight-bold">{this.props.type}.<span class="float-right">{this.state.last}{this.props.unit}</span>
                </h4>
                <div class="progress mb-4">
                    <div class={e_class} role="progressbar" style={{width : this.state.last + '%'}} aria-valuenow="20" aria-valuemin="5" aria-valuemax="40"></div>
                </div>
            </div>
        );
    }
}


export default CardInfo;