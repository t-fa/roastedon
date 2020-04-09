import React from 'react';
import axios from 'axios';

class ZipCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      shops: [],
    };
    this.getZip = this.getZip.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/shops')
      .then((response) => {
        this.setState({ shops: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getZip(event) {
    this.setState({
      zip: event.target.value,
    });
  }

  onSubmit() {
    axios
      .post('http://localhost:3001/shops')
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <form>
        <h2>Find a premium coffee shop near you</h2>
        <div className="form-group">
          <label htmlFor="zipcode"></label>
          <input
            placeholder="Zip Code"
            type="text"
            className="form-control"
            id="zipcode"
            name="zipcode"
            value={this.state.zip}
            onChange={this.getZip}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default ZipCode;
