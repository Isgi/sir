import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';

import styles from '../stylesSetup';
import InputText from '../../publics/components/redux-form/InputText';
import { required } from '../../publics/utils/validationForm';

const FormOutletSetup = (props) => {
  let address = null;

  const refAddress = () => (ref) => {
    const refs = ref;
    address = refs;
  };

  const refSubmitName = () => () => address.focus();

  const refSubmitAddress = () => props.handleSubmit;

  return (
    <View>
      <Field
        autoFocus
        name="name"
        component={InputText}
        label="Outlet Name"
        validate={[required]}
        returnKeyType="next"
        disabled={props.outlets.isLoading}
        onSubmitEditing={refSubmitName()}
      />
      <Field
        name="address"
        component={InputText}
        label="Address"
        validate={[required]}
        onRef={refAddress()}
        returnKeyType="done"
        disabled={props.outlets.isLoading}
        onSubmitEditing={refSubmitAddress()}
      />
      <Button
        title="Create"
        backgroundColor="#666"
        color="#fffefe"
        disabled={props.outlets.isLoading}
        loading={props.outlets.isLoading}
        containerViewStyle={styles.buttonCreate}
        onPress={props.handleSubmit}
      />
    </View>
  );
};

FormOutletSetup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  outlets: PropTypes.object.isRequired
};

const initialForm = {
  form: 'outlet'
};

export default reduxForm(initialForm)(FormOutletSetup);

