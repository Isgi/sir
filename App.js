import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, ToastAndroid } from 'react-native';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, connect } from 'react-redux';
import BluetoothSerial from 'react-native-bluetooth-serial';

import { persistor, store } from './src/publics/redux/store';
import RootNavigators from './src/publics/navigators/RootNavigators';
import Splash from './src/splash-screen/components/Splash';

const App = reduxifyNavigator(RootNavigators, 'root');

const mapStateToProps = state => ({
  state: state.router
});

const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends Component {

  constructor(props) {
    super(props);
    this.countPressBack = 0;
    const { settings } = store.getState();
    if (settings.printer && settings.printer.id) {
      BluetoothSerial.connect(settings.printer.id)
      .then((res) => {
        // success
      })
      .catch((err) => {
        alert(err.toString());
      });
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    const { getState, dispatch } = store;
    const { router } = getState();
    // handle back for screen login and orders
    if (
      (
        router.index === 1 &&
        router.routes[1].index === 0
      ) ||
      (
        router.index === 2 &&
        router.routes[2].index === 0 &&
        router.routes[2].routes[0].index === 0 &&
        router.routes[2].routes[0].routes[0].index === 0 &&
        router.routes[2].routes[0].routes[0].routes[0].index === 0
      )
    ) {
      this.countPressBack = this.countPressBack + 1;
      if (this.countPressBack < 2) {
        ToastAndroid.show('Press BACK again to Exit', ToastAndroid.SHORT);
        setTimeout(() => {
          this.countPressBack = 0;
        }, 1000);
      } else {
        return false;
      }
    }
    // handle back for screen payment down
    if (
      router.index === 2 &&
      router.routes[2].index === 0 &&
      router.routes[2].routes[0].index === 0 &&
      router.routes[2].routes[0].routes[0].index === 2 &&
      router.routes[2].routes[0].routes[0].routes[2].routeName === 'PaymentDone'
    ) {
      dispatch({ type: 'Navigation/POP_TO_TOP' });
    }
    dispatch({ type: 'Navigation/BACK' });
    return true;
  };

  render() {
    console.log(store);
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Splash />}
          persistor={persistor}
        >
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}

export default Root;
