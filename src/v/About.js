import React from 'react';
import {Alert,Clipboard,Image,ListView, Modal, View, Text, StyleSheet, ScrollView, TouchableHighlight,TouchableOpacity,NativeModules,Linking} from "react-native";
import {Actions} from "react-native-router-flux"
import RNFS from 'react-native-fs'
import I18n from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info'
import styles from '../style'
import NetworkInfo from 'react-native-network-info'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from '@remobile/react-native-toast'

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            modalVisible:false,
            id:'',
            ips:{},
            ip:'127.0.0.1',
        }
        this.copy=this.copy.bind(this)
    }
    componentWillMount() {
        NetworkInfo.getAllIPs(ips => {
            let json = JSON.parse(ips)
            //let k1 = Object.keys(json)[0]
            let if0 = this.getPrimaryIPMask(json)
            this.setState({
                ip:if0.addr,
                ips:json,
            })
        });
    }
    getPrimaryIPMask(ips){
        let pip = {addr:'127.0.0.1',mask:'255.255.255.255'}
        if(ips['en0/ipv4']){
            pip=ips['en0/ipv4']
        }else if(ips['en0/ipv6']){
            pip=ips['en0/ipv6']
        }else if(ips['pdp_ip0/ipv4']){
            pip=ips['pdp_ip0/ipv4']
        }else if(ips['pdp_ip0/ipv6']){
            pip=ips['pdp_ip0/ipv6']
        }
        return pip
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible}); 
    }
    renderModalIPs(){
        let keys = Object.keys(this.state.ips)
        keys.sort()
        return (
        <Modal 
            animationType={"slide"} 
            transparent={false} 
            visible={this.state.modalVisible} 
            //onRequestClose={() => {alert("Modal has been closed.")}} 
        > 
            <View style={{flex:1}}>
                <Icon 
                    name={'times-circle'} 
                    size={30} 
                    onPress={()=>{this.setModalVisible(!this.state.modalVisible)}}
                    style={{marginTop:16,marginLeft:5}}
                />
                <View
                  style={{
                    flex:1,
                    margin:10,
                    //alignItems:'center',
                    justifyContent:'center',
                  }}
                >
                  {keys.map(k=>{
                    let addr = this.state.ips[k].addr
                    return (
                      <View style={{flexDirection:'row',}} key={k} onPress={()=>this.copy(addr)}>
                        <Text style={{fontSize:12,width:60}}>{k.split('/')[0]}</Text>
                        <View>
                          <Text style={{fontSize:12}}>{addr}</Text>
                          <Text style={{fontSize:12}}>{this.state.ips[k].mask}</Text>
                          <Text/>
                        </View>
                      </View>
                    )
                  })}
                </View> 
            </View> 
        </Modal>
        )
    }
    copy(value){
        Toast.show(I18n.t('copy')+' '+I18n.t('ip')+': '+value)
        //alert('copy '+value)
        Clipboard.setString(value)
    }
    //this.renderField(I18n.t('id'), this.state.id)
    renderField(title,value){
        return (
            <View style={styles.detail_card}>
               <View style={{flexDirection:'row',justifyContent:'center'}}>
                  <Text style={{width:40,fontSize:16,margin:3,fontWeight:'bold',color:'black',}}> {title}: </Text>
                  <View style={{flex:1,flexDirection:'row',justifyContent: 'center'}}>
                      <Text style={{fontSize:12,margin:6,}} onPress={()=>this.copy(value)}>{value}</Text>
                      <View style={{flex:1}} />
                      <Icon name={'eye'} size={20} style={{width:40}} onPress={()=>this.setModalVisible(!this.state.modalVisible)} />
                  </View>
               </View>
            </View>
        )
    }
    renderIcon(){
        return (
            <View style={{flex:1,height:200,justifyContent: 'center',alignItems:'center'}}>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Image 
                    style={{width: 100, height: 100, backgroundColor:'white'}}
                    source={require('./img/xconn.png')}
                />
                <Text style={{justifyContent:'center'}} >{I18n.t('xconn')} {DeviceInfo.getVersion()}</Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
            </View>
        )
    }
    renderCopyright(){
        let date = new Date()
        return (
            <View style={{flex:1,height:200,justifyContent: 'center',alignItems:'center'}}>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} >Copyright @{date.getFullYear()+' '+I18n.t('xconn')}</Text>
                <Text style={{justifyContent:'center'}} > </Text>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                {this.renderIcon()}
                {this.renderField(I18n.t('ip'), this.state.ip)}
                {this.renderCopyright()}
                {this.renderModalIPs()}
            </View>
        );
    }
}
