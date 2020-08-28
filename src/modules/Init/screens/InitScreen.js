import React, { Component } from 'react';
import { Alert, ActivityIndicator, StyleSheet, View } from 'react-native'; 
//import { Navigation } from 'react-native-navigation';
import { observer, stores } from '../../../common';   
import getIconType from 'react-native-vector-icons/MaterialCommunityIcons';

import { Api, conf, colors, language } from '../../../components';    

const FA5Style = {
  regular: 0,
  light: 1,
  solid: 2,
  brand: 3,
}; 

var ICON_LIST = {
  'logout-variant': [22, "#000000"], 
  'close': [22, "#000000"],
  'refresh': [22, "#000000"],
  'arrow-left': [22, "#000000"]  
} 

@observer
export default class InitScreen extends Component {

  constructor(props) {
    super(props);  
    
    this.app = stores.app; 
    this.navigate = stores.navigation;
    this.database = stores.database;
 
  }      

  componentDidMount(){
    this.populateIcons();
    // const userToken = this.database.userToken;
    // if(userToken){
      
    // } 
    setTimeout(function(){
      this.navigate.setToMainScreen();
    }.bind(this), 1000); 
  }    

  fetch(token){  
    Api
    .post(`${conf.api}${conf.init}`,{token})
    .then((responseJson) => {     
      if(!this.refView) return;   
      if(responseJson.status){  
        // this.navigate.setToMainScreen(); 
      }else{ 
        // this.navigate.setToLoginScreen();
      }
    })
    .catch((e) => {      
      // TODO show error screen
    }); 
  }

  populateIcons() {
    Promise.all(Object.keys(ICON_LIST).map((item) => {
        return getIconType.getImageSource(item, ICON_LIST[item][0], ICON_LIST[item][1], FA5Style.solid)
    })).then((values) => {
        Object.keys(ICON_LIST).forEach((iconName, idx) => (this.app.icon[iconName] = values[idx]));
    }).catch((error) => {}).done(); 
  };   
 
  renderLoading(){
    return (
      <View style={styles.loadingView}> 
        <ActivityIndicator size="small" color={colors.app_them} /> 
      </View>
    ); 
  }
  
  render(){
    return (
      <View ref={(c) => this.refView = c} style={styles.container} >    
        {this.renderLoading()}  
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: windows.screen_width, 
    //height: windows.screen_height,// - windows.statusBar_height, 
    backgroundColor:  'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center'
  } 
});
