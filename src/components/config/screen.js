import {Dimensions, Platform, StatusBar} from 'react-native'; 

const windows = Dimensions.get('window');   

export default {
  screen_width: windows.width,
  screen_height: windows.height,
  navigate_height: (Platform.OS === 'android') ? 48 : 50,
  statusBar_height: (Platform.OS === 'android') ? StatusBar.currentHeight : 24    
};
