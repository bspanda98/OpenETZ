import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import {ArrowToDetail} from '../../../components/'
import I18n from 'react-native-i18n'
export default class Setting extends Component{
  constructor(props){
  	super(props)
  	this.state={

  	}
  }

  toLanguage = () => {
    this.props.navigator.push({
      screen: 'switch_language',
      title: I18n.t('language'),
      navigatorStyle: DetailNavigatorStyle,
      navigatorButtons: {
        rightButtons: [
          {
            title: I18n.t('save'),
            id: 'save_switch_language'
          }
        ]
      }
    })
  }
  render(){
    return(
      <View>
        <ArrowToDetail
	        arrowText={I18n.t('language')}
	        arrowIcon={require('../../../images/xhdpi/ico_personalcenter_accountmanagement_def.png')}
	        arrowOnPress={this.toLanguage}
	    />
      </View>
    )
  }
}
