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

class RecordListItem extends Component{
  static defaultProps = {
    moneyTextColor: '#657CAB',
    payFail: false,
    listIcon: require('../../../images/xhdpi/etz_logo.png'),
    style: {},
    listIconStyle: {width: scaleSize(44),height:scaleSize(44)},
    onPressListItem: undefined,
  }
  render(){
    const { payFail,moneyTextColor,listIcon,style,listIconStyle, onPressListItem, receiverAddress, receiverTime, receiverVal} = this.props
    return(
      <TouchableOpacity style={[styles.container,pubS.rowCenterJus,pubS.padding50,style]} activeOpacity={ onPressListItem ? .7 : 1 } onPress={onPressListItem}>
        <Image source={listIcon} style={listIconStyle}/>
        <View style={[styles.listItemTextView,pubS.rowCenterJus]}>
          <View style={[{height:'100%',justifyContent:'space-between'},pubS.paddingCloumn20]}>
            <Text style={pubS.font28_3}>{receiverAddress}</Text>
            <Text style={pubS.font24_4}>{receiverTime}</Text>
          </View>

          <View style={[{height:'100%',justifyContent:'space-between',alignItems:'flex-end'},pubS.paddingCloumn20,payFail ? null : pubS.center]}>
            <Text style={{fontSize: setScaleText(28),color:moneyTextColor}}>{`${receiverVal}ETZ`}</Text>
            {
              payFail ?
              <Text style={pubS.font24_1}>Pay Fail</Text>
              : null
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listItemTextView:{
    width: scaleSize(600),
    height: scaleSize(130),
    marginLeft: scaleSize(18)
    // borderWidth:1,
  },
  container: {
    height: scaleSize(130),
    width: scaleSize(750),
    backgroundColor:'#fff',

  },
})
export default RecordListItem
