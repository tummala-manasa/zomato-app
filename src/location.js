import React, { Component } from 'react';

class Location extends Component {
  render() {
    return (
        <div>
          <b>Location</b>: <input onChange={this.props.handleInput}/>
          <i>{this.props.location.title}</i>
        </div>

    );
  }
}

export default Location;
