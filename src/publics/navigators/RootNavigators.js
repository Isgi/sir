import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import { connect } from 'react-redux';

import Drawer from '../components/Drawer';
import {
  IconMenu,
  IconSearch,
  IconSaved,
  IconClose,
  IconBack,
  IconAdd
} from '../components/IconNavigator';
import ActionsModal from '../components/ActionsModal';
import SelectProducts from '../screens/SelectProducts';
import SelectModifiers from '../screens/SelectModifiers';
import DetailMenu from '../screens/DetailMenu';

import Login from '../../auth/screens/Login';
import Register from '../../auth/screens/Register';
import SplashScreen from '../../splash-screen/screens/SplashScreen';
import Menu from '../../menu/screens/Menu';
import Selected from '../../selected/screens/Selected';
import Histories from '../../histories/screens/Histories';
import Settings from '../../settings/screens/Settings';
import SettingPrinter from '../../settings/screens/SettingPrinter';
import Operators from '../../operators/screens/Operators';
import Outlets from '../../outlets/screens/Outlets';
import Products from '../../products/screens/Products';
import CreateProduct from '../../products/screens/CreateProduct';
import UpdateProduct from '../../products/screens/UpdateProduct';
import Modifiers from '../../modifiers/screens/Modifiers';
import CreateModifier from '../../modifiers/screens/CreateModifier';
import UpdateModifier from '../../modifiers/screens/UpdateModifier';
import OutletSetup from '../../setup/screens/OutletSetup';
import CreateOutletSetup from '../../setup/screens/CreateOutletSetup';
import OperatorSetup from '../../setup/screens/OperatorSetup';
import CreateOperatorSetup from '../../setup/screens/CreateOperatorSetup';
import PaymentCash from '../../payment-cash/screens/PaymentCash';
import PaymentDone from '../../payment-cash/screens/PaymentDone';

const TabBarLabel = connect(state => ({
  transactions: state.transactions
}))((props) => {
  const onProgress = props.transactions.data.filter(transaction => transaction.isProgress);
  let ordersQty = 0;
  if (onProgress.length > 0 && onProgress[0].orders.length > 0) {
    onProgress[0].orders.forEach((order) => {
      ordersQty += order.qty;
    });
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ color: props.tintColor }}>SELECTED</Text>
      {ordersQty > 0
        ? (
          <Badge
            value={ordersQty}
            textStyle={{ color: '#fff' }}
            containerStyle={{
              backgroundColor: '#b54b46',
              marginLeft: 5
            }}
          />
        )
        : null}
    </View>
  );
});

const OrdersTopTab = createMaterialTopTabNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: {
      tabBarLabel: 'Menu',
      tabBarOnPress: ({ defaultHandler }) => {
        defaultHandler();
      }
    }
  },
  Selected: {
    screen: Selected,
    navigationOptions: {
      tabBarLabel: props => <TabBarLabel {...props} />,
      tabBarOnPress: ({ defaultHandler }) => {
        defaultHandler();
      }
    }
  }
}, {
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: false,
    upperCaseLabel: true,
    activeTintColor: '#000',
    inactiveTintColor: '#666',
    labelStyle: {
      alignItems: 'center'
    },
    tabStyle: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    style: {
      backgroundColor: '#f7f7f7',
      height: 50,
      borderBottomColor: '#e5e5e6',
      borderBottomWidth: 0.5
    },
    indicatorStyle: {
      backgroundColor: '#666'
    }
  }
});

const OrdersStack = createStackNavigator({
  Orders: {
    screen: OrdersTopTab,
    navigationOptions: ({ navigation }) => ({
      title: 'Orders',
      headerLeft: <IconMenu navigation={navigation} />,
      headerRight: [
        <IconSearch key="search" navigation={navigation} />,
        <IconSaved key="saved" navigation={navigation} />
      ]
    })
  },
  PaymentCash: {
    screen: PaymentCash,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <IconBack navigation={navigation} />
    })
  },
  PaymentDone: {
    screen: PaymentDone,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
}, {
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerPressColorAndroid: 'transparent',
    headerTintColor: '#000',
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0,
      backgroundColor: '#f7f7f7'
    }
  }),
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});
const ordersIcon = ({ tintColor }) => <Icon name="apps" iconStyle={{ color: tintColor }} />;
ordersIcon.propTypes = { tintColor: PropTypes.shape.isRequired };
OrdersStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
    drawerLabel: 'Orders',
    drawerIcon: ordersIcon
  };
};

const HistoriesStack = createStackNavigator({
  Histories: {
    screen: Histories,
    navigationOptions: ({ navigation }) => ({
      title: 'Histories',
      headerLeft: <IconMenu navigation={navigation} />,
      headerRight: [
        <IconSearch key="search" navigation={navigation} />,
        <IconSaved key="saved" navigation={navigation} />
      ]
    })
  }
}, {
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerPressColorAndroid: 'transparent',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#f7f7f7'
    }
  }),
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});
const historiesIcon = ({ tintColor }) => <Icon name="history" iconStyle={{ color: tintColor }} />;
historiesIcon.propTypes = { tintColor: PropTypes.shape.isRequired };
HistoriesStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
    drawerLabel: 'Histories',
    drawerIcon: historiesIcon
  };
};

const ProductsStack = createStackNavigator({
  Products: {
    screen: Products,
    navigationOptions: ({ navigation }) => ({
      title: 'Products',
      headerLeft: <IconMenu navigation={navigation} />,
      headerRight: <IconAdd navigation={navigation} />
    })
  },
  CreateProduct: {
    screen: CreateProduct,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Product',
      headerLeft: <IconBack navigation={navigation} />
    })
  },
  UpdateProduct: {
    screen: UpdateProduct,
    navigationOptions: ({ navigation }) => ({
      title: 'Update Product',
      headerLeft: <IconBack navigation={navigation} />
    })
  }
}, {
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerPressColorAndroid: 'transparent',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#f7f7f7'
    }
  }),
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});
const productsIcon = ({ tintColor }) => <Icon name="local-mall" iconStyle={{ color: tintColor }} />;
productsIcon.propTypes = { tintColor: PropTypes.shape.isRequired };
ProductsStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
    drawerLabel: 'Products',
    drawerIcon: productsIcon
  };
};

const ModifiersStack = createStackNavigator({
  Modifiers: {
    screen: Modifiers,
    navigationOptions: ({ navigation }) => ({
      title: 'Modifiers',
      headerLeft: <IconMenu navigation={navigation} />,
      headerRight: <IconAdd navigation={navigation} />
    })
  },
  CreateModifier: {
    screen: CreateModifier,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Modifier',
      headerLeft: <IconBack navigation={navigation} />
    })
  },
  UpdateModifier: {
    screen: UpdateModifier,
    navigationOptions: ({ navigation }) => ({
      title: 'Update Modifier',
      headerLeft: <IconBack navigation={navigation} />
    })
  }
}, {
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerPressColorAndroid: 'transparent',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#f7f7f7'
    }
  }),
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});
const modifiersIcon = ({ tintColor }) => <Icon name="extension" iconStyle={{ color: tintColor }} />;
modifiersIcon.propTypes = { tintColor: PropTypes.shape.isRequired };
ModifiersStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
    drawerLabel: 'Modifiers',
    drawerIcon: modifiersIcon
  };
};

const OutletsStack = createStackNavigator({
  Outlets: {
    screen: Outlets,
    navigationOptions: ({ navigation }) => ({
      title: 'Outlets',
      headerLeft: <IconMenu navigation={navigation} />,
      headerRight: [
        <IconSearch key="search" navigation={navigation} />,
        <IconSaved key="saved" navigation={navigation} />
      ]
    })
  }
}, {
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerPressColorAndroid: 'transparent',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#f7f7f7'
    }
  }),
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});
const outletsIcon = ({ tintColor }) => <Icon name="store" iconStyle={{ color: tintColor }} />;
outletsIcon.propTypes = { tintColor: PropTypes.shape.isRequired };
OutletsStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
    drawerLabel: 'Outlets',
    drawerIcon: outletsIcon
  };
};

const OperatorsStack = createStackNavigator({
  Operators: {
    screen: Operators,
    navigationOptions: ({ navigation }) => ({
      title: 'Operators',
      headerLeft: <IconMenu navigation={navigation} />,
      headerRight: [
        <IconSearch key="search" navigation={navigation} />,
        <IconSaved key="saved" navigation={navigation} />
      ]
    })
  }
}, {
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerPressColorAndroid: 'transparent',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#f7f7f7'
    }
  }),
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});
const operatorsIcon = ({ tintColor }) => <Icon name="people" iconStyle={{ color: tintColor }} />;
operatorsIcon.propTypes = { tintColor: PropTypes.shape.isRequired };
OperatorsStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
    drawerLabel: 'Operators',
    drawerIcon: operatorsIcon
  };
};

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerLeft: <IconMenu navigation={navigation} />
    })
  },
  SettingPrinter: {
    screen: SettingPrinter,
    navigationOptions: ({ navigation }) => ({
      title: 'Printer',
      headerLeft: <IconBack navigation={navigation} />
    })
  }
}, {
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerPressColorAndroid: 'transparent',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#f7f7f7'
    }
  }),
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});
const settingsIcon = ({ tintColor }) => <Icon name="settings" iconStyle={{ color: tintColor }} />;
settingsIcon.propTypes = { tintColor: PropTypes.shape.isRequired };
SettingsStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
    drawerLabel: 'Settings',
    drawerIcon: settingsIcon
  };
};

const MainDrawer = createDrawerNavigator({
  OrdersStack,
  HistoriesStack,
  ProductsStack,
  ModifiersStack,
  OutletsStack,
  OperatorsStack,
  SettingsStack
}, {
  initialRouteName: 'OrdersStack',
  drawerWidth: 250,
  contentComponent: Drawer,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerBackgroundColor: '#ffffff',
  drawerToggleRoute: 'DrawerToggle',
  backBehavior: 'initialRoute',
  contentOptions: {
    inactiveTintColor: '#666',
    activeBackgroundColor: '#ffffff',
    activeTintColor: '#000000'
  }
});

const SetupStack = createStackNavigator({
  OutletSetup: {
    screen: OutletSetup,
    navigationOptions: {
      header: null
    }
  },
  CreateOutletSetup: {
    screen: CreateOutletSetup,
    navigationOptions: {
      title: 'Create New Outlet',
      headerTintColor: '#000'
    }
  },
  OperatorSetup: {
    screen: OperatorSetup,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: '#fff',
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  },
  CreateOperatorSetup: {
    screen: CreateOperatorSetup,
    navigationOptions: {
      title: 'Create New Operator',
      headerTintColor: '#000'
    }
  }
}, {
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});

const GeneralStack = createStackNavigator({
  SelectProducts: {
    screen: SelectProducts,
    navigationOptions: ({ navigation }) => ({
      title: 'Select Products',
      headerLeft: <IconClose navigation={navigation} />,
      headerRight: <IconAdd navigation={navigation} />,
      headerTintColor: '#000'
    })
  },
  SelectModifiers: {
    screen: SelectModifiers,
    navigationOptions: ({ navigation }) => ({
      title: 'Select Modifiers',
      headerLeft: <IconClose navigation={navigation} />,
      headerRight: <IconAdd navigation={navigation} />,
      headerTintColor: '#000'
    })
  },
  CreateProductSelect: {
    screen: CreateProduct,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Product'
    })
  },
  CreateModifierSelect: {
    screen: CreateModifier,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Modifier'
    })
  },
  DetailMenu: {
    screen: DetailMenu,
    navigationOptions: ({ navigation }) => ({
      title: 'Detail Menu',
      headerLeft: <IconClose navigation={navigation} />,
      headerTintColor: '#000'
    })
  }
}, {
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
    headerPressColorAndroid: 'transparent',
    headerTintColor: '#000'
  }),
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});

const AuthorizedStack = createStackNavigator({
  MainDrawer,
  SetupStack,
  ActionsModal,
  GeneralStack
}, {
  headerMode: 'none',
  mode: 'modal',
  cardStyle: {
    opacity: 1,
    backgroundColor: 'transparent'
  },
  transitionConfig: () => ({
    screenInterpolator: (props) => {
      const { scenes } = props;
      let routeModal = false;
      scenes.forEach((scene) => {
        if (
          scene.route.routeName === 'ActionsModal' ||
          scene.route.routeName === 'GeneralStack'
        ) {
          routeModal = true;
        }
      });
      if (routeModal) return StackViewStyleInterpolator.forVertical(props);
      // return StackViewStyleInterpolator.forHorizontal(props);
    }
  }),
  navigationOptions: {
    gesturesEnabled: true,
    gestureResponseDistance: {
      vertical: 350
    }
  }
});

const UnauthorizedStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Register'
    }
  }
}, {
  navigationOptions: {
    headerTintColor: '#000'
  },
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 50,
  //     useNativeDriver: true
  //   },
  //   screenInterpolator: (props) => {
  //     return StackViewStyleInterpolator.forHorizontal(props);
  //   }
  // })
});

// root
const RootNavigators = createSwitchNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  UnauthorizedStack,
  AuthorizedStack
});

export default RootNavigators;
