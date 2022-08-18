import React, {Component} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import styles from './styleSheet';

import AppBar from './AppBar';
import SubmitALink from './SubmitALink';
import Pagination from './Pagination';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.handleChild = this.handleChild.bind(this);
    this.state = {
      order: 'default',
    };
  }
  handleChild() {
    this.child.handleVote();
  }

  render() {
    return (
      <View style={[styles.view, {alignItems: 'center'}]}>
        <AppBar />

        <SubmitALink
          navigation={this.props.navigation}
          func={this.handleChild}
        />
        <View style={styles.divider} />
        <View style={styles.order}>
          <Picker
            style={{padding: 0, margin: 0}}
            mode="dropdown"
            selectedValue={this.state.order}
            onValueChange={value => {
              this.setState({order: value}, this.handleChild);
            }}>
            <Picker.Item label="Order By" value="default" />
            <Picker.Item label="Most Voted (Z -> A)" value="most" />
            <Picker.Item label="Less Voted (A -> Z)" value="less" />
          </Picker>
        </View>

        <Pagination
          ref={child => {
            this.child = child;
          }}
          {...this.props}
          order={this.state.order}
        />
      </View>
    );
  }
}

export default HomeScreen;
