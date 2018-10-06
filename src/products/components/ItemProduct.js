import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import labelAvatar from '../../publics/utils/labelAvatar';
import randomColorStr from '../../publics/utils/randomColorStr';
import { deleteProduct } from '../actionProducts';

class ItemProduct extends Component {

  handleEdit = item => () => {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'UpdateProduct',
      params: {
        item: this.props.item
      }
    });
  }

  hanldeDelete = id => () => {
    this.props.dispatch(deleteProduct(id))
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
      `Are you sure you want to delete ${item.name} product?`,
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
    let { modifiers } = this.props.item;
    modifiers = modifiers.map(modifier => modifier.name);
    modifiers = modifiers.toString();

    return (
      <ListItem
        roundAvatar
        avatar={(
          <Avatar
            medium
            rounded
            title={labelAvatar(name)}
            containerStyle={{
              backgroundColor: `#${randomColorStr(name)}`
            }}
          />
        )}
        title={name}
        subtitle={price}
        rightTitle={modifiers !== '' ? modifiers.replace(',', ', ') : null}
        rightIcon={{ name: 'more-vert' }}
        onPressRightIcon={this.handleMorePress}
      />
    );
  }
}

export default connect()(ItemProduct);

ItemProduct.propTypes = {
  item: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};
