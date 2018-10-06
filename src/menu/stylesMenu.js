import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const stylesMenu = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefe'
  },
  itemGrid: {
    width: width / 3,
    height: width / 3,
    borderWidth: 0.5,
    borderColor: '#fffefe',
    backgroundColor: '#bebebe',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoProduct: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '40%',
    justifyContent: 'center'
  },
  containerTextAvatar: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textAvatar: {
    color: '#ffffff',
    fontSize: 40
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fffefe'
  },
  textPrice: {
    fontSize: 14,
    color: '#fffefe'
  },
  iconClose: {
    fontSize: 25,
    color: '#fe5e57',
    padding: 6,
    height: 36,
    width: 36
  },
  wrapperIconClose: {
    position: 'absolute',
    top: 2,
    right: 2.5,
    backgroundColor: '#666',
    borderRadius: 18
  }
});

export default stylesMenu;
