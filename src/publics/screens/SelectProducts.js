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
import { Button } from 'react-native-elements';

import styles from '../../products/stylesProducts';
import { getProduct } from '../../products/actionProducts';
import ItemSelectProduct from '../components/ItemSelectProduct';
import renderComponentAfterInteraction from '../components/renderComponentAfterInteraction';

type Props = {};
class SelectProducts extends Component<Props> {

  constructor(props) {
    super(props);
    this.handleSelectProducts = props.navigation.getParam('handleSelectProducts');
    this.selectedProducts = props.navigation.getParam('selectedProducts');
    this.selectedProductsObj = Object.assign({}, ...this.selectedProducts.map(item => ({ [item._id]: item })));
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
      routeName: 'CreateProductSelect'
    });
  }

  handleToggle = (item) => {
    if (item.switched) {
      this.selectedProducts.push(item);
    } else {
      this.selectedProducts = this.selectedProducts.filter(product => product._id !== item._id);
    }
  }

  handleSubmit = () => {
    this.handleSelectProducts(this.selectedProducts);
    this.props.navigation.dispatch({
      type: 'Navigation/BACK'
    });
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item, index }) => <ItemSelectProduct handleToggle={this.handleToggle} item={item} index={index} />

  render() {
    const { isLoading } = this.props.products;
    let { data } = this.props.products;
    data = data.map((product) => {
      if (this.selectedProductsObj[product._id]) {
        return { ...product, switched: true };
      }
      return product;
    });
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={this.getData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListFooterComponent={<View style={styles.containerFooter} />}
        />
        <View style={styles.containerButtonSubmit}>
          <Button
            reised
            title="SAVE"
            backgroundColor="#666"
            color="#fffefe"
            disabled={isLoading}
            loading={isLoading}
            containerViewStyle={styles.buttonSubmit}
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(SelectProducts));

SelectProducts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

