import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../stylesModifiers';
import InputText from '../../publics/components/redux-form/InputText';
import { required } from '../../publics/utils/validationForm';

class FormModifier extends Component {

  constructor(props) {
    super(props);
    this.price = null;
    this.state = {
      products: props.initialValues && props.initialValues.products ? props.initialValues.products : []
    };
  }

  refPrice = () => (ref) => {
    const refs = ref;
    this.price = refs;
  };

  refSubmitName = () => () => this.price.focus();

  handleSelectProducts = () => (products) => {
    this.setState({ products });
  };

  navigateToSelectProducts = () => () => {
    this.props.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'GeneralStack',
      action: {
        type: 'Navigation/NAVIGATE',
        routeName: 'SelectProducts',
        params: {
          handleSelectProducts: this.handleSelectProducts(),
          selectedProducts: this.state.products
        }
      }
    });
  };

  render() {
    const { isLoading } = this.props.modifiers;
    return (
      <KeyboardAwareScrollView
        scrollEnabled
        keyboardShouldPersistTaps="always"
        extraScrollHeight={90}
      >
        <Field
          autoFocus
          name="name"
          component={InputText}
          label="Name"
          validate={[required]}
          returnKeyType="next"
          disabled={isLoading}
          onSubmitEditing={this.refSubmitName()}
        />
        <Field
          name="price"
          component={InputText}
          label="Price"
          validate={[required]}
          onRef={this.refPrice()}
          returnKeyType="next"
          keyboardType="numeric"
          disabled={isLoading}
        />
        <TouchableOpacity disabled={isLoading} onPress={this.navigateToSelectProducts()}>
          <View style={styles.fieldProducts}>
            <Text style={styles.buttonSetProducts}>Set to products</Text>
            <Text>{this.state.products.length} Products</Text>
          </View>
        </TouchableOpacity>
        <Button
          title="SUBMIT"
          backgroundColor="#666"
          color="#fffefe"
          disabled={isLoading}
          loading={isLoading}
          containerViewStyle={styles.buttonSubmit}
          onPress={this.props.handleSubmit(value => this.props.onSubmit({ ...value, products: this.state.products }))}
        />
      </KeyboardAwareScrollView>
    );
  }
}

FormModifier.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  initialValues: PropTypes.object,
  modifiers: PropTypes.object.isRequired
};

const initialForm = {
  form: 'modifier'
};

export default reduxForm(initialForm)(FormModifier);

