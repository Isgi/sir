import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 100,
    color: '#666'
  }
});

const Splash = () => (
  <View style={styles.container} >
    <Icon name="radio-button-checked" iconStyle={styles.logo} />
  </View>
);

export default Splash;
