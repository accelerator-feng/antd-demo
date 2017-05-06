import React from 'react';
import MoblieHeader from './mobileHeader';
import MoblieFooter from './mobileFooter';


export default class MoblieIndex extends React.Component {
  render() {
    return (
      <div>
        <MoblieHeader>ReactNews</MoblieHeader>
        <MoblieFooter/>
      </div>
    );
  }
}
