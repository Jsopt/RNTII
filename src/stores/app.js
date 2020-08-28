//fix code 9901 top
import { observable, action, computed } from 'mobx';
import { Alert, Linking, NativeEventEmitter, NativeModules, Platform } from 'react-native'; 
 
import * as Route from './route';   
 

class ObservableAppStore {    
  
  @observable activeAccountSignInStatus = -1;   
  @observable icon = []; 

  constructor() {     
  }     

  

  // @action handleApp(appState){
  
  // }

  
} 

const observableAppStore = new ObservableAppStore()
export default observableAppStore