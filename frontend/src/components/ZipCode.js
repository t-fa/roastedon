import React from 'react';

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

export default ZipCode;