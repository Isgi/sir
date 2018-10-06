/**
 * Sample React Native Products
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../stylesProducts';
import { getProduct } from '../actionProducts';
import ItemProduct from '../components/ItemProduct';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';

type Props = {};
class Products extends Component<Props> {

  constructor(props) {
    super(props);
    props.navigation.setParams({ handleCreate: this.navigateToCreateProduct });
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.dispatch(getProduct());
  }

  navigateToCreateProduct = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'CreateProduct'
    });
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item, index }) => <ItemProduct item={item} index={index} />

  render() {
    const { data, isLoading } = this.props.products;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={this.getData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(Products));

Products.propTypes = {
  dispatch: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

