/**
 * Sample React Native CreateModifier
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import styles from '../stylesModifiers';
import FormModifier from '../components/FormModifier';
import { createModifier } from '../actionModifiers';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';


const handleSubmit = props => (value) => {
  const rebuildValue = {
    ...value,
    products: value.products.map(product => product._id),
    price: Number(value.price)
  };
  return props.dispatch(createModifier(rebuildValue))
    .then((res) => {
      // created
      props.navigation.dispatch({
        type: 'Navigation/BACK'
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 409) {
        throw new SubmissionError({ name: 'Modifier name is existed' });
      }
      Alert.alert(err.toString());
    });
};

const CreateModifier = props => (
  <View style={styles.container}>
    <FormModifier
      {...props}
      onSubmit={handleSubmit(props)}
    />
  </View>
);

const mapStateToProps = state => ({
  modifiers: state.modifiers
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(CreateModifier));

CreateModifier.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modifiers: PropTypes.object.isRequired
};
