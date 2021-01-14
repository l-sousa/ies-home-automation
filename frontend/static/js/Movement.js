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

class Movement extends React.Component {

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

        var config = {
            method: 'get',
            url: 'http://35.246.39.11:8080/api/user/' + getCookie('access_token') + '/values/' + this.props.sensorId + '/last/' + this.props.numValues
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
            React.createElement('div', null,
                
                React.createElement('h3', null, 
                    React.createElement('i', {className : 'fas fa-long-arrow-alt-right arrow-movement'}), " ",
                    this.state.movementData[0]
                ),
                React.createElement('h3', null, 
                    React.createElement('i', {className : 'fas fa-long-arrow-alt-right arrow-movement'}), " ",
                    this.state.movementData[1]
                ),
                React.createElement('h3', null, 
                    React.createElement('i', {className : 'fas fa-long-arrow-alt-right arrow-movement'}), " ",
                    this.state.movementData[2]
                ),
                React.createElement('h3', null, 
                    React.createElement('i', {className : 'fas fa-long-arrow-alt-right arrow-movement'}), " ",
                    this.state.movementData[3]
                ),
            )
        );
    }
}
