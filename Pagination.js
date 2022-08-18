import React, {Component} from 'react';
import {Text, View, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styleSheet';
import Contestant from './Contestant';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);

    this.state = {
      number: 0,
      url: [],
      vote: [],
      keys: [],
      names: this.getAllNames(),
      contsperpage: 5,
      curPage: 0,
      allPages: this.getAllKeys(),
    };
  }

  async handleVote() {
    await this.getAllNames();
    this.getAllKeys();
    if (this.props.order === 'default') this.getAllNames();
    else if (this.props.order === 'less') {
      let arrVote = [];
      let arrURL = [];
      let arrName = [];
      let minVote = this.state.vote[0];
      let maxVote = this.state.vote[0];
      for (let i = 0; i < this.state.number; ++i) {
        if (this.state.vote[i] < minVote) minVote = this.state.vote[i];
        if (this.state.vote[i] > maxVote) maxVote = this.state.vote[i];
      }
      for (let i = 0; i < this.state.number + 1; ++i) {
        if (minVote == this.state.vote[i]) {
          arrVote = [...arrVote, this.state.vote[i]];
          arrName = [...arrName, this.state.names[i]];
          arrURL = [...arrURL, this.state.url[i]];
        }
        if (minVote - 1 === maxVote) break;

        if (i === this.state.number - 1) {
          ++minVote;
          i = -1;
        }
      }
      this.setState({
        vote: arrVote,
        names: arrName,
        url: arrURL,
      });
    } else if (this.props.order === 'most') {
      let arrVote = [];
      let arrURL = [];
      let arrName = [];
      let minVote = this.state.vote[0];
      let maxVote = this.state.vote[0];
      for (let i = 0; i < this.state.number; ++i) {
        if (this.state.vote[i] < minVote) minVote = this.state.vote[i];
        if (this.state.vote[i] > maxVote) maxVote = this.state.vote[i];
      }
      for (let i = 0; i < this.state.number + 1; ++i) {
        if (maxVote == this.state.vote[i]) {
          arrVote = [...arrVote, this.state.vote[i]];
          arrName = [...arrName, this.state.names[i]];
          arrURL = [...arrURL, this.state.url[i]];
        }
        if (minVote - 1 === maxVote) break;

        if (i === this.state.number - 1) {
          --maxVote;
          i = -1;
        }
      }
      this.setState({
        vote: arrVote,
        names: arrName,
        url: arrURL,
      });
    } else console.log('Error');
  }

  async getAllKeys() {
    const allKeys = await AsyncStorage.getAllKeys();
    const str = await JSON.stringify(await allKeys);
    const num = await JSON.parse(await str);
    this.setState({
      keys: await str,
      number: await num.length,
      allPages: Math.ceil(
        ((await num.length) - 1) / (await this.state.contsperpage),
      ),
    });
  }
  setCurrentPage(num) {
    if (num >= 0 && num < this.state.allPages) {
      this.setState({curPage: num});
    }
  }
  async getAllNames() {
    let arrna = [];
    let arrur = [];
    let arrvo = [];
    const allKeys = await AsyncStorage.getAllKeys();
    const str = await JSON.stringify(await allKeys);
    const parsed = await JSON.parse(await str);
    for (let i = 1; i < (await parsed.length); ++i) {
      const name = await AsyncStorage.getItem(await parsed[i]);
      const parsed2 = await JSON.parse(await name);
      arrna = await [...arrna, await parsed2.name];
      arrur = await [...arrur, await parsed2.url];
      arrvo = await [...arrvo, await parsed2.vote];
    }
    this.setState({
      url: await arrur,
      names: await arrna,
      vote: await arrvo,
    });
  }

  render() {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          margin: '2.5%',
          marginRight: '5%',
        }}>
        <Contestant
          name={this.state.names[this.state.curPage * this.state.contsperpage]}
          link={this.state.url[this.state.curPage * this.state.contsperpage]}
          vote={this.state.vote[this.state.curPage * this.state.contsperpage]}
          force={this.handleVote}
        />
        <Contestant
          name={
            this.state.names[this.state.curPage * this.state.contsperpage + 1]
          }
          link={
            this.state.url[this.state.curPage * this.state.contsperpage + 1]
          }
          vote={
            this.state.vote[this.state.curPage * this.state.contsperpage + 1]
          }
          force={this.handleVote}
        />
        <Contestant
          name={
            this.state.names[this.state.curPage * this.state.contsperpage + 2]
          }
          link={
            this.state.url[this.state.curPage * this.state.contsperpage + 2]
          }
          vote={
            this.state.vote[this.state.curPage * this.state.contsperpage + 2]
          }
          force={this.handleVote}
        />
        <Contestant
          name={
            this.state.names[this.state.curPage * this.state.contsperpage + 3]
          }
          link={
            this.state.url[this.state.curPage * this.state.contsperpage + 3]
          }
          vote={
            this.state.vote[this.state.curPage * this.state.contsperpage + 3]
          }
          force={this.handleVote}
        />
        <Contestant
          name={
            this.state.names[this.state.curPage * this.state.contsperpage + 4]
          }
          link={
            this.state.url[this.state.curPage * this.state.contsperpage + 4]
          }
          vote={
            this.state.vote[this.state.curPage * this.state.contsperpage + 4]
          }
          force={this.handleVote}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Pressable
            onPress={() => this.setCurrentPage(this.state.curPage - 1)}>
            <Text style={{color: 'black'}}>Previous</Text>
          </Pressable>
          <Pressable
            onPress={() => this.setCurrentPage(this.state.curPage + 1)}>
            <Text style={{color: 'black'}}>Next</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

export default Pagination;
