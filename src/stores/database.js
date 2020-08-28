import { observable, action, computed } from 'mobx';
import { Alert, Platform } from 'react-native';  
import { stores } from '../common';  
//import * as manager from '../manager';    
import AsyncStorage from '@react-native-community/async-storage'; 

class ObservableAppStore {     

	@observable userToken = null;
  	
  	constructor() {    

  		this.getUserToken();
	}     

  	async getUserToken(){ 
    	try { 
      		const userToken = await AsyncStorage.getItem('@app:token');
       		this.userToken = userToken;  
    	} catch (error) {
      // Error retrieving data
    	}
  	} 

  	@action async setUserToken(userToken){  
		try { 
			await AsyncStorage.setItem('@app:token', userToken); 
			this.userToken = userToken;   
		} catch (error) { 
		// Error retrieving data
		}
	}

	@action async removeUserToken(){  
		await AsyncStorage.removeItem('@app:token', (e) => {  
			this.userToken = null;
		});
	}

 
} 

const observableAppStore = new ObservableAppStore()
export default observableAppStore