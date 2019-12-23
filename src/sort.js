import React, { Component } from 'react';

class Sort extends Component {
  render() {
    return (
      <div>
        <b>Sort by rating</b>
        <select name="order" onChange={this.props.handleOnSortChange}>
          <option value=""></option>
          <option value="asc">low-high</option>
          <option value="desc">high-low</option>
        </select>
      </div>
    );
  }
}

export default Sort;
