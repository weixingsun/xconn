import React from 'react';
import {Alert,Image,ListView, Modal, View, Text, StyleSheet, ScrollView, TouchableHighlight,TouchableOpacity,NativeModules,Linking} from "react-native";
import {Actions} from "react-native-router-flux"
import RNFS from 'react-native-fs'
import I18n from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info'
import styles from '../style'
import NetworkInfo from 'react-native-network-info'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            modalVisible:false,
            id:'',
            ips:{},
            ip:'127.0.0.1',
        }
        //this.showIPs=this.showIPs.bind(this)
    }
    componentWillMount() {
        NetworkInfo.getAllIPs(ips => {
            let json = JSON.parse(ips)
            let k1 = Object.keys(json)[0]
            let if0 = json[k1]['addr']
            this.setState({
                ip:if0,
                ips:json,
            })
        });
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible}); 
    }
    renderModalIPs(){
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
                  {Object.keys(this.state.ips).map(k=>{
                    return (
                      <View style={{flexDirection:'row',}} key={k}>
                        <Text style={{width:60}}>{k+':'}</Text>
                        <Text>{this.state.ips[k].addr}</Text>
                      </View>
                    )
                  })}
                </View> 
            </View> 
        </Modal>
        )
    }
    //this.renderField(I18n.t('id'), this.state.id)
    renderField(title,value){
        return (
            <View style={styles.detail_card} >
              <View style={{flexDirection:'row'}}>
                  <Text style={{width:40,justifyContent: 'center',alignItems:'center',fontSize:16,fontWeight:'bold',color:'black'}}> {title}: </Text>
                  <View style={{flex:1,flexDirection:'row',justifyContent: 'center'}}>
                      <Text style={{marginLeft:0,justifyContent:'center',fontSize:12, }}>{value}</Text>
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
