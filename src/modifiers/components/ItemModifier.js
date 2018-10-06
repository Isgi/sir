import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import labelAvatar from '../../publics/utils/labelAvatar';
import randomColorStr from '../../publics/utils/randomColorStr';
import { deleteModifier } from '../actionModifiers';

class ItemModifier extends Component {

  handleEdit = item => () => {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'UpdateModifier',
      params: {
        item: this.props.item
      }
    });
  }

  hanldeDelete = id => () => {
    this.props.dispatch(deleteModifier(id))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleConfirmDelete = item => () => {
    Alert.alert(
      'Confirm delete',
      `Are you sure you want to delete ${item.name} modifier?`,
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'OK', onPress: this.hanldeDelete(item._id) }
      ],
      { cancelable: false }
    );
  }

  handleMorePress = () => {
    // handle press item action
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'ActionsModal',
      params: {
        heightModal: 110,
        title: 'Select Actions',
        options: [
          { label: 'Edit', icon: 'create', onPress: this.handleEdit(this.props.item) },
          { label: 'Delete', icon: 'delete', onPress: this.handleConfirmDelete(this.props.item) }
        ]
      }
    });
  }

  render() {
    const { name, price } = this.props.item;
    let { products } = this.props.item;
    products = products.map(product => product.name);
    products = products.toString();

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
        subtitle={price}
        rightTitle={products !== '' ? products.replace(',', ', ') : null}
        rightIcon={{ name: 'more-vert' }}
        onPressRightIcon={this.handleMorePress}
      />
    );
  }
}

export default connect()(ItemModifier);

ItemModifier.propTypes = {
  item: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};
