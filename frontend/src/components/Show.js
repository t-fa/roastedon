import React from 'react';
import axios from 'axios';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.showUsers = this.showUsers.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/users')
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showUsers() {
    if (this.state.users.length > 0) {
      return `
      Username: ${this.state.users[0].username}
      Password: ${this.state.users[0].password}
      Email: ${this.state.users[0].email}
      `;
    }
  }

  render() {
    return (
      <div>
        <p>{this.showUsers()}</p>
      </div>
    );
  }
}

export default Show;
