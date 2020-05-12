import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

import Shops from '../components/Shops/Shops';

class ShopsContainer extends Component {
  // state = {
  //   shops: [],
  // };

  // componentDidMount() {
  //   axios
  //     .get(`${url}shops?zipcode=${this.props.zipcode}`)
  //     .then((response) => {
  //       this.setState({ shops: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  componentDidMount() {
    this.props.onAddedShops(this.props.zipcode);
    console.log(`Zip: ${this.props.zipcode}`);
    console.log(`Shops: ${this.props.shops}`);
  }

  render() {
    return <Shops shops={this.props.shops} />;
  }
}

const mapStateToProps = (state) => {
  return {
    shops: state.shops,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddedShops: (zipcode) => dispatch(actionTypes.addShops(zipcode)),
    onClearShops: () => dispatch({ type: actionTypes.CLEAR_SHOPS }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopsContainer);
