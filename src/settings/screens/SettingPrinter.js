/**
 * Sample React Native Settings
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';

import styles from '../stylesSettings';
import ItemSettingPrinter from '../components/ItemSettingPrinter';

let TestPrinter = ({ settings }) => {

  const handlePrint = () => () => {
    const packet = new Buffer('--------------sirKes--------------\n-----------TEST PRINTER-----------\n\n\n\n');
    BluetoothSerial.write(packet)
    .then((res) => {
      // success print
    })
    .catch((err) => {
      alert(err.message);
    });
  };

  return settings.printer && settings.printer.id
    ? <Button onPress={handlePrint()} title="Test Printer" transparent color="#666" />
    : null;
};

TestPrinter = connect(state => ({
  settings: state.settings
}))(TestPrinter);

TestPrinter.propTypes = {
  settings: PropTypes.object.isRequired
};

export default class SettingPrinter extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerRight: <TestPrinter />
  })

  constructor() {
    super();
    this.state = {
      bluetoothEnable: false,
      searchingDevice: false,
      devices: []
    };
  }

  componentDidMount() {
    this.discovering();
    BluetoothSerial.on('bluetoothEnabled', this.handleBluetoothEnable);
    BluetoothSerial.on('bluetoothDisabled', this.handleBluetoothDisable);
  }

  handleBluetoothEnable = () => {
    this.setState({ bluetoothEnable: true });
  }

  handleBluetoothDisable = () => {
    this.setState({ bluetoothEnable: false });
  }

  navigateToSettingPrinter = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'SettingPrinter'
    });
  }

  discovering = () => {
    this.setState({ searchingDevice: true });
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      this.setState({ searchingDevice: false });
      const [isEnabled, devices] = values;
      this.setState({ bluetoothEnable: isEnabled, devices });
    });
  }

  linkToSettings = () => {

  }

  handleTurnOnBluetooth = () => {
    BluetoothSerial.requestEnable()
    .then((res) => {
      if (res) {
        BluetoothSerial.discoverUnpairedDevices()
        .then(unpairedDevices => {
          console.log(unpairedDevices)
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={styles.container}>
        { !this.state.bluetoothEnable
          ? (
            <View style={styles.containerEmptyPrinter}>
              <Icon
                name="bluetooth-disabled"
                color="#bebebe"
                size={70}
              />
              <Text style={styles.textEmptyPrinter}>Bluetooth is off</Text>
              <Button
                reised
                title="Turn on bluetooth"
                backgroundColor="#666"
                color="#fffefe"
                onPress={this.handleTurnOnBluetooth}
              />
            </View>
          )
          : null }

        { this.state.devices.length === 0 &&
          !this.state.searchingDevice &&
          this.state.bluetoothEnable
          ? (
            <View style={styles.containerEmptyPrinter}>
              <Icon
                name="bluetooth-disabled"
                color="#bebebe"
                size={70}
              />
              <Text style={styles.textEmptyPrinter}>No paired device</Text>
              <Button
                reised
                title="Go to setting"
                backgroundColor="#666"
                color="#fffefe"
                onPress={this.linkToSettings}
              />
            </View>
          )
          : null }

        { this.state.devices.length > 0
          ? (
            <FlatList
              data={this.state.devices}
              renderItem={({ item }) => <ItemSettingPrinter item={item} />}
              keyExtractor={this._keyExtractor}
              onRefresh={this.discovering}
              refreshing={this.state.searchingDevice}
            />
          )
          : null }
      </View>
    );
  }
}

SettingPrinter.propTypes = {
  navigation: PropTypes.object.isRequired
};

