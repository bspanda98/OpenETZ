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
import { TextInputComponent,Btn,Loading } from '../../../components/'
import { importAccountAction,resetDeleteStatusAction } from '../../../actions/accountManageAction'
import { connect } from 'react-redux'
import { toSplash } from '../../../root'
import I18n from 'react-native-i18n'
import Toast from 'react-native-toast'
class Mnemonic extends Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      // mnemonicVal: 'rhythm example taxi leader divorce prosper arm add tower snake domain still',
      mnemonicVal: '',
      mnemonicValWarning: '',
      passwordVal: '',
      passwordWarning: '',
      repeadPsdVal: '',
      rePsdWarning: '',
      userNameVal: '',
      userNameWarning: '',
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.accountManageReducer.importSucc !== this.props.accountManageReducer.importSucc && nextProps.accountManageReducer.importSucc){
      this.setState({
        visible: false
      })
      Toast.show(I18n.t('import_successful'))
      setTimeout(() => {
        toSplash()
      },100)
      this.props.dispatch(resetDeleteStatusAction())
    }
  }

  onChangeMemonic = (val) => {
    this.setState({
      mnemonicVal: val,
      mnemonicValWarning: ''
    })
  }
  onChangPassword = (val) => {
    this.setState({
      passwordVal: val,
      passwordWarning: ''
    })
  }
  onChangeRePassword = (val) => {
    this.setState({
      repeadPsdVal: val,
      rePsdWarning: ''
    })
  }
  onChangeUseNameText = (val) => {
    this.setState({
      userNameVal: val,
      userNameWarning: ''
    })
  }
  onPressImport = () => {
   const { mnemonicVal, mnemonicValWarning, passwordVal, passwordWarning, repeadPsdVal, rePsdWarning,userNameVal } = this.state
   // let psdReg = /^(?=.*[a-z])(?=.)(?=.*\d)[a-z\d]{8,}$/ 
   let psdReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,}$/
   if(userNameVal.length === 0){
      this.setState({
        userNameWarning: I18n.t('enter_account_name')
      })
    }else{
      if(mnemonicVal.length === 0){
        this.setState({
          mnemonicValWarning: I18n.t('mnemonic_phrase_warning')
        })
      }else{
        if(!psdReg.test(passwordVal)){
          this.setState({
            passwordWarning: I18n.t('password_verification')
          })
        }else{
          if(passwordVal !== repeadPsdVal){
            this.setState({
              rePsdWarning: I18n.t('passwords_different')
            })
          }else{
            this.onImport()
          }
        }
      }
    }
  }

  onImport = () => {
    const { mnemonicVal, passwordVal, userNameVal} = this.state  
    this.setState({
      visible: true
    })
    setTimeout(() => {
      this.props.dispatch(importAccountAction({
        mnemonicVal,
        mnemonicPsd: passwordVal,
        mnemonicUserName: userNameVal,
        type: 'mnemonic',
      }))
    },1000)
    
  }
  render(){
    const { mnemonicVal, mnemonicValWarning, passwordVal, passwordWarning, repeadPsdVal, rePsdWarning,userNameVal, userNameWarning } = this.state
    return(
      <View style={pubS.container}>
        <Loading loadingVisible={this.state.visible} loadingText={I18n.t('loading_importing_account')}/>
        <TextInputComponent
          placeholder={I18n.t('account_name')}
          value={userNameVal}
          onChangeText={this.onChangeUseNameText}
          warningText={userNameWarning}//
        />
        <TextInputComponent
          isMultiline={true}
          placeholder={I18n.t('mnemonic_phrase_1')}
          value={mnemonicVal}
          onChangeText={this.onChangeMemonic}
          warningText={mnemonicValWarning}
          iptMarginTop={scaleSize(60)}
        />
        <TextInputComponent
          placeholder={I18n.t('password')}
          value={passwordVal}
          onChangeText={this.onChangPassword}
          secureTextEntry={true}
          warningText={passwordWarning}
        />
       
        <TextInputComponent
          placeholder={I18n.t('repeat_password')}
          value={repeadPsdVal}
          onChangeText={this.onChangeRePassword}
          secureTextEntry={true}
          warningText={rePsdWarning}
        />

        <Btn
          btnMarginTop={scaleSize(60)}
          btnPress={this.onPressImport}
          btnText={I18n.t('import')}
        />
      </View>
    )
  }
}
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(Mnemonic)