import React from 'react';
import axios from 'axios';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get('/')
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return <p>{this.state.users}</p>;
  }
}

export default Show;
