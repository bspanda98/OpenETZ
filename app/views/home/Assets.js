import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform
} from 'react-native'

import { pubS,DetailNavigatorStyle,MainThemeNavColor,ScanNavStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import Drawer from 'react-native-drawer'
import { connect } from 'react-redux'
import { onSwitchDrawerAction } from '../../actions/onSwitchDrawerAction'
import SwitchWallet from './SwitchWallet'
import { switchDrawer } from '../../utils/switchDrawer'

const DATA = [
  {
    short_name: 'ETZ',
    full_name: 'EtherZero',
    logo: '',
    price: '',
    coin_number: '',
    is_add: '',
  }
]

class Assets extends Component{
  constructor(props){
    super(props)
    this.state = {
      etzBalance: 0,
      navTitle: ''
    }
  }


  componentWillMount(){

    const { accountInfo } = this.props.accountManageReducer
    accountInfo.map((val,index) => {
      // console.log('val1111111111111',val)
      if(val.is_selected === 1){
        this.setState({
          navTitle: val.account_name
        })

        web3.eth.getBalance(`0x${val.address}`).then((res,rej)=>{
          // console.log('res==',res)
          this.setState({
            etzBalance: web3.utils.fromWei(res,'ether')
          })
        })
      }
    })

  }


  toAssetsDetail = () => {
    this.props.navigator.push({
      screen: 'asset_detail_list',
      title:'ETZ',
      navigatorStyle: MainThemeNavColor,
      passProps:{
        etzBalance: this.state.etzBalance,
        etz2rmb: 0,
      }
    })
  }

  onScan = () => {
    this.props.navigator.push({
      screen: 'scan_qr_code',
      title:'Scan',
      navigatorStyle: Object.assign({},DetailNavigatorStyle,{
        navBarTextColor:'#fff',
        navBarBackgroundColor:'#000',
        statusBarColor:'#000',
        statusBarTextColorScheme:'light',
      }),
    })
  }

  onPay = () => {
    this.props.navigator.push({
      screen: 'on_payment',
      title:'Payment',
      navigatorStyle: DetailNavigatorStyle,
      
    })
  }
  onCollection = () => {
    this.props.navigator.push({
      screen: 'on_collection',
      title:'Receive',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  onTradingRecord = () => {
    this.props.navigator.push({
      screen: 'trading_record',
      title:'Transaction Records',
      navigatorStyle: MainThemeNavColor,
      // navigatorButtons: {
      //   rightButtons: [
      //     {
      //       icon: require('../../images/xhdpi/nav_ico_transactionrecords_picker_def.png'),
      //       id: 'calendar_picker'
      //     }
      //   ]
      // }
    })
  }
  
  addAssetsBtn = () => {
    this.props.navigator.push({
      screen: 'add_assets',
      title:'Add Assets',
      navigatorStyle: DetailNavigatorStyle,
    })
  }

  onDrawerCloseStart = () => {
    switchDrawer(false)
    // this.props.dispatch(onSwitchDrawerAction(0))
  }
  onDrawerOpenStart = () => {
    switchDrawer(true)
    // this.props.dispatch(onSwitchDrawerAction(1))
  }
  onCloseDrawer = () => {
    this._drawer.close()
  }
  onLeftDrawer = () => {
    this.props.navigator.push({
      screen:'msg_center_list',
      title:'MessageCenter',
      navigatorStyle: DetailNavigatorStyle,
      navigatorButtons: {
        rightButtons: [
          {
              title:'Readed All',
              id: 'readed_all'
          }
        ],
      },
    })
  }

  onRightDrawer = () => {
    this._drawer.open()
  }
  renderItem = (item) => {
    return(
      <TouchableOpacity style={[styles.listItemView,styles.whStyle]} activeOpacity={.7} onPress={this.toAssetsDetail}>
        <Image source={require('../../images/xhdpi/etz_logo.png')} style={{width: scaleSize(44),height:scaleSize(44),marginTop: scaleSize(22)}}/>
        <View style={[styles.listItemTextView]}>
          <View style={pubS.rowCenterJus}>
            <Text style={pubS.font36_2}>ETZ</Text>
            <Text style={pubS.font36_2}>{this.state.etzBalance}</Text>
          </View>
          <View style={pubS.rowCenterJus}>
            <Text style={pubS.font24_2}>EtherZero</Text>
            <Text style={pubS.font24_2}>≈ ¥ 0</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  ListFooterComponent = () => {
    return(

      <TouchableOpacity style={[styles.whStyle,styles.addBtnStyle,pubS.center]} activeOpacity={.7} onPress={this.addAssetsBtn}>
        <Text style={pubS.font24_3}>+添加资产</Text>
      </TouchableOpacity>
    )
  }
  ListHeaderComponent = () => {
    return(
      <View>
        <View style={[styles.navbarStyle,pubS.rowCenterJus,{paddingLeft: scaleSize(24),paddingRight: scaleSize(24)}]}>
            {
              // <TouchableOpacity activeOpacity={.6} onPress={this.onLeftDrawer}>
              //   <Image source={require('../../images/xhdpi/nav_ico_home_message_def.png')}style={styles.navImgStyle}/>
              // </TouchableOpacity>
              
            }
            <View style={styles.navImgStyle}/>
            <Text style={pubS.font30_1}>{this.state.navTitle}</Text>
            <TouchableOpacity activeOpacity={.6} onPress={this.onRightDrawer}>
              <Image source={require('../../images/xhdpi/nav_ico_home_more_def.png')} style={styles.navImgStyle}/>
            </TouchableOpacity>
          </View>
          <View>
            <View style={[styles.assetsTotalView,pubS.center]}>
                <Text style={pubS.font72_1}>≈0</Text>
                <Text style={pubS.font26_3}>Total Assets(￥)</Text>
            </View>

            <View style={[styles.optionView,pubS.center]}>
                <View style={[pubS.rowCenterJus,{width: scaleSize(650)}]}>
                  <TouchableOpacity activeOpacity={.7} onPress={this.onScan} style={[styles.optionItem]}>
                    <Image source={require('../../images/xhdpi/btn_ico_home_scan_def.png')} style={styles.itemImageStyle}/>
                    <Text style={[pubS.font24_2,]}>Scan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.7} onPress={this.onPay} style={[styles.optionItem]}>
                    <Image source={require('../../images/xhdpi/btn_ico_home_payment_def.png')} style={styles.itemImageStyle}/>
                    <Text style={[pubS.font24_2,]}>Payment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.7} onPress={this.onCollection} style={[styles.optionItem]}>
                    <Image source={require('../../images/xhdpi/btn_ico_home_collection_def.png')} style={styles.itemImageStyle}/>
                    <Text style={[pubS.font24_2,]}>Receive</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.7} onPress={this.onTradingRecord} style={[styles.optionItem]}>
                    <Image source={require('../../images/xhdpi/btn_ico_home_transactionrecords_def.png')} style={styles.itemImageStyle}/>
                    <Text style={[pubS.font24_2,]}>Records</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
      </View>
    )
  }
  render(){

    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB'}]}>
        <Drawer
          ref={(ref) => this._drawer = ref}
          type="overlay"
          openDrawerOffset={0.4}
          side={'right'}
          tapToClose={true}
          ref={(ref) => this._drawer = ref}
          content={<SwitchWallet thisPorps={this} onCloseSwitchDrawer={this.onCloseDrawer}/>}
          onCloseStart={this.onDrawerCloseStart}
          onOpenStart={this.onDrawerOpenStart}
        >
          <FlatList
            data={DATA}
            renderItem={this.renderItem}
            keyExtractor = {(item, index) => index}
            ListFooterComponent={this.ListFooterComponent}
            ListHeaderComponent={this.ListHeaderComponent}
          />
        </Drawer>
          
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navImgStyle: {
    width:scaleSize(40),
    height: scaleSize(40)
  },
  navbarStyle:{
    height: scaleSize(87),
    backgroundColor: '#144396',
  },
  addBtnStyle:{
    borderStyle:'dashed',
    borderColor:'#B1CBFF',
    borderWidth: 1,
    borderRadius:4,
    marginTop: scaleSize(20),
    alignSelf:'center',
  },
  whStyle: {
    height: scaleSize(120),
    width: scaleSize(702),
  },
  listItemTextView:{
    width: scaleSize(618),
    marginLeft:scaleSize(18),
    paddingTop: scaleSize(15),
    paddingBottom: scaleSize(22),
    // borderColor:'red',
    // borderWidth:1,
  },
  listItemView:{
    backgroundColor:'#fff',
    paddingLeft: scaleSize(22),
    paddingRight: scaleSize(22),
    justifyContent:'center',
    flexDirection:'row',
    borderRadius: 4,
    alignSelf:'center',
    marginTop: scaleSize(20),
  },
  itemImageStyle:{
    height: scaleSize(90),
    width: scaleSize(90)
  },
  optionItem: {

    alignItems:'center',
    // borderColor:'blue',
    // borderWidth:1,
  },
  optionView: {
    height: scaleSize(180),
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50),
    backgroundColor:'#fff',
    // borderColor:'red',
    // borderWidth:1,
  },
  assetsTotalView: {
    height: scaleSize(300),
    backgroundColor:'#144396',
    // backgroundColor:'red',

  }
})
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(Assets)
