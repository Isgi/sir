/**
 * Sample React Native Selected
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import styles from '../stylesSelected';
import ItemSelected from '../components/ItemSelected';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';

const HeaderList = (props) => {

  const navigateToPaymentCash = ({ navigation, totalChargeOrders }) => () => {
    if (totalChargeOrders === 0) {
      Alert.alert(
        'Oops',
        'No menu selected',
        [{
          text: 'OK', onPress: () => navigation.dispatch({ type: 'Navigation/BACK' })
        }]
      );
    } else {
      navigation.dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'PaymentCash',
        params: {
          totalChargeOrders
        }
      });
    }
  };

  return (
    <Button
      title={`Charge ${props.totalChargeOrders}`}
      backgroundColor="#666"
      color="#fffefe"
      containerViewStyle={styles.buttonSubmit}
      onPress={navigateToPaymentCash(props)}
    />
  );
};

HeaderList.propTypes = {
  totalChargeOrders: PropTypes.number.isRequired
};

class Selected extends Component {

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item, index }) => <ItemSelected item={item} index={index} />

  removeDuplicates = (arr, prop) => {
    const obj = {};
    return Object.keys(arr.reduce((prev, next) => {
      if (!obj[next[prop]]) obj[next[prop]] = next;
      return obj;
    }, obj)).map(i => obj[i]);
  }

  sortList = (arr) => {
    return arr.sort((a, z) => {
      let forA = a;
      let forZ = z;
      forA = { ...a, name: a.name.toUpperCase() };
      forZ = { ...z, name: z.name.toUpperCase() };
      return forA.name > forZ.name;
    });
  }

  render() {
    let data = [];
    let totalChargeOrders = 0;
    if (this.props.transactionsOnProgress) {
      data = this.props.transactionsOnProgress.orders;
      data.forEach((order) => {
        let total = order.price;
        order.modifiers.forEach((modifier) => {
          total += modifier.price;
        });
        total *= order.qty;
        totalChargeOrders += total;
      });
    }
    data = this.sortList(data);
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          ListHeaderComponent={<HeaderList totalChargeOrders={totalChargeOrders} navigation={this.props.navigation} />}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  transactionsOnProgress: state.transactions.data.filter(transaction => transaction.isProgress)[0]
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(Selected));

Selected.propTypes = {
  transactionsOnProgress: PropTypes.object,
  navigation: PropTypes.object.isRequired
};

