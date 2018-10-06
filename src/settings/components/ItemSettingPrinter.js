import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import BluetoothSerial from 'react-native-bluetooth-serial';

import { createSetting } from '../../settings/actionSettings';

const ItemSettingPrinter = ({ item, settings, dispatch }) => {
  const handleToggle = () => () => {
    if (settings.printer && settings.printer.id === item.id) {
      BluetoothSerial.disconnect()
      .then((res) => {
        dispatch(createSetting({ printer: null }));
      })
      .catch((err) => {
        alert(err.toString());
      });
    } else {
      BluetoothSerial.connect(item.id)
      .then((res) => {
        dispatch(createSetting({ printer: item }));
      })
      .catch((err) => {
        alert(err.toString());
      });
    }
  };
  return <ListItem
    title={item.name ? item.name : 'Unnamed'}
    subtitle={item.address}
    switched={settings.printer && settings.printer.id === item.id}
    switchButton
    onSwitch={handleToggle()}
    hideChevron
  />;
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(ItemSettingPrinter);

ItemSettingPrinter.propTypes = {
  item: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};
