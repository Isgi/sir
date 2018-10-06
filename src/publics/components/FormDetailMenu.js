import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList
} from 'react-native';
import { Button, Icon, ListItem, Avatar, FormLabel } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';

import styles from './stylesComponents';
import InputText from '../../publics/components/redux-form/InputText';
import { number, required, minValue1 } from '../utils/validationForm';
import labelAvatar from '../../publics/utils/labelAvatar';
import randomColorStr from '../../publics/utils/randomColorStr';

const ItemModifier = ({ item, index, onToggle }) => (
  <ListItem
    roundAvatar
    avatar={(
      <Avatar
        small
        rounded
        title={labelAvatar(item.name)}
        containerStyle={{
          backgroundColor: `#${randomColorStr(item.name)}`
        }}
      />
    )}
    title={item.name}
    subtitle={item.price}
    switched={item.selected}
    switchButton
    onSwitch={onToggle(item)}
    hideChevron
    containerStyle={{
      borderBottomWidth: 0,
      borderTopWidth: 0
    }}
  />
);
ItemModifier.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired
};

class FormDetailMenu extends Component {

  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
    if (this.props.initialValues.modifiers) {
      const modifiersEditObj = Object.assign(
        {},
        ...this.props.initialValues.modifiers.map(item => ({ [item._id]: true }))
      );
      this.item.modifiers = this.item.modifiers.map((modifier) => {
        if (modifiersEditObj[modifier._id]) {
          return { ...modifier, selected: true };
        }
        return modifier;
      });
    }
    this.state = {
      modifiers: this.item.modifiers
    };
  }

  handleSelectModifier = value => (toggle) => {
    const modifiers = this.state.modifiers.map((modifier) => {
      if (modifier._id === value._id) {
        return { ...modifier, selected: toggle };
      }
      return modifier;
    });
    this.setState({ modifiers });
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item, index }) => <ItemModifier item={item} index={index} onToggle={this.handleSelectModifier} />

  render() {
    return (
      <View style={styles.container}>
        {this.state.modifiers.length > 0
          ? [
            <FormLabel key="label">Modifiers</FormLabel>,
            <View key="list" style={styles.containerModifiers}>
              <FlatList
                data={this.state.modifiers}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
          ]
          : null }
        <View>
          <Field
            name="note"
            component={InputText}
            label="Note"
            returnKeyType="done"
          />
          <View style={styles.containerRow}>
            <View style={{ flex: 1 }}>
              <Field
                name="qty"
                component={InputText}
                label="QTY"
                validate={[required, number, minValue1]}
                returnKeyType="done"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.containerRow, { flex: 1, justifyContent: 'flex-start' }]}>
              <Icon
                name="indeterminate-check-box"
                iconStyle={styles.iconCountQty}
                containerStyle={styles.containerIconCountQty}
              />
              <Icon
                name="add-box"
                iconStyle={styles.iconCountQty}
                containerStyle={styles.containerIconCountQty}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerButtonSubmit}>
          <Button
            reised
            title="SAVE"
            backgroundColor="#666"
            color="#fffefe"
            containerViewStyle={styles.buttonSubmit}
            onPress={this.props.handleSubmit(value => this.props.onSubmit({
              ...this.item,
              ...value,
              modifiers: this.state.modifiers.filter(modifier => modifier.selected)
            }))}
          />
        </View>
      </View>
    );
  }
}

FormDetailMenu.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  initialValues: PropTypes.object
};

const initialForm = {
  form: 'menu',
  initialValues: {
    qty: 1
  }
};

export default reduxForm(initialForm)(FormDetailMenu);
