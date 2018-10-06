/**
 * Sample React Native UpdateProduct
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';

import styles from '../stylesProducts';
import FormProduct from '../components/FormProduct';
import { updateProduct } from '../actionProducts';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';


const handleSubmit = props => (value) => {
  const rebuildValue = {
    ...value,
    price: Number(value.price)
  };
  return props.dispatch(updateProduct(rebuildValue))
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

const UpdateProduct = (props) => {
  const { params } = props.navigation.state;
  return (
    <View style={styles.container}>
      <FormProduct
        {...props}
        onSubmit={handleSubmit(props)}
        initialValues={params.item}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  products: state.products
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(UpdateProduct));

UpdateProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};
