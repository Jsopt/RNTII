import { Navigation } from 'react-native-navigation'; 
import { Platform } from 'react-native';   

import colors from './components/config/colors'; 
 
import { stores } from './common';    

Navigation.registerComponent('InitScreen', () => require('./modules/Init/screens/InitScreen').default);   

Navigation.registerComponent('MainScreen', () => require('./modules/Main/screens/MainScreen').default);   

Navigation.registerComponent('LoginScreen', () => require('./modules/Auth/screens/LoginScreen').default);      

Navigation.events().registerAppLaunchedListener(() => {   
    // on ios this func call addListener (RNNEventEmitter.m) 
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        style: 'dark',
        drawBehind: false, 
        backgroundColor: '#ffffff'
      },
      layout: {
        backgroundColor: 'transparent',
        orientation: ['portrait'] // 'landscape' An array of supported orientations
      },
      topBar: {  
        background: {
          color: colors.app_them_invert,
        }, 
        title: {
          textFontSize: 16,
          color: colors.app_them,
          fontFamily: 'Kanit-Medium',
          alignment: 'center'
        },   
        largeTitle: {
          visible: false,
          fontSize: 30,
          color: colors.app_them,
          fontFamily: 'Kanit-Medium'
        }, 
        noBorder: true,
        buttonColor: colors.app_them,
        backButton:{ color: colors.app_them, title: ""}
      },
      bottomTabs: {
        backgroundColor: colors.app_them_invert
      },
    // animations: {
    //   push: { 
    //       content: {
    //             x: {
    //               from: 0,
    //               to: 100,
    //               duration: 1000,
    //               interpolation: 'accelerate',
    //             }
    //       }
    //   } 
    // } 
    });   

    //stores.navigation.setToMainScreen();

    Navigation.setRoot({
      root: { 
        component: {
          name: 'InitScreen',
          options: {
            topBar:{
                visible: false,
                drawBehind: true
            } 
          }
        } 
      }
    });   

}); 

 
 