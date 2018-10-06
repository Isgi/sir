/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import styles from '../stylesAuth';
import FormLogin from '../components/FormLogin';
import { createSetting } from '../../settings/actionSettings';
import { login } from '../actionAuth';

const handleSubmit = props => (value) => {
  return props.dispatch(login(value))
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
      if (err.response && err.response.status === 401) {
        throw new SubmissionError({ password: 'Your password is wrong' });
      }
      if (err.value && err.value.status === 204) {
        throw new SubmissionError({ username: 'Your email is wrong' });
      }
      Alert.alert(err.toString());
    });
};

const navigateToRegister = props => () => {
  props.navigation.dispatch({
    type: 'Navigation/NAVIGATE',
    routeName: 'Register'
  });
};

const Login = props => (
  <View style={styles.container}>
    <FormLogin
      {...props}
      onSubmit={handleSubmit(props)}
    />
    <Button
      title="Don't have account? Register here."
      backgroundColor="transparent"
      color="#666"
      onPress={navigateToRegister(props)}
    />

  </View>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
