/**
 * Sample React Native OperatorSetup
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';

import lottieOperator from '../../publics/assets/lottie/user.json';
import styles from '../stylesSetup';
import ItemOperatorSetup from '../components/ItemOperatorSetup';
import { getOperator } from '../../operators/actionOperators';

type Props = {};

class OperatorSetup extends Component<Props> {

  componentDidMount() {
    this.props.dispatch(getOperator());
  }

  animation = () => (animation) => {
    if (animation) {
      animation.play();
    }
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item }) => <ItemOperatorSetup item={item} />;

  render() {
    const { data, isLoading } = this.props.operators;
    return (
      <View style={styles.container}>
        <View style={styles.containerLottie}>
          <LottieView
            ref={this.animation()}
            source={lottieOperator}
            loop
          />
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contentHeader}>
            <Text
              ellipsizeMode="middle"
              numberOfLines={1}
              style={styles.textHeader}
            >
              {`Select Operator ${this.props.settings.outlet.name}`}
            </Text>
            <Text style={styles.textSubHeader}>
              {'Before starting select one of your operators\nor create new operator with button +\nin the corner.'}
            </Text>
          </View>
          <View style={styles.content}>
            <FlatList
              horizontal
              data={data}
              refreshing={isLoading}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ListFooterComponent={<ItemOperatorSetup />}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  operators: state.operators,
  settings: state.settings
});

export default connect(mapStateToProps)(OperatorSetup);

OperatorSetup.propTypes = {
  operators: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};
