import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';

import styles from './styleSheet';

const logoSrc = './assets/pngs/hepsiburadalogo.png';
const websiteURL = 'https://www.hepsiburada.com/';

class AppBar extends Component {
  render() {
    return (
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            _openWebsite();
          }}>
          <Image source={require(logoSrc)} style={styles.logo}></Image>
        </TouchableOpacity>

        <Text style={{fontSize: 18, fontWeight: '500'}}>
          <Text style={{fontWeight: '900', color: 'black'}}>Link</Text>VOTE
          Challenge
        </Text>
      </View>
    );
  }
}

const _openWebsite = () => {
  Linking.openURL(websiteURL);
};

export default AppBar;
