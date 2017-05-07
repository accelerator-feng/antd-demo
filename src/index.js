import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, hashHistory } from 'react-router';
//import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import './css/pc.css';
import './css/mobile.css';
import Header from './components/header';
import PCNews from './components/PCNews';
import Footer from './components/footer';

export default class Index extends React.Component {
    render() {
        return (
            <div>
             <Header/>
             <PCNews/>
             <Footer/>
            </div>
        );
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
);




