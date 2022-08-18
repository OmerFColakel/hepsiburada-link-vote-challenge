import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import styles from './styleSheet';

const _plusSrc = './assets/pngs/plus.png';

class SubmitALink extends Component {
  constructor({props}) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.borderedBox}
        onPress={() => {
          this.props.navigation.navigate('New', {
            func: this.props.func,
          });
        }}>
        <Image source={require(_plusSrc)} style={styles.squareBox}></Image>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginHorizontal: 30}}>
          SUBMIT A LINK
        </Text>
      </TouchableOpacity>
    );
  }
}

export default SubmitALink;
