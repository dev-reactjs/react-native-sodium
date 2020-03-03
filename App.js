// @flow

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import Sodium from 'react-native-sodium';

export default class Example extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nonce: '',
      pk: '',
      sk: '',
    };
  }

  async _testSodium() {
    let keybob = await Sodium.crypto_box_keypair();
    let keyalice = await Sodium.crypto_box_keypair();
    Sodium.randombytes_random().then(nonce => {
      this.setState({
        nonce,
        pk: keybob.pk,
        sk: keyalice.sk,
      })
      Sodium.crypto_box_easy(
        'Hello World',
        toString(nonce),
        keybob.pk,
        keyalice.sk,
      ).then(rr => console.log(rr));
    });
  }

  componentDidMount() {
    this._testSodium();
  }

  render() {
    const { nonce, pk, sk } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View onPress={() => this._testSodium()} style={{ top: 30 }}>
          <Text style={styles.welcome}>React Native Sodium</Text>
          <Text style={styles.welcome}>{`Generated Public Key - ${pk}`}</Text>
          <Text style={styles.welcome}>{`Generated Secret Key - ${sk}`}</Text>
          <Text style={styles.welcome}>{`Nonce  -  ${nonce}`}</Text>
        </View>
      </View>
    );
  }
}