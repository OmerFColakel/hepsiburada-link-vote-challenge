import React, {Component} from 'react';

import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import styles from './styleSheet';
import Delete from './Delete';
import AsyncStorage from '@react-native-async-storage/async-storage';
const arrowDownSrc = './assets/pngs/arrowdown.png';
const arrowUpSrc = './assets/pngs/arrowup.png';

class Contestant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestantColor: 'transparent',
      delColor: 'transparent',
      disabled: true,
      disable: false,
      fontColor: 'black',
      butCol: '#f6931e',
    };
  }
  static getDerivedStateFromProps(props) {
    if (props.name == undefined) {
      return {
        fontColor: 'transparent',
        disable: true,
        butCol: 'transparent',
      };
    }
    return {
      disable: false,
      fontColor: 'black',
      butCol: '#f6931e',
    };
  }

  longPressHandling = () => {
    if (this.state.contestantColor === 'transparent')
      this.setState({
        contestantColor: 'grey',
        delColor: 'red',
        disabled: false,
      });
    else
      this.setState({
        contestantColor: 'transparent',
        delColor: 'transparent',
        disabled: true,
      });
  };
  force = () => {
    this.props.force();
    this.longPressHandling();
  };
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.borderedBox,
          {
            borderWidth: 0,
            backgroundColor: this.state.contestantColor,
            width: '100%',
          },
        ]}
        onLongPress={this.longPressHandling}
        onPress={() => {
          Linking.canOpenURL(this.props.link)
            .then(() => {
              return Linking.openURL(this.props.link);
            })
            .catch(err => alert('An error occurred with ' + this.props.link));
        }}
        disabled={this.state.disable}>
        <Delete
          disabled={this.state.disabled}
          delColor={this.state.delColor}
          force={this.force.bind(this)}
          name={this.props.name}></Delete>
        <View
          style={[
            styles.squareBox,
            {
              flexDirection: 'column',
              backgroundColor: this.state.butCol,
              borderColor: this.state.fontColor,
            },
          ]}>
          <Text style={{fontSize: 20, color: this.state.fontColor}}>
            {this.props.vote}
          </Text>
          <Text style={{color: this.state.fontColor}}>Points</Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <Text numberOfLines={1} style={{color: this.state.fontColor}}>
            {this.props.name}
          </Text>
          <Text numberOfLines={1} style={{color: this.state.fontColor}}>
            ({this.props.link})
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignContent: 'flex-end',
              width: '80%',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={async () => {
                try {
                  const key = '"' + this.props.name + '"';
                  const item = await AsyncStorage.getItem(key);
                  const parsed = await JSON.parse(item);
                  parsed.vote += 1;
                  const str = JSON.stringify(await parsed);
                  await AsyncStorage.setItem(key, str);
                  {
                    this.props.force();
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
              disabled={this.state.disable}>
              <Image
                source={require(arrowUpSrc)}
                style={[styles.vote, {tintColor: this.state.fontColor}]}
              />
              <Text style={{color: this.state.fontColor}}>Up Vote</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={async () => {
                try {
                  const key = '"' + this.props.name + '"';
                  const item = await AsyncStorage.getItem(key);
                  const parsed = await JSON.parse(item);
                  parsed.vote -= 1;
                  const str = JSON.stringify(await parsed);
                  await AsyncStorage.setItem(key, str);
                  {
                    this.props.force();
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
              disabled={this.state.disable}>
              <Image
                source={require(arrowDownSrc)}
                style={[styles.vote, {tintColor: this.state.fontColor}]}
              />
              <Text style={{color: this.state.fontColor}}>Down Vote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Contestant;
