import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem } from 'react-native-elements';

import labelAvatar from '../utils/labelAvatar';
import randomColorStr from '../utils/randomColorStr';

class ItemSelectModifier extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switched: props.item.switched ? props.item.switched : false
    };
  }

  handleToggle = () => {
    this.props.handleToggle({
      ...this.props.item,
      switched: !this.state.switched
    });
    this.setState({ switched: !this.state.switched });
  }

  render() {
    const { name } = this.props.item;
    return (
      <ListItem
        roundAvatar
        avatar={(
          <Avatar
            small
            rounded
            title={labelAvatar(name)}
            containerStyle={{
              backgroundColor: `#${randomColorStr(name)}`
            }}
          />
        )}
        title={name}
        switched={this.state.switched}
        switchButton
        onSwitch={this.handleToggle}
        hideChevron
      />
    );
  }
}

export default ItemSelectModifier;

ItemSelectModifier.propTypes = {
  item: PropTypes.object.isRequired,
  handleToggle: PropTypes.func
};
