/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import styles from '../stylesAuth';
import FormRegister from '../components/FormRegister';
import { register } from '../actionAuth';
import { createSetting } from '../../settings/actionSettings';

const handleSubmit = props => (value) => {
  return props.dispatch(register(value))
    .then((res) => {
      if (res.value.data) {
        props.dispatch(createSetting({ user: res.value.data }));
        props.navigation.dispatch({
          type: 'Navigation/RESET',
          key: 'AuthorizedStack',
          index: 0,
          actions: [{
            type: 'Navigation/NAVIGATE',
            routeName: 'SetupStack'
          }]
        });
      } else {
        throw (res);
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 409) {
        throw new SubmissionError({ username: 'Your email is existed' });
      }
      Alert.alert(err.toString());
    });
};

const Register = props => (
  <View style={styles.container}>
    <FormRegister
      {...props}
      onSubmit={handleSubmit(props)}
    />
  </View>
);

const mapStateToProps = state => ({
  auth: state.auth
});

Register.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Register);

