import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const stylesSetup = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefe'
  },
  containerLottie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  lottieOutlet: {
    height: 200,
    width: 200
  },
  containerContent: {
    flex: 1
  },
  textHeader: {
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#444',
    fontSize: 30,
    margin: 10,
    marginRight: 15,
    marginLeft: 15
  },
  textSubHeader: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#333',
    lineHeight: 25,
    fontSize: 18
  },
  buttonCreate: {
    marginTop: 20,
    marginBottom: 20
  },
  itemGrid: {
    width: width / 2.5,
    height: width / 2.5,
    borderWidth: 0.5,
    borderColor: '#fffefe',
    backgroundColor: '#bebebe',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoProduct: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 5,
    justifyContent: 'center'
  },
  textAvatar: {
    color: '#ffffff',
    fontSize: 50
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fffefe'
  },
  textPrice: {
    fontSize: 16,
    color: '#fffefe'
  },
  containerAdd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fefefe'
  },
  iconAdd: {
    fontSize: 50,
    color: '#555'
  },
  contentHeader: {
    flex: 1
  },
  content: {
    flex: 1
  },
  lottieProfile: {
    height: 450,
    width: 450
  },
  textHelp: {
    marginLeft: 20,
    marginRight: 20,
    color: '#666',
    fontSize: 12
  }
});

export default stylesSetup;
