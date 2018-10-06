import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import styles from '../stylesSetup';
import labelAvatar from '../../publics/utils/labelAvatar';
import randomColorStr from '../../publics/utils/randomColorStr';
import { createSetting } from '../../settings/actionSettings';

class ItemOperatorSetup extends Component {

  navigateToCreateOperatorSetup = () => {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'CreateOperatorSetup'
    });
  }

  handleConfirmSelect = () => {
    Alert.alert(
      `Select ${this.props.item.name}`,
      `Are you sure you want to select ${this.props.item.name} operator?`,
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'OK', onPress: this.handleSelect }
      ],
      { cancelable: false }
    );
  }

  handleSelect = () => {
    this.props.dispatch(createSetting({ operator: this.props.item }));
    this.props.dispatch({
      type: 'Navigation/RESET',
      key: 'AuthorizedStack',
      index: 0,
      actions: [{
        type: 'Navigation/NAVIGATE',
        routeName: 'MainDrawer'
      }]
    });
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        onPress={item ? this.handleConfirmSelect : this.navigateToCreateOperatorSetup}
        style={[
          styles.itemGrid,
          { backgroundColor: item ? `#${randomColorStr(item.name)}` : '#bebebe' }
        ]}
      >
        {item
          ? [
            <Text key="avatar" style={styles.textAvatar}>{labelAvatar(item.name)}</Text>,
            <View key="info" style={styles.infoProduct}>
              <Text ellipsizeMode="middle" numberOfLines={1} style={styles.textName}>{item.name}</Text>
            </View>
          ]
          : <Icon name="add" iconStyle={styles.iconAdd} />}
      </TouchableOpacity>
    );
  }
}

ItemOperatorSetup.propTypes = {
  item: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ItemOperatorSetup);
