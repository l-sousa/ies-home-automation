import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import './App.css';

class App extends Component {

    get_last_data() {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: '/api/values/1/last/1'
        };

        axios(config)
            .then(function(response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    render() {
        return ( <
            Line data = {
                {
                    datasets: [{
                        data: this.get_last_data(),
                        label: 'Dataset 1',
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        lineTension: 0,
                        borderDash: [8, 4]
                    }, {
                        data: [],
                        label: 'Dataset 2',
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)'
                    }]
                }
            }
            options = {
                {
                    scales: {
                        xAxes: [{
                            type: 'realtime',
                            realtime: {
                                onRefresh: function(chart) {
                                    chart.data.datasets.forEach(function(dataset) {
                                        dataset.data.push({
                                            x: Date.now(),
                                            y: Math.random()
                                        });
                                    });
                                },
                                delay: 5000,
                                frameRate: 60,
                                duration: 43200000
                            }
                        }]
                    }
                }
            }
            />
        );
    }
}


export default App;