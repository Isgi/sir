import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, TouchableOpacity } from 'react-native';

import styles from '../stylePaymentCash';

const NumPad = (props) => {
  const numPadNumber = [
    ...props.fastPrice, '1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'Done'
  ];

  const styleNum = (data) => {
    if (data.index < 3) {
      return styles.numPrice;
    } else if (data.index === 14) {
      return styles.done;
    } else {
      return styles.num;
    }
  };

  const _renderItem = ({ onChangeNum }) => data => (
    <TouchableOpacity
      onPress={onChangeNum(data)}
      style={data.index < 3 || data.index === 14 ? styles.containerBlock : styles.containerNum}
    >
      <Text style={styleNum(data)}>{data.item}</Text>
    </TouchableOpacity>
  );

  const _keyExtractor = () => item => item;

  return (
    <FlatList
      data={numPadNumber}
      numColumns={3}
      keyExtractor={_keyExtractor()}
      renderItem={_renderItem(props)}
    />
  );
};

export default NumPad;

NumPad.propTypes = {
  fastPrice: PropTypes.array.isRequired
};
