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

class CardInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { last: null }
        this.updateValues = this.updateValues.bind(this);
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
        setInterval(this.updateValues, updateInterval);
    }

    updateValues() {

        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/user/' + getCookie('access_token') + '/values/' + this.props.sensorId + '/last/1'
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
        var e_class = "progress-bar " + this.props.barColor;
        return React.createElement('div', null,
                React.createElement('h4', {className : 'small font-weight-bold'}, this.props.type,
                    React.createElement('span', {className: 'float-right'}, this.state.last + this.props.unit)
                ),
                React.createElement('div', {className : 'progress mb-4'},
                    React.createElement('div', {className : e_class, role : 'progressbar', style : {width : + this.state.last + '%'}})
                )
               )
    }
}