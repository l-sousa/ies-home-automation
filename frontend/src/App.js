import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import './App.css';

class App extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      chartData: []
    }
  }

  componentDidMount() {
      var axios = require('axios');

      var config = {
          method: 'get',
          url: '/api/values/2/period/6'
      };

      axios(config)
          .then( response => {
              const data_array = [];
              response.data.forEach(item => data_array.push({x:Date.parse(item.ts), y:item.value}));
              return data_array;
          })
          .then( data => {
            this.setState({ chartData: data });
            //console.log(data);
          })
          .catch(function(error) {
              console.log(error);
          });
    }
    
    render() {
      const { chartData } = this.state;
      console.log(chartData);
        return ( <
            Line data = {
                {
                    datasets: [{
                        data: [],
                        label: 'Dataset 1',
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        lineTension: 0,
                        borderDash: [8, 4]
                    }, {
                        data: chartData,
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
                                            y: 68
                                        });
                                    });
                                },
                                delay: 5000,
                                frameRate: 60,
                                duration: 21600000
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