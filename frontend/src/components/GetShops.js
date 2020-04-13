import React from 'react';
import axios from 'axios';

class GetShops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
    };
    this.showShops = this.showUsers.bind(this);
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

  showShops() {
    if (this.state.shops.length > 0) {
      return `
      <table>
        <tr>
          <td>Name: ${this.state.shops[0].name}</td>
          <td>Address: ${this.state.shops[0].address1}</td>
          <td>Zip: ${this.state.shops[0].zipcode}</td>
          <td>City: ${this.state.shops[0].city}</td>
          <td>State: ${this.state.shops[0].state}</td>
        </tr>
      </table>
      `;
    }
  }

  render() {
    return (
      <div>
        <p>{this.showShops()}</p>
      </div>
    );
  }
}

export default GetShops;
