/**
 * Sample React Native Settings
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import styles from '../stylesSettings';

export default class Settings extends Component {

  navigateToSettingPrinter = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'SettingPrinter'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <ListItem
            title="Printer"
            onPress={this.navigateToSettingPrinter}
            leftIcon={{
              name: 'print'
            }}
          />
        </List>
      </View>
    );
  }
}

Settings.propTypes = {
  navigation: PropTypes.object.isRequired
};

