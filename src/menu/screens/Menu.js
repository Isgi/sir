/**
 * Sample React Native Menu
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from '../stylesMenu';
import ItemGrid from '../components/ItemGrid';
import { getProduct } from '../../products/actionProducts';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';

type Props = {};
class Menu extends Component<Props> {

  constructor() {
    super();
    this.state = {
      flatList: {
        selected: (new Map(): Map<string, boolean>)
      }
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.dispatch(getProduct());
  }

  _renderItem = ({ item }) => <ItemGrid item={item} />;

  _keyExtractor = (item, index) => item.name;

  render() {
    const { data, isLoading } = this.props.products;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          numColumns={3}
          refreshing={isLoading}
          onRefresh={this.getData}
          extraData={this.state.flatList}
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

export default renderComponentAfterInteraction(connect(mapStateToProps)(Menu));

Menu.propTypes = {
  products: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

