import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, TextInput, ViewPropTypes } from 'react-native'; 
 
import * as PropTypes from 'prop-types';    

import { Icon, colors, fonts } from '../../../components';

const VIEW_SIZE = {
  icon: 26, 
  baseMargin: 10
};
const FONT_SIZE = {
  input: 14
};
const CLASS_COLOR = {
  font: '#000',
  icon: 'hsla(0, 0%, 0%, 0.4)',
  place: 'hsla(0, 0%, 0%, 0.4)',
  bg: 'hsla(0, 0%, 0%, 0.03)',
  border: 'hsla(0, 0%, 0%, 0.22)'
};     
 
export default class SearchBar extends Component{    
    constructor(props){
        super(props);

        this.offsetY = 0; 
        this.rendering = false;
        this.cellHeight = this.props.style.height;

        this.state = {
            showContent: true, 
            // containHeight: this.props.data.cellHeight,//new Animated.Value(this.props.data.cellHeight), 
            text: this.props.data.text ? this.props.data.text : ''
        }
    } 

    getText(){
        return this.state.text;
    }

    resetText(){
        this.setState({text:''});
    }
  
    requireFocus(){
        if(this.textinput){ 
            this.textinput.focus();
        }
     }

    onBackButtonPress(){
      this.props.onBackButtonPress();
    }

    onEndEditing(text){
        if(this.state.text.length < 1){
        // this.setState({canEdit: TYPE.TOUCH_INPUT});
        }
    }

    renderDelButton(size){
        if(this.state.text.length < 1) return undefined;
        return (
            <TouchableOpacity style={styles.delButtonStyle} activeOpacity={0.9} onPress={() => this.setState({text: ''})}>
              <Icon name={"close"} size={VIEW_SIZE.icon * 0.6} color={CLASS_COLOR.icon}/>
            </TouchableOpacity> 
        );
     }

    renderSearchIcon(size){
        return (
            <View style={[styles.searchIconView,{width: size, height: size}]}>
                <Icon name={"magnify"} size={VIEW_SIZE.icon} color={CLASS_COLOR.icon}/>
            </View>
        );
    } 

    renderBackButtonIcon(size){
        return (
            <View style={[styles.searchIconView,{width: size, height: size}]}>
                <Icon name={"chevron-left"} size={VIEW_SIZE.icon} color={CLASS_COLOR.icon} onPress={this.onBackButtonPress.bind(this)}/>
            </View>
        );
    }

    renderLoading(){
        return ( 
          <ActivityIndicator animating={true} color={"darkgray"} size={"small"}/>  
        );
    }

    renderTouchInput(){
        const {data, onSubmit} = this.props;
        return (
            <View style={styles.touchInputViewContainer}>
                <TouchableOpacity 
                style={styles.touchInputButtonStyle} 
                activeOpacity={0.9} 
                onPress={() => onSubmit('')}
                >
                  <Text numberOfLines={1} style={styles.textTouchStyle}>{data.textPlace}</Text> 
                  <View style={styles.touchIconContentView}>
                    <Icon name={"magnify"} size={VIEW_SIZE.icon} color={CLASS_COLOR.icon}/> 
                  </View> 
                </TouchableOpacity> 
            </View>
        );
    } 

    renderTextInput() {   
        const {data, loading, backButton, onSubmit, forceEdit} = this.props;
        return (  
          <View style={styles.touchInputViewContainer}>
            <TextInput 
              ref={ (c) => this.textinput = c}
              style={[styles.textinputStyle, {paddingLeft: this.cellHeight, paddingRight: this.cellHeight}]}
              autoCorrect={false}
              keyboardType={data.keyboardType}
              autoFocus={false}
              underlineColorAndroid={"transparent"}  
              blurOnSubmit={true}
              returnKeyType={'search'}
              onEndEditing={this.onEndEditing.bind(this)}
              onSubmitEditing={() => onSubmit(this.state.text)}
              placeholder={data.textPlace} 
              placeholderTextColor={CLASS_COLOR.place}
              disableFullscreenUI={true}
              onChangeText={(text) => {
                if(loading && !forceEdit) return; 
                this.props.onChangeText(text);
                this.setState({text});
              }}
              value={this.state.text} 
            /> 
            <View style={[styles.delContainer,{width: this.cellHeight, height: this.cellHeight}]}>
                {loading ? this.renderLoading() : this.renderDelButton(this.cellHeight)}
            </View> 
            {backButton ? this.renderBackButtonIcon(this.cellHeight) : this.renderSearchIcon(this.cellHeight)}
          </View> 
        );
    }

  render() { 
    return (
        <View style={[styles.container, this.props.style]}>
            {this.props.canEdit ? this.renderTextInput() : this.renderTouchInput()}
        </View>
    ); 
  }
} 

const styles = StyleSheet.create({   
  container:{
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingLeft: VIEW_SIZE.baseMargin,
    // paddingRight: VIEW_SIZE.baseMargin,
    backgroundColor: colors.appThemInvertColor
  },
  delButtonStyle: {
    flex: 1,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center' 
  },  
  touchIconContentView: {
    height: '100%', 
    aspectRatio: 1,  
    justifyContent: 'center', 
    alignItems: 'center'
  },
  touchInputViewContainer:{ 
    width: '100%', 
    height: '80%',
    borderRadius: 5, 
    backgroundColor: CLASS_COLOR.bg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CLASS_COLOR.border
  },
  touchInputButtonStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center', 
  },
  searchIconView: {
    backgroundColor: 'transparent',
    position: 'absolute', 
    left: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  textTouchStyle: {
    flex: 1,
    fontSize: FONT_SIZE.input,
    color: CLASS_COLOR.place,
    marginLeft: VIEW_SIZE.icon / 2, 
    fontFamily: fonts.extra_light_family
  },
  textinputStyle: { 
    flex: 1, 
    width: '100%',   
    textAlign: 'left', 
    borderRadius: 5, 
    color: CLASS_COLOR.font,
    paddingVertical: 0,
    fontSize: FONT_SIZE.input,
    fontFamily: fonts.extra_light_family
  },
  delContainer: {
    backgroundColor: 'transparent',
    position: 'absolute', 
    right: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

SearchBar.defaultProps = {    
  style: {height: 44},
  onSubmit: function(txt){
  }, 
  onChangeText: function(txt){
  },
  onBackButtonPress: function(){
  }, 
  loading: false,
  canEdit: false
};

SearchBar.propTypes = {  
  style: ViewPropTypes.style,
  data: PropTypes.object,  
  onSubmit: PropTypes.func, 
  onChangeText: PropTypes.func, 
  onBackButtonPress: PropTypes.func,  
  loading: PropTypes.bool,
  canEdit: PropTypes.bool,
  backButton: PropTypes.bool,
  forceEdit: PropTypes.bool
};
