import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CardInfo from './CardInfo';
import Alarm from './Alarm';
import Movement from './Movement';

// ALARMES

ReactDOM.render(
  <React.StrictMode>
    <Alarm sensorId="5" type="Chama" />
    <Alarm sensorId="6" type="Inundação" />
  </React.StrictMode>,
  document.getElementById('alarms')
);

// SENSORES COZINHA

ReactDOM.render(
  <React.StrictMode>
    <CardInfo sensorId="3" type="Luminosidade" unit="%" barColor="bg-warning" />
    <CardInfo sensorId="8" type="Temperatura" unit="ºC" barColor="bg-danger" />
    <CardInfo sensorId="7" type="Humidade" unit="%" barColor="" />
  </React.StrictMode>,
  document.getElementById('cozinha_info')
)

ReactDOM.render(
  <React.StrictMode>
    <App sensorId="3" hourRange="12" yAxis="% de Luminosidade" type="Luminosidade" lineColor="#f6c23e"/>
  </React.StrictMode>,
  document.getElementById('cozinha_luminosidade')
);

ReactDOM.render(
  <React.StrictMode>
    <App sensorId="8" hourRange="12" yAxis="Temperatura em ºC" type="Temperatura" lineColor="#e74a3b"/>
  </React.StrictMode>,
  document.getElementById('cozinha_temperatura')
);

ReactDOM.render(
  <React.StrictMode>
    <App sensorId="7" hourRange="12" yAxis="% de Humidade" type="Humidade" lineColor="#4e73df"/>
  </React.StrictMode>,
  document.getElementById('cozinha_humidade')
);

// SENSORES SALA

ReactDOM.render(
  <React.StrictMode>
    <CardInfo sensorId="10" type="Luminosidade" unit="%" barColor="bg-warning" />
    <CardInfo sensorId="1" type="Temperatura" unit="ºC" barColor="bg-danger" />
    <CardInfo sensorId="9" type="Humidade" unit="%" barColor="" />
  </React.StrictMode>,
  document.getElementById('sala_info')
)

ReactDOM.render(
  <React.StrictMode>
    <App sensorId="10" hourRange="12" yAxis="% de Luminosidade" type="Luminosidade" lineColor="#f6c23e"/>
  </React.StrictMode>,
  document.getElementById('sala_luminosidade')
);

ReactDOM.render(
  <React.StrictMode>
    <App sensorId="1" hourRange="12" yAxis="Temperatura em ºC" type="Temperatura" lineColor="#e74a3b"/>
  </React.StrictMode>,
  document.getElementById('sala_temperatura')
);

ReactDOM.render(
  <React.StrictMode>
    <App sensorId="9" hourRange="12" yAxis="% de Humidade" type="Humidade" lineColor="#4e73df"/>
  </React.StrictMode>,
  document.getElementById('sala_humidade')
);

// SENSOR DE MOVIMENTO 1

ReactDOM.render(
  <React.StrictMode>
    <Movement sensorId="4" numValues="4"/>
  </React.StrictMode>,
  document.getElementById('movement')
);