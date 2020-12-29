import React, { Component } from 'react';
var dateFormat = require('dateformat');
var updateInterval = 5000;

class Movement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movementData: [],
            last: null
        }
        this.updateMovement = this.updateMovement.bind(this);
    }

    componentDidMount() {

        setInterval(this.updateMovement, updateInterval);
    }

    updateMovement() {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: '/api/user/2/values/' + this.props.sensorId + '/last/' + this.props.numValues
        };

        axios(config)
            .then(response => {
                const data_array = [];
                response.data.forEach(item => data_array.push(dateFormat(new Date(Date.parse(item.ts)),"HH:MM:ss")));
                return data_array;
            })
            .then(data => {
                this.setState({ movementData: data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h3> {this.state.movementData[0]}</h3>
                <h3> {this.state.movementData[1]}</h3>
                <h3> {this.state.movementData[2]}</h3>
                <h3> {this.state.movementData[3]}</h3>
            </div>
        );
    }
}


export default Movement;