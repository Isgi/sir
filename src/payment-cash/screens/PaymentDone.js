import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import styles from '../stylePaymentCash';

class PaymentDone extends Component {
  constructor(props) {
    super(props);
    this.change = props.navigation.state.params.change;
  }

  handlePrint = () => {
    alert('print');
  }

  handleShare = () => {
    alert('share');
  }

  handleDone = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/POP_TO_TOP'
    });
    this.props.navigation.dispatch({
      type: 'Navigation/BACK'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerMessage}>
          <Icon name="check-circle" color="#666" size={70} />
          <Text style={styles.message}>Success</Text>
          { this.change > 0 ? (
            <View style={styles.containerChange}>
              <Text style={styles.textChange}>Change due</Text>
              <Text style={styles.textChangePrice}>{this.change}</Text>
            </View>
          ) : null }
        </View>
        <View style={styles.containerButtons}>
          <Text style={styles.textNotice}>How would you like to receive your receipt?</Text>
          <Button
            large
            outline
            color="#666"
            title="Share"
            onPress={this.handleShare}
            buttonStyle={styles.button}
            textStyle={styles.textButton}
          />
          <Button
            large
            outline
            color="#666"
            title="Print"
            onPress={this.handlePrint}
            buttonStyle={styles.button}
            textStyle={styles.textButton}
          />
          <Button
            large
            outline
            color="#bebebe"
            title="No, Thanks"
            onPress={this.handleDone}
            buttonStyle={styles.button}
            textStyle={styles.textButton}
          />
        </View>
      </View>
    );
  }
}

export default PaymentDone;

PaymentDone.propTypes = {
  navigation: PropTypes.object.isRequired
};

