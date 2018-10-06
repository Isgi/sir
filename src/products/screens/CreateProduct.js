/**
 * Sample React Native CreateProduct
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import styles from '../stylesProducts';
import FormProduct from '../components/FormProduct';
import { createProduct } from '../actionProducts';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';


const handleSubmit = props => (value) => {
  const rebuildValue = {
    ...value,
    price: Number(value.price)
  };
  return props.dispatch(createProduct(rebuildValue))
    .then((res) => {
      // created
      props.navigation.dispatch({
        type: 'Navigation/BACK'
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 409) {
        throw new SubmissionError({ name: 'Product name is existed' });
      }
      Alert.alert(err.toString());
    });
};

const CreateProduct = props => (
  <View style={styles.container}>
    <FormProduct
      {...props}
      onSubmit={handleSubmit(props)}
    />
  </View>
);

const mapStateToProps = state => ({
  products: state.products
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(CreateProduct));

CreateProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};
