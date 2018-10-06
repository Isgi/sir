import { StyleSheet } from 'react-native';

const stylesSettings = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefe'
  },
  containerButtonSearch: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  buttonSearch: {
    marginTop: 20,
    marginBottom: 20
  },
  containerEmptyPrinter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textEmptyPrinter: {
    textAlign: 'center',
    fontSize: 14,
    margin: 10,
    color: '#bebebe',
    fontWeight: 'bold'
  }
});

export default stylesSettings;
