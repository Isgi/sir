import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from 'react-native-elements';
import { Switch as SwitchRN, TouchableOpacity } from 'react-native';

import styles from '../stylesComponents';

const handleChange = input => () => {
  input.onChange(!input.value);
};

const Switch = ({
  input,
  label,
  meta: { touched, error, warning },
  disabled
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={handleChange(input)} style={styles.containerSwitch}>
      <SwitchRN disabled={disabled} value={!!input.value} onValueChange={handleChange(input)} />
      <FormLabel labelStyle={styles.labelSwitch}>{error ? `${label} *` : label}</FormLabel>
    </TouchableOpacity>
  );
};

export default Switch;

Switch.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

