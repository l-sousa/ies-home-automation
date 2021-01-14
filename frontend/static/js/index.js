'use strict';
<h1 class="h3 mb-0 text-gray-800">Casa do Dinis</h1>
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

const user_sensors_array = [];
const user_sensors = {};
const user_info = [];

var config = {
    method: 'get',
    url: 'http://35.246.39.11:8080/api/user/' + getCookie('access_token')
};
axios(config)
    .then(response => {
        ReactDOM.render(
            React.createElement('h1', { className: 'h3 mb-0 text-gray-800' }, "Casa de " + response.data.nome),
            document.getElementById('casa_de')
        );
        ReactDOM.render(
            React.createElement('h4', { className: 'user_settings', inline: "text" }, response.data.nome),
            document.getElementById('user_name')
        );
    })
    .catch(function (error) {
        console.log(error);
    });

var config = {
    method: 'get',
    url: 'http://35.246.39.11:8080/api/user/' + getCookie('access_token') + '/sensors'
};
axios(config)
    .then(response => {
        console.log('http://spring:8080/api/user/' + getCookie('access_token') + '/sensors')
        response.data.forEach(item => user_sensors_array.push({ id: item.id, type: item.type, room: item.room }));
        return user_sensors_array;
    })
    .then(data => {
        console.log(user_sensors_array)
        for (var divisao_index in user_sensors_array) {
            var divisao = user_sensors_array[divisao_index]
            if (divisao.room in user_sensors) {
                user_sensors[divisao.room][divisao.type] = divisao.id
            } else {
                user_sensors[divisao.room] = {}
                user_sensors[divisao.room][divisao.type] = divisao.id
            }
        }
    })
    .then(data => {
        for (var di in user_sensors) {
            let main_div = document.getElementById("cards_list")
            console.log(di);

            var movementElement = React.createElement('div', null);
            var temperatureElement = React.createElement('div', null);
            var luminosidadeElement = React.createElement('div', null);
            var humidadeElement = React.createElement('div', null);

            var luminosidadeGraph = React.createElement('div', null);
            var temperatureGraph = React.createElement('div', null);
            var humidadeGraph = React.createElement('div', null);

            var active = ""
            var collapse = ""

            var cardNeeded = false;

            if (user_sensors[di].NivelAgua != undefined) {
                let main_div_alarms = document.getElementById("alarms")
                let d_id = Math.random()
                let d = document.createElement("div")
                d.id = d_id
                main_div_alarms.appendChild(d);
                ReactDOM.render(
                    React.createElement(Alarm, { sensorId: String(user_sensors[di].NivelAgua), type: 'Inundação', icon: ' fa-tint' }),
                    document.getElementById(d_id)
                );
            }

            if (user_sensors[di].Chama != undefined) {
                let main_div_alarms = document.getElementById("alarms")
                let d_id = Math.random()
                let d = document.createElement("div")
                d.id = d_id
                main_div_alarms.appendChild(d);
                ReactDOM.render(
                    React.createElement(Alarm, { sensorId: String(user_sensors[di].Chama), type: 'Chama', icon: ' fa-fire' }),
                    document.getElementById(d_id)
                );
            }

            if (user_sensors[di].Movimento != undefined) {
                movementElement = React.createElement('div', null,
                    React.createElement('h3', { className: 'medium font-weight-bold' }, "Registo de movimentos"),
                    React.createElement(Movement, { sensorId: String(user_sensors[di].Movimento), numValues: '4' })
                )
                main_div = document.getElementById("cards_list_mov");
                cardNeeded = true
            }

            if (user_sensors[di].Luminosidade != undefined) {
                luminosidadeElement = React.createElement(CardInfo, { sensorId: String(user_sensors[di].Luminosidade), type: 'Luminosidade', unit: '%', barColor: 'bg-warning', hourRange: '1' });
                var this_active = "";
                if (active == "") {
                    this_active = " active"
                    active = "active"
                }
                luminosidadeGraph = React.createElement('div', { className: 'carousel-item' + this_active },
                    React.createElement(App, { sensorId: String(user_sensors[di].Luminosidade), hourRange: '12', yAxis: '% de Luminosidade', type: 'Luminosidade', lineColor: '#f6c23e' })
                );

                collapse = "collapse";
                cardNeeded = true;
            }

            if (user_sensors[di].Temperatura != undefined) {
                temperatureElement = React.createElement(CardInfo, { sensorId: String(user_sensors[di].Temperatura), type: 'Temperatura', unit: 'ºC', barColor: 'bg-danger', hourRange: '1' })
                var this_active = "";
                if (active == "") {
                    this_active = " active"
                    active = "active"
                }
                temperatureGraph = React.createElement('div', { className: 'carousel-item' + this_active },
                    React.createElement(App, { sensorId: String(user_sensors[di].Temperatura), hourRange: '12', yAxis: 'Temperatura em ºC', type: 'Temperatura', lineColor: '#e74a3b' }),
                );

                collapse = "collapse";
                cardNeeded = true;
            }

            if (user_sensors[di].Humidade != undefined) {
                humidadeElement = React.createElement(CardInfo, { sensorId: String(user_sensors[di].Humidade), type: 'Humidade', unit: '%', barColor: '', hourRange: '1' })
                var this_active = "";
                if (active == "") {
                    this_active = " active"
                    active = "active"
                }
                humidadeGraph = React.createElement('div', { className: 'carousel-item' + this_active },
                    React.createElement(App, { sensorId: String(user_sensors[di].Humidade), hourRange: '12', yAxis: '% de Humidade', type: 'Humidade', lineColor: '#4e73df' }),
                );

                collapse = "collapse";
                cardNeeded = true;
            }

            var d_id = Math.random()
            var d = document.createElement("div")
            d.id = d_id
            main_div.appendChild(d);

            if (cardNeeded) {
                ReactDOM.render(
                    React.createElement('div', null,
                        React.createElement('div', { className: 'd-sm-flex align-items-center justify-content-between mb-4', style: { marginTop: '10px' } },
                            React.createElement('h1', { className: 'h3 mb-0 text-gray-800' },
                                di
                            )
                        ),
                        React.createElement('div', { className: 'row' },
                            React.createElement('div', { className: 'col-lg-12 mb-8' },
                                React.createElement('div', { className: 'card shadow', style: { backgroundImage: "url('/img/" + di + ".jpg')" }, 'aria-expanded': 'false', 'aria-controls': 'collapseOne' },
                                    React.createElement('div', { className: 'card-body division_card_out' },
                                        React.createElement('div', { className: 'row division_row' },
                                            React.createElement('div', { className: 'col collapsed', style: { display: 'flex', justifyContent: 'center' }, 'data-toggle': collapse, 'data-target': '#' + collapse + di, 'aria-expanded': 'false' }),
                                            React.createElement('div', { className: 'col division_card_upper' },
                                                React.createElement('div', { id: di + '_info', className: 'card-body division_card_info_right' },
                                                    temperatureElement,
                                                    luminosidadeElement,
                                                    humidadeElement,
                                                    movementElement
                                                )
                                            )
                                        ),
                                        React.createElement('div', { className: 'row', style: { marginLeft: 0, marginRight: 0 } },
                                            React.createElement('div', { id: 'collapse' + di, className: 'collapse_division collapse' },
                                                React.createElement('hr', null),
                                                React.createElement('div', { className: 'row', style: { justifyContent: 'center' } },
                                                    React.createElement('div', { className: 'card-body' },
                                                        React.createElement('div', { id: 'carouselExampleControls' + di, className: 'carousel slide', 'data-ride': 'carousel' },
                                                            React.createElement('div', { className: 'carousel-inner' },
                                                                temperatureGraph,
                                                                luminosidadeGraph,
                                                                humidadeGraph
                                                            )
                                                        ),
                                                        React.createElement('a', { className: 'carousel-control-prev', href: '#carouselExampleControls' + di, role: 'button', 'data-slide': 'prev' },
                                                            React.createElement('span', { className: 'carousel-control-prev-icon', 'aria-hidden': 'true' }),
                                                            React.createElement('span', { className: 'sr-only' },
                                                                "Previous"
                                                            )
                                                        ),
                                                        React.createElement('a', { className: 'carousel-control-next', href: '#carouselExampleControls' + di, role: 'button', 'data-slide': 'prev' },
                                                            React.createElement('span', { className: 'carousel-control-next-icon', 'aria-hidden': 'true' }),
                                                            React.createElement('span', { className: 'sr-only' },
                                                                "Next"
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    document.getElementById(d_id)
                )
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });


