/**
 * Sample React Native UpdateModifier
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';

import styles from '../stylesModifiers';
import FormModifier from '../components/FormModifier';
import { updateModifier } from '../actionModifiers';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';


const handleSubmit = props => (value) => {
  const rebuildValue = {
    ...value,
    products: value.products.map(product => product._id),
    price: Number(value.price)
  };
  return props.dispatch(updateModifier(rebuildValue))
    .then((res) => {
      // created
      props.navigation.dispatch({
        type: 'Navigation/BACK'
      });
    })
    .catch((err) => {
      Alert.alert(err.toString());
    });
};

const UpdateModifier = (props) => {
  const { params } = props.navigation.state;
  return (
    <View style={styles.container}>
      <FormModifier
        {...props}
        onSubmit={handleSubmit(props)}
        initialValues={params.item}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  modifiers: state.modifiers
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(UpdateModifier));

UpdateModifier.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modifiers: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};
