import React from 'react';

function App() {
  return (
    <div class="container">
      <Jumbotron />
      <ZipCode />
      <Info />
      <CoffeeShopForm />
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
      zip: '',
    };
    this.getZip = this.getZip.bind(this);
  }

  getZip(event) {
    this.setState({
      zip: event.target.value,
    });
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
            onChange={this.getZip}
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
      <h4>We believe in the freshest coffee</h4>
      <p>
        Ordinary grocery store coffee comes with a "Best By" date, which we
        consider an arbitrary date. Often the "Best By" date is months from when
        the coffee is roasted. Many coffee enthusiasts would consider that
        coffee to have gone bad. While the beans aren't expired in the
        traditional sense, they're past the point where they offer the freshest
        possible flavor. Roasters who us a "Roasted On" date believe in fresh
        coffee. A "Roasted On" date tells you exactly the day the coffee was
        roasted and allows you to enjoy the best possible cup.
      </p>

      <h3>More info</h3>
      <p>Lorem ipsum dolor</p>
    </div>
  );
}

class CoffeeShopForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: '',
      shopAddress: '',
      shopWebsite: '',
    };
  }
  render() {
    return (
      <form>
        <h2>Add a new coffee shop</h2>
        <div class="form-group">
          <label for="inputAddress">Coffee Shop Name</label>
          <input
            type="text"
            class="form-control"
            id=""
            placeholder="Coffee Shop Name"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default App;
