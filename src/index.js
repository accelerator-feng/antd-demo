import React from 'react';
import ReactDOM from 'react-dom';
/*
import { Router, Route, hashHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import './css/pc.css';
import PCIndex from './components/pcIndex';


export default class Index extends React.Component {
  render() {
    return (
      <div>
      <MediaQuery query='(min-device-width:1224px)'>
          <PCIndex/>
      </MediaQuery>
      <MediaQuery query='(max-device-width:1224px)'>
          <PCIndex/>
      </MediaQuery>
      </div>
    );
  }
}


ReactDOM.render(
  <Index/>,
  document.getElementById('root')
);
*/
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />

      </fieldset>
    );
  }
}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);


