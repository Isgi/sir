/**
 * Sample React Native Modifiers
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import styles from '../../modifiers/stylesModifiers';
import { getModifier } from '../../modifiers/actionModifiers';
import ItemSelectModifier from '../components/ItemSelectModifier';
import renderComponentAfterInteraction from '../components/renderComponentAfterInteraction';

type Props = {};
class SelectModifiers extends Component<Props> {

  constructor(props) {
    super(props);
    this.handleSelectModifiers = props.navigation.getParam('handleSelectModifiers');
    this.selectedModifiers = props.navigation.getParam('selectedModifiers');
    this.selectedModifiersObj = Object.assign({}, ...this.selectedModifiers.map(item => ({ [item._id]: item })));
    props.navigation.setParams({ handleCreate: this.navigateToCreateModifier });
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.dispatch(getModifier());
  }

  navigateToCreateModifier = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'CreateModifierSelect'
    });
  }

  handleToggle = (item) => {
    if (item.switched) {
      this.selectedModifiers.push(item);
    } else {
      this.selectedModifiers = this.selectedModifiers.filter(modifier => modifier._id !== item._id);
    }
  }

  handleSubmit = () => {
    this.handleSelectModifiers(this.selectedModifiers);
    this.props.navigation.dispatch({
      type: 'Navigation/BACK'
    });
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item, index }) => <ItemSelectModifier handleToggle={this.handleToggle} item={item} index={index} />

  render() {
    const { isLoading } = this.props.modifiers;
    let { data } = this.props.modifiers;
    data = data.map((modifier) => {
      if (this.selectedModifiersObj[modifier._id]) {
        return { ...modifier, switched: true };
      }
      return modifier;
    });
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={this.getData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListFooterComponent={<View style={styles.containerFooter} />}
        />
        <View style={styles.containerButtonSubmit}>
          <Button
            reised
            title="SAVE"
            backgroundColor="#666"
            color="#fffefe"
            disabled={isLoading}
            loading={isLoading}
            containerViewStyle={styles.buttonSubmit}
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modifiers: state.modifiers
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(SelectModifiers));

SelectModifiers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modifiers: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

