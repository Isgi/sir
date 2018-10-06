import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';

import styles from '../stylesAuth';
import InputText from '../../publics/components/redux-form/InputText';
import { email, required, minLength } from '../../publics/utils/validationForm';

const FormLogin = (props) => {

  let username = null;
  let password = null;

  const refUsername = () => (ref) => {
    const refs = ref;
    username = refs;
  };

  const refPassword = () => (ref) => {
    const refs = ref;
    password = refs;
  };

  const refSubmitBusinessName = () => () => username.focus();

  const refSubmitUsername = () => () => password.focus();

  const refSubmitPassword = () => props.handleSubmit;

  return (
    <View>
      <Field
        autoFocus
        name="businessName"
        component={InputText}
        label="Name of business"
        returnKeyType="next"
        validate={[required]}
        disabled={props.auth.isLoading}
        onSubmitEditing={refSubmitBusinessName()}
      />
      <Field
        name="username"
        autoCapitalize="none"
        component={InputText}
        label="Email"
        keyboardType="email-address"
        returnKeyType="next"
        disabled={props.auth.isLoading}
        onRef={refUsername()}
        validate={[required, email]}
        onSubmitEditing={refSubmitUsername()}
      />
      <Field
        name="password"
        component={InputText}
        label="Password"
        returnKeyType="done"
        secureTextEntry
        disabled={props.auth.isLoading}
        validate={[required, minLength(8)]}
        onRef={refPassword()}
        onSubmitEditing={refSubmitPassword()}
      />
      <Button
        title="REGISTER"
        backgroundColor="#666"
        color="#fffefe"
        disabled={props.auth.isLoading}
        loading={props.auth.isLoading}
        containerViewStyle={styles.buttonLogin}
        onPress={props.handleSubmit}
      />
    </View>
  );
};


FormLogin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const initialForm = {
  form: 'register',
  initialValues: {
    businessName: 'Foto Copy',
    username: 'isgi@gmail.com',
    password: '2wsx1qaz'
  }
};

export default reduxForm(initialForm)(FormLogin);

