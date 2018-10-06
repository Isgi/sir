import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { createOrders } from '../../transactions/actionTransactions';
import styles from '../stylesMenu';
import labelAvatar from '../../publics/utils/labelAvatar';
import randomColorStr from '../../publics/utils/randomColorStr';

class ItemGrid extends Component {

  handlePressItem = () => {
    if (this.props.item.modifiers.length > 0) {
      this.navigateToDetailMenu();
    } else {
      this.props.dispatch(createOrders({ ...this.props.item, qty: 1 }));
    }
  }

  navigateToDetailMenu = () => {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'GeneralStack',
      action: {
        type: 'Navigation/NAVIGATE',
        routeName: 'DetailMenu',
        params: {
          item: this.props.item
        }
      }
    });
  }

  render() {
    const { name } = this.props.item;
    return (
      <TouchableOpacity
        onLongPress={this.navigateToDetailMenu}
        onPress={this.handlePressItem}
        style={[
          styles.itemGrid,
          { backgroundColor: `#${randomColorStr(name)}` }
        ]}
      >
        {/* { productOrdered.length > 0 ? (
          <View style={styles.wrapperIconClose}>
            <Icon onPress={this.handlePressDeleteItem} name="delete" iconStyle={styles.iconClose} />
          </View>
        ) : null } */}

        <View style={styles.containerTextAvatar}>
          <Text style={styles.textAvatar}>{labelAvatar(name)}</Text>
        </View>
        <View style={styles.infoProduct}>
          <Text ellipsizeMode="middle" numberOfLines={2} style={styles.textName}>{name}</Text>
          {/* <Text ellipsizeMode="middle" numberOfLines={1} style={styles.textPrice}>{price}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

ItemGrid.propTypes = {
  item: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ItemGrid);
