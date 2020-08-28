import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 
import { Navigation } from 'react-native-navigation';

import { observer, stores } from '../../../common';    
import { Icon, colors, windows, fonts, language } from '../../../components';   
 
const VIEW_SIZE = {
  baseMargin: 10
};
const TEXT_SIZE = {title: 18, description: 17}; 
 
@observer
export default class MainScreen extends Component {
 static get options() {
    return {  
      topBar: {      
        elevation: 0, 
        background: {
          color: '#fff'
        },
        rightButtons: [
          {
            icon: stores.app.icon['logout-variant'],
            id: 'logout',
            color: colors.top_icon
          }
        ]
        // title: {
        //   text: language.t('txt_contacts_nav')
        // }
      }
    };
  }  

  constructor(props) {
    super(props);  
    
    this.app = stores.app;   
    this.navigate = stores.navigation; 
    this.database = stores.database;

    this.state = {  
      loading: false
    };

    Navigation.events().bindComponent(this);
  }        

  navigationButtonPressed({buttonId}){
    switch(buttonId) {  
      case 'logout':  
        // return; 
        break;
    }
  }   

   
  render(){ 
    return (
      <SafeAreaView ref={(c) => this.refView = c} style={styles.container} >   
         <Text style={styles.titleTextStyle}>Main Screen</Text>
      </SafeAreaView>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    //width: windows.screen_width, 
    //height: windows.screen_height,// - windows.statusBar_height, 
    alignItems: 'center',
    backgroundColor: '#fff'
  },  
  titleTextStyle: { 
    color: '#000',
    fontSize: TEXT_SIZE.title,
    fontFamily: fonts.medium_family,
    textAlign: 'center'
  } 
});
