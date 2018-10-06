/**
 * Sample React Native DetailMenu
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import FormDetailMenu from '../components/FormDetailMenu';
import styles from './stylesScreens';
import { createOrders, deleteOrdersById } from '../../transactions/actionTransactions';
import renderComponentAfterInteraction from '../components/renderComponentAfterInteraction';


const handleSubmit = props => (value) => {
  const itemEdit = props.navigation.getParam('itemEdit');
  const rebuildValue = {
    ...value,
    price: Number(value.price),
    qty: Number(value.qty),
    totalPrice: Number(value.price) * Number(value.qty)
  };
  if (!itemEdit) {
    props.dispatch(createOrders(rebuildValue));
  } else {
    props.dispatch(deleteOrdersById(rebuildValue._id));
    props.dispatch(createOrders({ ...rebuildValue, _id: rebuildValue.productId }));
  }
  props.navigation.dispatch({ type: 'Navigation/BACK' });
};

const DetailMenu = props => (
  <View style={styles.container}>
    <FormDetailMenu
      {...props}
      onSubmit={handleSubmit(props)}
      initialValues={props.navigation.getParam('itemEdit')}
    />
  </View>
);

DetailMenu.propTypes = {
  navigation: PropTypes.object
};

export default renderComponentAfterInteraction(connect()(DetailMenu));
