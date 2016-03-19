
import React, { Component } from 'react';


import Header from './Header.jsx';

export default class SeeEvent extends Component {
  render() {
    return (
      <div>
          <Header />
          <div class="jumbotron">
            <h1>ElectronApp</h1>
            <ul class="list-group">
              <li class="list-group-item">No Upcoming Events</li>
            </ul>
          </div>
      </div>
    );
  }
}
