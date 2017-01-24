import React from 'react';
import {Alert,Image,ListView, View, Text, StyleSheet, ScrollView, TouchableOpacity,NativeModules,Linking} from "react-native";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import I18n from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info'
import styles from '../style'
import NetworkInfo from 'react-native-network-info'

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            id:'',
            ip:'127.0.0.1',
        }
        this.file=null
    }
    componentWillMount() {
        NetworkInfo.getIPAddress(ip => {
            this.setState({ip})
        });
    }
    //this.renderField(I18n.t('id'), this.state.id)
    renderField(title,value){
        return (
            <View style={styles.detail_card} >
              <View style={{flexDirection:'row'}}>
                  <Text style={{width:80,justifyContent: 'center',alignItems:'center',fontSize:16,fontWeight:'bold',color:'black'}}> {title}: </Text>
                  <Text style={{marginLeft:10,justifyContent:'center'}}>{value}</Text>
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
			{this.renderField(I18n.t('id'), this.state.id)}
			{this.renderField(I18n.t('ip'), this.state.ip)}
			{this.renderCopyright()}
            </View>
        );
    }
}
