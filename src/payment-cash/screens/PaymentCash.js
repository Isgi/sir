/**
 * Sample React Native PaymentCash
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInputMask } from 'react-native-masked-text';

import styles from '../stylePaymentCash';
import NumPad from '../components/NumPad';
import { createTransaction } from '../../transactions/actionTransactions';

let IndicatorHeaderRight = props => (
  <View style={styles.iconNavigator}>
    <ActivityIndicator
      size="large"
      color="#666"
      animating={props.createPending}
    />
  </View>
);

IndicatorHeaderRight = connect(state => ({
  createPending: state.transactions.createPending
}))(IndicatorHeaderRight);

IndicatorHeaderRight.propTypes = {
  createPending: PropTypes.bool
};

IndicatorHeaderRight.defaultProps = {
  createPending: false
};

class PaymentCash extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.totalChargeOrders.toString(),
    headerRight: <IndicatorHeaderRight />
  })

  constructor(props) {
    super(props);
    this.state = {
      price: '0'
    };
    this.windowWidth = Dimensions.get('window').width;
    this.totalChargeOrders = props.navigation.state.params.totalChargeOrders;
  }

  onChangeNum = value => () => {
    let price = '0';
    if (this.state.price === '0' || value.index === 0 || value.index === 1 || value.index === 2) {
      price = value.item;
    } else if (value.index !== 12 || value.index !== 14) { // C button and Done button
      price = this.state.price + value.item;
    }
    if (value.index === 12) { // C button
      price = '0';
    }
    if (value.index === 14) {
      if (Number(this.state.price) < this.totalChargeOrders) {
        Alert.alert(
          'Oops',
          'Not enough cash',
          [{
            text: 'OK', style: 'cancel'
          }]
        );
      } else {
        this.handleSubmit();
      }
      return;
    }
    this.setState({ price });
  }

  getFastPrices(totalChargeOrders) {
    const availableCounts = [2000, 5000, 10000, 20000, 50000, 100000];
    const total = Number(totalChargeOrders);
    const paymentButtonCounts = [];
    const buttons = this.fastPrices(total, paymentButtonCounts, availableCounts);
    const dups = [];
    const arr = buttons.filter((el) => {
      if (dups.indexOf(el) === -1) {
        dups.push(el);
        return true;
      }
      return false;
    });
    return arr.sort((a, b) => a - b).slice(0, 3);
  }

  fastPrices(total, paymentButtonCounts, availableCounts) {
    const paymentButton = paymentButtonCounts;
    availableCounts.forEach((count, index) => {
      if (count > total) {
        paymentButton.push(count);
      } else if (count === total) {
        paymentButton[index] = count;
      }
    });
    if (paymentButton.length <= 3) {
      const acs = availableCounts.map(ac => ac + 50000);
      this.fastPrices(total, paymentButton, acs.length > 3 ? acs.slice(3, 6) : acs);
    }
    return paymentButton;
  }

  handleSubmit = () => {
    let { transactionsOnProgress } = this.props;
    transactionsOnProgress = {
      ...transactionsOnProgress,
      cashReceived: this.state.price
    };
    return this.props.dispatch(createTransaction(transactionsOnProgress))
      .then((res) => {
        const { totalGross, cashReceived } = res.value.data;
        this.props.navigation.dispatch({
          type: 'Navigation/NAVIGATE',
          routeName: 'PaymentDone',
          params: {
            change: cashReceived - totalGross
          }
        });
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerInputPrice}>
          <View>
            <Text>Enter cash received</Text>
            <TextInputMask
              editable={false}
              style={[styles.inputPrice, { width: this.windowWidth - 40 }]}
              type="money"
              value={this.state.price}
              options={{
                unit: 'Rp',
                precision: 0,
                delimiter: '.'
              }}
            />
          </View>
        </View>
        <View>
          <NumPad
            fastPrice={this.getFastPrices(this.totalChargeOrders)}
            onChangeNum={this.onChangeNum}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  transactionsOnProgress: state.transactions.data.filter(transaction => transaction.isProgress)[0]
});

export default connect(mapStateToProps)(PaymentCash);

PaymentCash.propTypes = {
  navigation: PropTypes.object.isRequired,
  transactionsOnProgress: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};
