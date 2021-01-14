var updateInterval = 5000;

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

class Alarm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { last: null, color: "bg-success", detection : "Não detetada" }
        this.updateValues = this.updateValues.bind(this);
    }

    componentDidMount() {
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
                if (this.state.last == 1) {
                    this.setState({ color: "bg-danger" });
                    this.setState({ detection : "Detetada!" });
                }
                if (this.state.last == 0) {
                    this.setState({ color: "bg-success" });
                    this.setState({ detection : "Não detetada" });
                }
                this.render();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        var e_class = "card text-white shadow side-card " + this.state.color;
        var ee_class = 'fas fa-2x text-gray-300' + this.props.icon;
        return (
            React.createElement('div', null,
                React.createElement('div', {style : {marginTop : 10 + 'px'}, className : e_class},
                    React.createElement('div', {className : 'card-body'},
                        React.createElement('div', {className : 'row'},
                            React.createElement('div',{className : 'col-8'},
                                this.props.type,
                                React.createElement('div', {className : 'text-white-50 small'},
                                    this.state.detection
                                )
                            ),
                            React.createElement('div', {className : 'col-4'},
                                React.createElement('i', {className : ee_class})
                            )
                        )
                    )
                )
            )
        );
    }
}