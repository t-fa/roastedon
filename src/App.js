import React from 'react';
import { render } from 'react-dom';

function App() {
  return (
    <div class="container">
      <Jumbotron />
      <ZipCode />
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
  render() {
    return (
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Zip Code</label>
          <input type="text" class="form-control" id="zipcode" />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default App;
