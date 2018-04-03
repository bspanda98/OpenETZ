import React, { Component } from 'react'
import {
  StatusBar,
  Platform,
  BackHandler,
  NetInfo,

} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { registerScreens, registerScreenVisibilityListener, } from './config/'
import { getPixelRatio } from './utils/adapter'
import { TabBarAppStyle,AssetsNavStyle,MainThemeNavColor } from './styles/'
registerScreens()
registerScreenVisibilityListener()
getPixelRatio()



const bottomTabStyle = {
  top: 6,
  left: 6,
  bottom: 6,
  right: 6,
}

const tabs = [
  {
    label: 'Assets',
    screen: 'home_assets',
    icon: require('./images/xhdpi/tab_ico_personalcenter_assets_def.png'),
    selectedIcon: require('./images/xhdpi/tab_ico_home_asset_def.png'),
    navigatorStyle: Object.assign({},AssetsNavStyle,{ navBarHidden: true, }), //AssetsNavStyle, //tabBarHidden: true,  navBarHidden: true,
    iconInsets: bottomTabStyle
  },
  {
    label: 'Mine',
    screen: 'home_personal',
    icon: require('./images/xhdpi/tab_ico_home_personalcenter_def.png'),
    selectedIcon: require('./images/xhdpi/tab_ico_personalcenter_personal_def.png'),
    navigatorStyle: Object.assign({},AssetsNavStyle,{ navBarHidden: true, }),
    iconInsets: bottomTabStyle
  },

]

function toHome () {

   return Navigation.startTabBasedApp({
            tabs,
            appStyle: TabBarAppStyle,
            drawer: {
              right: {
                screen: 'switch_wallet'
              }
            }
          })

}

function toLogin () {
  return Navigation.startSingleScreenApp({
          screen: {
            screen: 'login',
            navigatorStyle: {navBarHidden: true,statusBarColor:'#144396'},
          }
        })
}

function toSplash () {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'splash',
      navigatorStyle: {navBarHidden: true,statusBarColor:'#144396'},
    }
  })
}

toSplash()

export {
  toHome,
  toLogin,
  toSplash
}
