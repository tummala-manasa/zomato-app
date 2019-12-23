import React, { Component } from 'react';
import './App.css';
import Location from './location';
import Restraunt from './restraunt';
import Sort from './sort';
import Cuisine from './cuisine';

const apiKey = 'bedcfc9b0d44118b9f60040b473ac650';
class App extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      'restaurants': [],
      'location': {
        'city_id': null,
        'lat': null,
        'lon': 'null',
        'title': null
      },
      'cuisines': [],
      'selectedCuisine': null
    };
  }
  handleInput = (e) => {
    let location = e.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (location) {
        fetch(`https://developers.zomato.com/api/v2.1/locations?query=${location}`, {
          headers: {
            'user-key': apiKey
          }
        })
          .then(response => response.json())
          .then(response => {
            let loc = response.location_suggestions[0] || {};
            let location = {
              city_id: loc.city_id,
              lat: loc.latitude,
              lon: loc.longitude,
              title: loc.title
            };
            this.setState({location}, () => {
              this.getCuisines();
            });
          }
        );
      }
    }, 500);
  }
  getCuisines() {
    let {lon, lat, city_id} =  this.state.location;
    fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${city_id}&lat=${lat}&lon=${lon}`, {
      headers: {
        'user-key': apiKey
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({'cuisines': response.cuisines});
    })
  }
  handleOnChange = (e) => {
    let cuisine_id = e.target.value;
    this.setState({'selectedCuisine': cuisine_id});
    let {lon, lat, city_id} =  this.state.location;
    fetch(`https://developers.zomato.com/api/v2.1/search?&entity_type=city&start=0&count=10&entity_id=${city_id}&lat=${lat}&lon=${lon}&cuisines=${cuisine_id}`, {
      headers: {
        'user-key': apiKey
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({restaurants: response.restaurants});
    })
  }
  handleOnSortChange = (e) => {
    let sortOrder = e.target.value;
    let {lon, lat, city_id} =  this.state.location;
    let cuisine_id = this.state.selectedCuisine;
    if (sortOrder) {
      fetch(`https://developers.zomato.com/api/v2.1/search?&entity_type=city&start=0&count=10&sort=rating&order=${sortOrder}&entity_id=${city_id}&lat=${lat}&lon=${lon}&cuisines=${cuisine_id}`, {
        headers: {
          'user-key': apiKey
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({restaurants: response.restaurants});
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Location location={this.state.location} handleInput={this.handleInput}/>
        <Cuisine handleOnChange={this.handleOnChange} cuisines={this.state.cuisines}/>
        <Sort handleOnSortChange={this.handleOnSortChange}/>
        <Restraunt restaurants={this.state.restaurants}/>
      </div>

    );
  }
}

export default App;
