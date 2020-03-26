import React from 'react';

function App() {
  return (
    <div class="container">
      <Jumbotron />
      <ZipCode />
      <Info />
    </div>
  );
}

function Jumbotron() {
  return (
    <div class="jumbotron">
      <h1>Roasted On</h1>
      <p class="lead">Connecting coffee lovers to premium coffee shops</p>
    </div>
  );
}

class ZipCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: ''
    };
  }
  render() {
    return (
      <form>
        <h2>Find a premium coffee shop near you</h2>
        <div class="form-group">
          <label for="zipcode"></label>
          <input
            placeholder="Zip Code"
            type="text"
            class="form-control"
            id="zipcode"
            value={this.state.zip}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

function Info() {
  return (
    <div>
      <h3>Why Roasted On?</h3>
    </div>
  );
}

export default App;
