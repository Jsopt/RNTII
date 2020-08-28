 import React, { Component } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View, ViewPropTypes, StyleSheet } from 'react-native';
 import * as PropTypes from 'prop-types';   
 
import { windows, colors, fonts } from '../../../components';   

export default class LoadingButton extends Component {    
  constructor(props) {
    super(props);   
  }    
 
  onPress(){
  	const {data, callback} = this.props; 
  	callback(data.id);
  }

  render(){      
  	const {data, style, loading} = this.props;
    return ( 
     	<TouchableOpacity activeOpacity={0.8} style={style} onPress={this.onPress.bind(this)}>
     		{ loading 
     			? <ActivityIndicator size={"small"} color={colors.appThemInvertColor} />
      			: <Text numberOfLines={1} style={[styles.textStyle, {fontSize: data.fontSize}]}>{data.txt}</Text>
     		}
    	</TouchableOpacity>
    );
  }
} 

const styles = StyleSheet.create({
  textStyle: { 
    color: colors.appThemInvertColor,
    fontFamily: fonts.light_family
  } 
})

LoadingButton.defaultProps = {  
	data: {

	},
	style: { 
	},
	callback: (e) => {

	}
};

LoadingButton.propTypes = {  
	callback: PropTypes.func,
	loading: PropTypes.bool,
	data: PropTypes.object,
	style: ViewPropTypes.style 
};

 