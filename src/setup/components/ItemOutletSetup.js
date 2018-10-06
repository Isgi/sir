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

class ItemOutletSetup extends Component {

  navigateToCreateOutletSetup = () => {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'CreateOutletSetup'
    });
  }

  handleConfirmSelect = () => {
    Alert.alert(
      `Select ${this.props.item.name}`,
      `Are you sure you want to select ${this.props.item.name} outlet?`,
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'OK', onPress: this.handleSelect }
      ],
      { cancelable: false }
    );
  }

  handleSelect = () => {
    this.props.dispatch(createSetting({ outlet: this.props.item }));
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'OperatorSetup'
    });
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        onPress={item ? this.handleConfirmSelect : this.navigateToCreateOutletSetup}
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

ItemOutletSetup.propTypes = {
  item: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ItemOutletSetup);
