import React, {Component} from 'react';
import {Modal, Text, View, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styleSheet';

const delSrc = './assets/pngs/delete.png';
const crossSrc = './assets/pngs/cross.png';

class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <View style={{top: 1, right: 1, position: 'absolute'}}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.modal}>
            <View style={styles.modalBox}>
              <View
                style={{
                  backgroundColor: 'black',
                  height: 20,
                  alignContent: 'space-between',
                  flexWrap: 'wrap',
                  width: '100%',
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', marginLeft: 10}}>
                  Remove Link
                </Text>

                <TouchableOpacity
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <Image
                    source={require(crossSrc)}
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: 'transparent',
                      marginRight: 10,
                    }}></Image>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '90%',
                }}>
                <Text style={{fontWeight: '900'}}>Do you want to remove:</Text>
                <Text
                  style={{
                    letterSpacing: 1,
                    fontWeight: '900',
                    fontSize: 20,
                    color: 'black',
                  }}>
                  {this.props.name}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    height: 30,
                    width: '100%',
                    justifyContent: 'space-around',
                    marginVertical: 20,
                  }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      removeValue(this.props.name);
                      this.setModalVisible(!modalVisible);
                      console.log('DELETE');
                      this.props.force();
                    }}>
                    <Text style={styles.buttonText}>OK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.setModalVisible(!modalVisible)}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => this.setModalVisible(!modalVisible)}
          style={{
            height: 20,
            width: 20,
            position: 'absolute',
            top: -10,
            right: -10,
          }}
          disabled={this.props.disabled}>
          <Image
            source={require(delSrc)}
            style={{
              height: 20,
              width: 20,
              tintColor: this.props.delColor,
            }}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const removeValue = async name => {
  try {
    await AsyncStorage.removeItem('"' + name + '"');
    console.log(name);
  } catch (e) {
    console.log('Problem while Removing: ' + e);
  }
  console.log('Done.');
};

export default Delete;
