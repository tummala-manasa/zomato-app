import React, { Component } from 'react';

class Restraunt extends Component {

  render() {
    let restaurants = this.props.restaurants.map((restaurant) => {
      return (
        <div key={restaurant.restaurant.id} style={{'border': '1px solid'}}>
          <span>{restaurant.restaurant.name}</span>
          <p>{restaurant.restaurant.user_rating.aggregate_rating}</p>
        </div>
      );
    });
    return (
        <div>
          results:
          {restaurants}
        </div>

    );
  }
}

export default Restraunt;
