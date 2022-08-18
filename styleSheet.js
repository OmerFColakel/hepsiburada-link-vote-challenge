import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  top: {
    width: '90%',
    height: 70,
    flexWrap: 'wrap',
    alignContent: 'space-between',
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  logo: {
    width: 160,
    height: 70,
  },
  borderedBox: {
    flexWrap: 'wrap',
    width: '90%',
    height: 75,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
  squareBox: {
    width: windowWidth / 7,
    height: windowWidth / 7,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#f6931e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    borderBottomWidth: 5,
    backgroundColor: 'red',
    borderColor: 'grey',
    width: '90%',
    borderRadius: 1,
  },
  order: {
    alignSelf: 'flex-start',
    height: 40,
    width: '75%',
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: '5%',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
  },
  vote: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  button: {
    width: '30%',
    height: 30,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  view: {
    backgroundColor: 'white',
    height: '100%',
  },
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    width: '90%',
    alignSelf: 'center',
    height: '25%',
    marginVertical: '40%',
    borderColor: 'black',
    borderWidth: 2,
  },
});

export default styles;
