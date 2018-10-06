import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import { createOrders, deleteOrders } from '../../transactions/actionTransactions';

class ItemSelected extends Component {

  getTotalPrice = () => {
    const { modifiers, price, qty } = this.props.item;
    let totalModifiers = 0;
    modifiers.forEach((modifier) => {
      totalModifiers += modifier.price;
    });
    const total = (price + totalModifiers) * qty;
    return total;
  }

  handleEdit = () => {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'GeneralStack',
      action: {
        type: 'Navigation/NAVIGATE',
        routeName: 'DetailMenu',
        params: {
          itemEdit: this.props.item,
          item: this.props.productOrder
        }
      }
    });
  }

  handlePressItem = () => {
    // remake item follow model item in the menu page
    const item = {
      ...this.props.item,
      qty: 1,
      _id: this.props.item.productId
    };
    this.props.dispatch(createOrders(item));
  }

  handlePressDeleteItem = () => {
    this.props.dispatch(deleteOrders(this.props.item._id));
  }

  render() {
    const {
      name, price, qty, modifiers
    } = this.props.item;
    return (
      <ListItem
        title={`${name}: Rp${price}`}
        subtitle={`${modifiers.map((modifier, index) => (index === modifiers.length - 1
          ? `+ ${modifier.name}: Rp${modifier.price}`
          : `+ ${modifier.name}: Rp${modifier.price}\n`))}`.replace(',', '')}
        onPress={this.handlePressItem}
        onLongPress={this.handleEdit}
        onPressRightIcon={this.handlePressDeleteItem}
        subtitleNumberOfLines={modifiers.length}
        titleNumberOfLines={2}
        rightTitle={`x${qty}\t\t\t${this.getTotalPrice()}`}
        rightTitleStyle={{
          fontSize: 14,
          color: '#666',
          fontWeight: 'bold',
          textAlign: 'justify'
        }}
        rightIcon={{
          name: 'indeterminate-check-box',
          color: '#666',
          style: {
            fontSize: 40
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  productOrder: state.products.data.filter(product => product._id === ownProps.item.productId)[0]
});

export default connect(mapStateToProps)(ItemSelected);

ItemSelected.propTypes = {
  item: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  productOrder: PropTypes.object.isRequired
};
