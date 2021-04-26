import 'react-native-gesture-handler';
// Amplify //
import Amplify, { Auth } from 'aws-amplify';
import config from './src/Features/constants/aws-exports';
Amplify.configure(config);
import './src/Features/constants/consumer-variables.styles';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Dimensions, requireNativeComponent } from 'react-native';
// import HorizontalNavigationTabs from './src/Features/Navigation/HorizontalNavigationTabs';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

require('./env');
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const TryOnViewiOS = requireNativeComponent("BanubaTryOnViewiOS")

export default function App() {
  // const spyFunction = (msg) => { //This function helps intercept communication on the bridge between native and react-native
  //   console.log("Bridge: ",msg);
  // };
  
  // useEffect(() => {
  //   MessageQueue.spy(spyFunction);
  // },[])
  return (
    // <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <TryOnViewiOS style={ styles.wrapper }/>
        {/* <AppRoutes /> */}
      </SafeAreaView>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, //add for expo start
    paddingTop: 0,
    backgroundColor:'red'
  },
  wrapper: {
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  border: {
    borderColor: "#eee", borderBottomWidth: 1
  },
  button: {
    fontSize: 50, color: "orange"
  }
});
