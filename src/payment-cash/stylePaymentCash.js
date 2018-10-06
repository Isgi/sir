import { StyleSheet, Platform } from 'react-native';

const stylePaymentCash = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefe',
    justifyContent: 'space-between'
  },
  containerNum: {
    flex: 1,
    height: 60,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#bebebe',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerBlock: {
    flex: 1,
    height: 60,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#bebebe',
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  num: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999'
  },
  numPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666'
  },
  done: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666'
  },
  containerInputPrice: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  inputPrice: {
    color: '#000',
    fontSize: 50,
    paddingLeft: 0,
    paddingRight: 0
  },
  containerMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  message: {
    fontSize: 40
  },
  button: {
    marginBottom: 15
  },
  textButton: {
    fontWeight: 'bold'
  },
  containerButtons: {
    borderTopWidth: 0.5,
    borderTopColor: '#bebebe'
  },
  textNotice: {
    textAlign: 'center',
    padding: 20
  },
  containerChange: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 15,
    left: 15,
    right: 15
  },
  textChange: {
    fontSize: 20
  },
  textChangePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#b54b46',
    padding: 10
  },
  iconNavigator: {
    padding: Platform.OS === 'ios' ? 10 : 15
  }
});

export default stylePaymentCash;
