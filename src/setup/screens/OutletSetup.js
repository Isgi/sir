/**
 * Sample React Native OutletSetup
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

import lottieOutlet from '../../publics/assets/lottie/home.json';
import styles from '../stylesSetup';
import ItemOutletSetup from '../components/ItemOutletSetup';
import { getOutlet } from '../../outlets/actionOutlets';

type Props = {};

class OutletSetup extends Component<Props> {

  componentDidMount() {
    this.props.dispatch(getOutlet());
  }

  animation = () => (animation) => {
    if (animation) {
      animation.play();
    }
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item }) => <ItemOutletSetup item={item} />;

  render() {
    const { data, isLoading } = this.props.outlets;
    return (
      <View style={styles.container}>
        <View style={styles.containerLottie}>
          <LottieView
            ref={this.animation()}
            source={lottieOutlet}
            loop
          />
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.textHeader}>Select Outlet</Text>
            <Text style={styles.textSubHeader}>
              {'Before starting select one of your outlets\nor create new outlet with button +\nin the corner.'}
            </Text>
          </View>
          <View style={styles.content}>
            <FlatList
              horizontal
              data={data}
              refreshing={isLoading}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ListFooterComponent={<ItemOutletSetup />}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  outlets: state.outlets
});

export default connect(mapStateToProps)(OutletSetup);

OutletSetup.propTypes = {
  outlets: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};
