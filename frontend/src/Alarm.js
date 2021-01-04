import React, { Component } from "react";
import "./App.css";
var updateInterval = 5000;

class Alarm extends Component {
  constructor(props) {
    super(props);
    this.state = { last: null, color: "bg-success", detection: "Não detetada" };
    this.updateValues = this.updateValues.bind(this);
  }

  componentDidMount() {
    setInterval(this.updateValues, updateInterval);
  }

  updateValues() {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "/api/user/2/values/" + this.props.sensorId + "/last/1",
    };

    axios(config)
      .then((response) => {
        response.data.forEach((item) => this.setState({ last: item.value }));
      })
      .then((data) => {
        if (this.state.last == 1) {
          this.setState({ color: "flame_div" });
          this.setState({ detection: "Detetada!" });
        }
        if (this.state.last == 0) {
          this.setState({ color: "bg-success" });
          this.setState({ detection: "Não detetada" });
        }
        this.render();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  Notification() {}

  render() {
    var e_class = "card text-white shadow side-card " + this.state.color;
    var js;

    if (this.state.last == 1) {
      js = <script type="text/javascript" src="./notification.js"></script>;
    }
    if (this.state.last == 0) {
      js = <p></p>;
    }

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
            {js}
          </div>
        </div>
      </div>
    );
  }
}

export default Alarm;
