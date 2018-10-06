/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';

import styles from '../stylesSetup';
import FormOutletSetup from '../components/FormOutletSetup';
import { createOutlet } from '../../outlets/actionOutlets';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';

const handleSubmit = props => (value) => {
  return props.dispatch(createOutlet(value))
    .then((res) => {
      props.navigation.dispatch({
        type: 'Navigation/BACK'
      });
    })
    .catch((err) => {
      Alert.alert(err.toString());
    });
};

const CreateOutletSetup = props => (
  <View style={styles.container}>
    <FormOutletSetup
      {...props}
      onSubmit={handleSubmit(props)}
    />
  </View>
);

CreateOutletSetup.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  outlets: state.outlets
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(CreateOutletSetup));

CreateOutletSetup.propTypes = {
  outlets: PropTypes.object.isRequired
};
