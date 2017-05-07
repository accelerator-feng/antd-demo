import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import './css/pc.css';
import './css/mobile.css';
import Header from './components/header';
import Footer from './components/footer';

export default class Index extends React.Component {
    render() {
        return (
            <div>
             <Header/>
             <Footer/>
            </div>
        );
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
);




