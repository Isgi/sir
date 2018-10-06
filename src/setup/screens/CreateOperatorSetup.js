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
import FormOperatorSetup from '../components/FormOperatorSetup';
import { createOperator } from '../../operators/actionOperators';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';


const handleSubmit = props => (value) => {
  return props.dispatch(createOperator(value))
    .then((res) => {
      props.navigation.dispatch({
        type: 'Navigation/BACK'
      });
    })
    .catch((err) => {
      Alert.alert(err.toString());
    });
};

const CreateOperatorSetup = props => (
  <View style={styles.container}>
    <FormOperatorSetup
      {...props}
      onSubmit={handleSubmit(props)}
      initialValues={{
        name: props.operators.data.length === 0 ? 'Admin' : '',
        isAdmin: props.operators.data.length === 0
      }}
    />
  </View>
);

CreateOperatorSetup.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  operators: state.operators
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(CreateOperatorSetup));

CreateOperatorSetup.propTypes = {
  operators: PropTypes.object.isRequired
};
