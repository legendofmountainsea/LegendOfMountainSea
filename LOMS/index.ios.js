/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class LOMS extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          LegendOfMountainSea
        </Text>
        <Text style={styles.instructions}>
          4X sandbox game
        </Text>
        <Text style={styles.instructions}>
          with legend of Mountain and Sea Classics
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LOMS', () => LOMS);
