import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Splash from '../components/Splash';

type Props = {};
class SplashScreen extends Component<Props> {

  componentDidMount() {
    const { user, outlet, operator } = this.props.settings;
    if (!user) {
      this.props.navigation.dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: 'Login'
      });
      return;
    }
    if (outlet) {
      if (operator) {
        this.props.navigation.dispatch({
          type: 'Navigation/RESET',
          key: 'AuthorizedStack',
          index: 0,
          actions: [
            { type: 'Navigation/NAVIGATE', routeName: 'MainDrawer' }
          ]
        });
      } else {
        this.props.navigation.dispatch({
          type: 'Navigation/RESET',
          key: 'AuthorizedStack',
          index: 0,
          actions: [
            {
              type: 'Navigation/NAVIGATE',
              routeName: 'SetupStack',
              action: {
                type: 'Navigation/NAVIGATE',
                routeName: 'OperatorSetup'
              }
            }
          ]
        });
      }
    } else {
      this.props.navigation.dispatch({
        type: 'Navigation/RESET',
        key: 'AuthorizedStack',
        index: 0,
        actions: [
          { type: 'Navigation/NAVIGATE', routeName: 'SetupStack' }
        ]
      });
    }
  }

  render() {
    return <Splash />;
  }
}

SplashScreen.propTypes = {
  settings: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(SplashScreen);
