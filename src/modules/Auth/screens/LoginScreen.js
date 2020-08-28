import React, { Component } from 'react';
import { Alert, ActivityIndicator, NativeModules, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; 
//import { Navigation } from 'react-native-navigation';
import { observer, stores } from '../../../common';    
import { Api, Icon, conf, colors, windows, fonts, language } from '../../../components';  
 
import LoadingButton from '../elements/LoadingButton';

const VIEW_SIZE = {
  baseMargin: 10
}; 
const TEXT_SIZE = {title: 24};
 
@observer
export default class LoginScreen extends Component { 
  constructor(props) {
    super(props);  
    
    this.app = stores.app;   
    this.navigate = stores.navigation;
    this.database = stores.database; 
 
    this.state = { 
      loading: false, 
    };
  }           

  fetch(number){ 
    Api
    .post(`${conf.api}${conf.signin}`,{number})
    .then((responseJson) => {     
      
    })
    .catch((e) => {     
       
    })    
  }   

  render(){
    return (
      <SafeAreaView ref={(c) => this.refView = c} style={styles.container} >   
        <ScrollView bounces={false} keyboardShouldPersistTaps={'handled'} style={styles.scrollContainer} contentContainerStyle={styles.container}>    
          <Text style={styles.titleTextStyle}>Login Screen</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    //width: windows.screen_width, 
    //height: windows.screen_height,// - windows.statusBar_height, 
    alignItems: 'center' 
  }, 
  scrollContainer: { 
    width: '100%',
    height: '100%' 
  }, 
  titleTextStyle: {
    marginTop: VIEW_SIZE.baseMargin,
    color: '#000',
    fontSize: TEXT_SIZE.title,
    fontFamily: fonts.regular_family
  } 
});
