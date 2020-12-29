import React, { Component } from 'react';
import './App.css';
import useSound from 'use-sound';
import fireAlarm from './sounds/alarm_fire.mp3';
import waterAlarm from './sounds/alarm_water.mp3';
var updateInterval = 5000;

const audioFire = new Audio('./sounds/alarm_fire.mp3');


class Alarm extends Component {

    constructor(props) {
        super(props);
        this.state = { last: null, color: "bg-success", detection : "Não detetada" }
        this.updateValues = this.updateValues.bind(this);
    }

    componentDidMount() {
        audioFire.play();
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
                if (this.state.last == 1) {
                    this.setState({ color: "bg-danger" });
                    this.setState({ detection : "Detetada!" });
                    audioFire.play();
                }
                if (this.state.last == 0) {
                    this.setState({ color: "bg-success" });
                    this.setState({ detection : "Não detetada" });
                    audioFire.play();
                }
                this.render();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        var e_class = "card text-white shadow side-card " + this.state.color;
        return (
            <div>
                 <div style={{ marginTop: 10 + "px" }} class={e_class}>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                {this.props.type}
                                <div class="text-white-50 small">{this.state.detection}</div>
                            </div>
                            <div class="col-4">
                                <i class="fas fa-tint fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Alarm;