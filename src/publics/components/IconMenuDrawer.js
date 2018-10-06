import React from 'react';
import { Icon } from 'react-native-elements';

import styles from './stylesComponents';

const handlePress = props => () => {
  props.navigation.openDrawer('DrawerOpen');
};

export default (props) => {
  return (
    <Icon
      name="menu"
      iconStyle={styles.iconMenuDrawer}
      onPress={handlePress(props)}
    />
  );
};
