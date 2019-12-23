import React, { Component } from 'react';

class Cuisine extends Component {
  render() {
    let cuisineList = this.props.cuisines.map((cuisine, index) => {
      return (
        <option value={cuisine.cuisine.cuisine_id} key={index}>{cuisine.cuisine.cuisine_name}</option>
      )
    });

    return (
      <div>
        <b>cuisines</b>
        <select name="cuisine" onChange={this.props.handleOnChange}>
          <option value="" key="n"></option>
          {cuisineList}
        </select>

      </div>
    );
  }
}

export default Cuisine;
