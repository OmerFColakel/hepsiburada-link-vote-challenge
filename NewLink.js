import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {BaseToast} from 'react-native-toast-message';

import AppBar from './AppBar';

import styles from './styleSheet';

const leftSrc = './assets/pngs/leftarrow.png';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const NewLink = ({route, navigation}) => {
  const {func} = route.params;
  const [state, setState] = useState({name: '', url: '', vote: 0});

  function handleBackButtonClick() {
    func();
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{borderColor: 'green', borderWidth: 2}}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: ' darkseagreen ',
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: 'forestgreen',
          overflow: 'hidden',
        }}
      />
    ),
    error: props => (
      <BaseToast
        {...props}
        style={{borderColor: 'red', borderWidth: 2}}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: ' orange ',
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: 'orangered',
          overflow: 'hidden',
        }}
      />
    ),
  };
  const ToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: state.name + ' has been added.',
    });
  };
  const ToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'ERROR',
    });
  };
  const ButtonHandle = async () => {
    const p = new Promise(async (resolve, reject) => {
      if (
        (await state.name) != '' &&
        (await state.name) != null &&
        (await state.url) != '' &&
        (await state.url) != null
      ) {
        resolve();
      } else {
        reject();
      }
    })
      .then(async resolve => {
        await AsyncStorage.setItem(
          await JSON.stringify(await state.name),
          await JSON.stringify(await state),
        );
        await ToastSuccess();
      })
      .catch(() => {
        ToastError();
      });
  };

  const setName = str => {
    setState({name: str, url: state.url, vote: 0});
  };
  const setURL = str => {
    setState({url: str, name: state.name, vote: 0});
  };

  return (
    <View style={styles.view}>
      <AppBar />
      <Pressable
        onPress={handleBackButtonClick}
        style={{flexDirection: 'row', margin: 20, alignSelf: 'baseline'}}>
        <Image source={require(leftSrc)} style={{height: 20, width: 20}} />
        <Text style={{fontWeight: 'bold', marginLeft: '5%', color: 'black'}}>
          Return to List
        </Text>
      </Pressable>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginHorizontal: '10%',
          color: 'black',
          marginTop: '10%',
        }}>
        Add New Link
      </Text>
      <View style={{marginVertical: '5%'}}>
        <View style={{marginHorizontal: '10%', marginVertical: '5%'}}>
          <Text>Link Name:</Text>
          <TextInput
            style={{height: 40, borderWidth: 1, borderRadius: 5}}
            placeholder=" e.g. Alphabet"
            value={state.name}
            onChangeText={setName}></TextInput>
        </View>

        <View style={{marginHorizontal: '10%', marginVertical: '5%'}}>
          <Text>Link URL:</Text>
          <TextInput
            style={{height: 40, borderWidth: 1, borderRadius: 5}}
            placeholder=" e.g. http://abc.xyz"
            value={state.url}
            onChangeText={setURL}></TextInput>
        </View>
      </View>

      <Pressable
        onPress={() => ButtonHandle()}
        style={[styles.button, {alignSelf: 'flex-end', marginRight: '10%'}]}>
        <Text style={styles.buttonText}>ADD</Text>
      </Pressable>

      <Toast position="top" config={toastConfig} />
    </View>
  );
};

export default NewLink;
