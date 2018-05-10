import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  StatusBar,
  Platform,
  ScrollView,
  Keyboard
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { TextInputComponent,Btn,Loading } from '../../components/'
import { connect } from 'react-redux'
import { createAccountAction } from '../../actions/accountManageAction'

import I18n from 'react-native-i18n'
import Toast from 'react-native-toast'
class CreateAccount extends Component{
  constructor(props){
      super(props)
      this.state = {
        userNameVal: '',
        psdVal: '',
        repeadPsdVal: '',
        promptVal: '',

        userNameWarning: '',
        psdWarning: '',
        rePsdWarning: '',

        visible: false,


        mnemonicValue: '',
        seedVal: '',
        keyStoreAddress: '',
        second: 0
      }
      
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onFocus.bind(this));

  }

  componentWillReceiveProps(nextProps){
    if(this.props.accountManageReducer.createSucc !== nextProps.accountManageReducer.createSucc && nextProps.accountManageReducer.createSucc){
      this.setState({
        visible: false
      })
      Toast.showLongBottom(I18n.t('create_account_successfully'))
      this.props.navigator.push({
        screen: 'create_account_success',
        navigatorStyle: DetailNavigatorStyle,
        backButtonTitle:I18n.t('back'),
        backButtonHidden:false,
        overrideBackPress: true,
      })
    }
  }
 
   componentWillUnmount () {
    this.keyboardDidShowListener.remove();
  }
  onChangeUserNameText = (val) => {
    this.setState({
      userNameVal: val,
      userNameWarning: '',
    })
  }


  onPressBtn = () => {
    const { userNameVal, psdVal, repeadPsdVal, promptVal, } = this.state
    let reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*.]+$)[a-zA-Z\d!@#$%^&*.]{8,}$/
    if(userNameVal.length === 0){
      this.setState({
        userNameWarning: I18n.t('enter_account_name')
      })
      return
    }else{
      if(!reg.test(psdVal)){
        this.setState({
          psdWarning: I18n.t('password_verification')
        })
        return
      }else{
        if(psdVal !== repeadPsdVal){
          this.setState({
            rePsdWarning: I18n.t('passwords_different')
          })
          return
        }else{        
          this.onCreate()
        }
      }        
    }
  }

  onCreate(){
    const { userNameVal, psdVal, promptVal} = this.state
    this.setState({
      visible: true
    })

    setTimeout(() => {
      this.props.dispatch(createAccountAction({
        userNameVal,
        psdVal,
        promptVal,
        from: this.props.fromLogin === 'login' ? 'login' : 'accounts'
      }))
    },1000)
    
  }
  onChangPsdText = (val) => {
    this.setState({
      psdVal: val,
      psdWarning: '',
    })
  }
  onChangeRepeatText = (val) => {
    this.setState({
      repeadPsdVal: val,
      rePsdWarning: '',
    })
  }
  onChangePromptText = (val) => {
    this.setState({
      promptVal: val,
    })
  }
  onFocus = () => {
    this.refs._scrollview.scrollToEnd({animated: true})
    
  }
  render(){
    const { userNameVal, psdVal, repeadPsdVal, promptVal, userNameWarning, psdWarning, rePsdWarning,visible } = this.state
    const { isLoading } = this.props.accountManageReducer
    return(
      <View style={pubS.container}>
        {
          Platform.OS === 'ios' ?
            <StatusBar backgroundColor="#000000"  barStyle="dark-content"  animated={true}/>
          : null
        }
        <Loading loadingVisible={this.state.visible} loadingText={I18n.t('creating')}/>
        <ScrollView
          ref={'_scrollview'}
        >
          <View style={[styles.warningView,pubS.paddingRow_24]}>
            <Text style={pubS.font22_1}>{I18n.t('create_account_prompt')}</Text>
          </View>
          <View style={{paddingTop:10,}}>
            <TextInputComponent
              placeholder={I18n.t('account_name')}
              value={userNameVal}
              onChangeText={this.onChangeUserNameText}
              warningText={userNameWarning}
              // onFocus={this.onFocus}
            />
            <TextInputComponent
              placeholder={I18n.t('password')}
              value={psdVal}
              onChangeText={this.onChangPsdText}
              secureTextEntry={true}
              warningText={psdWarning}
            />
            <TextInputComponent
              placeholder={I18n.t('repeat_password')}
              value={repeadPsdVal}
              onChangeText={this.onChangeRepeatText}
              secureTextEntry={true}
              warningText={rePsdWarning}
            />
            <TextInputComponent
              placeholder={I18n.t('password_hint')}
              value={promptVal}
              onChangeText={this.onChangePromptText}
            />
            <Btn
              btnMarginTop={scaleSize(60)}
              btnPress={this.onPressBtn}
              btnText={I18n.t('create')}
            />
          </View>
        </ScrollView>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  warningView:{
    height: scaleSize(130),
    backgroundColor:'#FFE186',
    justifyContent:'center',

  },
})
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(CreateAccount)
