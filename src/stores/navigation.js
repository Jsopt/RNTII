import {observable, action, computed} from 'mobx';
import {Alert} from 'react-native';  
import { Navigation } from 'react-native-navigation' 
import * as Route from './route';   
 

class NavigationObservable {     
 
  @observable overlayComponents = {};
  @observable screensId = [];
  @observable statusBarHeight = -1;

  constructor() {     
    this.loadStatusBarHeight();
  }     

  async loadStatusBarHeight(){
    const constants = await Navigation.constants();
    this.statusBarHeight = constants.statusBarHeight;   
  }

  @action addOverlayComponent(componentId){
    this.overlayComponents[componentId] = componentId; 
  }

  @action showModal(screen, data={}, option={}) {
    return Navigation.showModal({
      component: {
        name: screen,
        passProps: { 
          data
        },
        ...option
      }
    });
  } 

  @action showOverlay(screen, data={}, touchOutside = true) {
    return Navigation.showOverlay({
      component: {
        name: screen,
        passProps: { 
          data
        },
        options: { 
          layout: { 
            backgroundColor: "transparent",
            componentBackgroundColor: "transparent"
          },
          overlay: {
            interceptTouchOutside: touchOutside
          }
        }
      }
    });
  }

  @action dismissModal(componentId){
    Navigation.dismissModal(componentId);
  }

  @action dismissOverlay(componentId){ 
    if(!this.overlayComponents[componentId]) return;
    Navigation.dismissOverlay(componentId);
    this.overlayComponents[componentId] = undefined; 
  }

  @action forceDismissOverlay(){ 
    for (var key in this.overlayComponents) {
      const componentId = this.overlayComponents[key];
      if(componentId){
        Navigation.dismissOverlay(componentId);
        this.overlayComponents[key] = undefined;
      } 
    } 
  }

  @action setToMainScreen(){
    Route.ToMainScreen();
  }     

  @action setToLoginScreen(){
    Route.ToLoginScreen();
  } 

  @action setToErrorScreen(data){
    Route.ToErrorScreen(data);
  }  

  //@action setTo(screen, data = {}) {
    // return Route.setTo(screen, data);
  //}

  @action pushTo(componentId, screen, data={}, option={}) {
    if(componentId === this.screensId[this.screensId.length - 1]) return;
    return Navigation.push(componentId, {
        component: {
            name: screen,
            passProps: { 
              data
            },
            ...option
        },
    });
  }

  @action pop(componentId) {
    return Navigation.pop(componentId);
  }

  @action pushUnmount(componentId){ 
    this.screensId.pop(); 
  }
 

  @action changeTitle(componentId,title) {
    return Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: title
        }
      },
    });
  }

} 

const Navigationobservable = new NavigationObservable()
export default Navigationobservable