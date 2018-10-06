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

import styles from '../stylesModifiers';
import { getModifier } from '../actionModifiers';
import ItemModifier from '../components/ItemModifier';
import renderComponentAfterInteraction from '../../publics/components/renderComponentAfterInteraction';

type Props = {};
class Modifiers extends Component<Props> {

  constructor(props) {
    super(props);
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
      routeName: 'CreateModifier'
    });
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item, index }) => <ItemModifier item={item} index={index} />

  render() {
    const { data, isLoading } = this.props.modifiers;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={this.getData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modifiers: state.modifiers
});

export default renderComponentAfterInteraction(connect(mapStateToProps)(Modifiers));

Modifiers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modifiers: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

