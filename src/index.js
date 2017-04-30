import React from 'react';
import ReactDOM from 'react-dom';
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
