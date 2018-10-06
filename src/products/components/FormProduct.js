import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../stylesProducts';
import InputText from '../../publics/components/redux-form/InputText';
import Switch from '../../publics/components/redux-form/Switch';
import { required } from '../../publics/utils/validationForm';

class FormProduct extends Component {

  constructor(props) {
    super(props);
    this.price = null;
    this.sku = null;
    this.description = null;
    this.state = {
      modifiers: props.initialValues && props.initialValues.modifiers ? props.initialValues.modifiers : []
    };
  }

  refPrice = (ref) => {
    const refs = ref;
    this.price = refs;
  };

  refSku = (ref) => {
    const refs = ref;
    this.sku = refs;
  };

  refDescription = (ref) => {
    const refs = ref;
    this.description = refs;
  };

  refSubmitName = () => this.price.focus();

  refSubmitPrice = () => this.sku.focus();

  refSubmitSku = () => this.description.focus();

  handleSelectModifiers = () => (modifiers) => {
    this.setState({ modifiers });
  };

  navigateToSelectModifiers = () => () => {
    this.props.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'GeneralStack',
      action: {
        type: 'Navigation/NAVIGATE',
        routeName: 'SelectModifiers',
        params: {
          handleSelectModifiers: this.handleSelectModifiers(),
          selectedModifiers: this.state.modifiers
        }
      }
    });
  };

  render() {
    const { isLoading } = this.props.products;
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
          onSubmitEditing={this.refSubmitName}
        />
        <Field
          name="price"
          component={InputText}
          label="Price"
          validate={[required]}
          onRef={this.refPrice}
          returnKeyType="next"
          keyboardType="numeric"
          disabled={isLoading}
          onSubmitEditing={this.refSubmitPrice}
        />
        <Field
          name="sku"
          component={InputText}
          label="SKU"
          onRef={this.refSku}
          returnKeyType="next"
          disabled={isLoading}
          onSubmitEditing={this.refSubmitSku}
        />
        <Field
          name="description"
          component={InputText}
          label="Description"
          onRef={this.refDescription}
          returnKeyType="next"
          disabled={isLoading}
        />
        <TouchableOpacity disabled={isLoading} onPress={this.navigateToSelectModifiers()}>
          <View style={styles.fieldModifiers}>
            <Text style={styles.buttonSetModifiers}>Set modifiers</Text>
            <Text>{this.state.modifiers.length} Modifiers</Text>
          </View>
        </TouchableOpacity>
        <Field
          name="isActive"
          component={Switch}
          label="Active"
          disabled={isLoading}
        />
        <Field
          name="isForSale"
          component={Switch}
          label="For Sale"
          disabled={isLoading}
        />
        <Button
          title="SUBMIT"
          backgroundColor="#666"
          color="#fffefe"
          disabled={isLoading}
          loading={isLoading}
          containerViewStyle={styles.buttonSubmit}
          onPress={this.props.handleSubmit(value => this.props.onSubmit({ ...value, modifiers: this.state.modifiers }))}
        />
      </KeyboardAwareScrollView>
    );
  }

}

FormProduct.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  navigation: PropTypes.object
};

const initialForm = {
  form: 'product',
  initialValues: {
    isActive: true,
    isForSale: true
  }
};

export default reduxForm(initialForm)(FormProduct);

