import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'; 

import { stores } from '../common';  
import { colors, language } from '../components';    

 

export const ToMainScreen = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'MainScreen',
                        options: {
                            statusBar: {
                                visible: true,
                                style: 'dark',
                                drawBehind: false,
                                backgroundColor:  Platform.OS === 'android' ? '#ffffff' : null
                            } 
                            //  topBar:{
                            //     visible: true,
                            //     drawBehind: false
                            // }
                        }
                    }
                }] 
            }
        }
    });  
}
 

export const ToLoginScreen = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'LoginScreen',
                        options: {
                            statusBar: {
                                visible: true,
                                style: 'dark',
                                drawBehind: false,
                                backgroundColor:  Platform.OS === 'android' ? '#ffffff' : null
                            },
                             topBar:{
                                visible: false,
                                drawBehind: true
                            }
                        }
                    }
                }] 
            }
        }
    });  
}

 
 

 