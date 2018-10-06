import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import { DrawerItems } from 'react-navigation';

import labelAvatar from '../../publics/utils/labelAvatar';
import randomColorStr from '../../publics/utils/randomColorStr';
import { logout } from '../../auth/actionAuth';
import styles from './stylesComponents';

const handleRouteDrawerItems = props => ({ route, focused }) => {
  props.onItemPress({ route, focused });
};

const handleLogout = props => () => {
  props.dispatch({
    type: 'Navigation/RESET',
    key: 'UnauthorizedStack',
    index: 0,
    actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Login' }]
  });
  props.dispatch(logout());
};

const Drawer = props => (
  <View style={styles.containerDrawer}>
    <View style={styles.containerHeaderDrawer}>
      <View style={styles.headerDrawer}>
        <Avatar
          medium
          rounded
          title={labelAvatar(props.settings.user.username)}
          containerStyle={{
            backgroundColor: `#${randomColorStr(props.settings.user.username)}`
          }}
        />
        <View style={styles.headerInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textUsername}>{props.settings.user.username}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {props.settings.outlet ? props.settings.outlet.name : ''}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        ellipsizeMode="middle"
        style={styles.textOperator}
      > Operator: {props.settings.operator ? props.settings.operator.name : ''}
      </Text>
    </View>
    <DrawerItems
      {...props}
      onItemPress={handleRouteDrawerItems(props)}
    />
    <Button
      onPress={handleLogout(props)}
      containerViewStyle={styles.footerDrawer}
      backgroundColor="transparent"
      color="#333"
      small
      fontSize={12}
      title="LOGOUT"
    />
  </View>
);

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Drawer);

Drawer.propTypes = {
  settings: PropTypes.object.isRequired
};
