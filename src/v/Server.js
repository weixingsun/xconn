import React from 'react';
import {Alert, AsyncStorage,Dimensions, Image, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import {Actions} from "react-native-router-flux";
import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import alasql from '../sql/alasql.fs';
import { Col, Row, Grid } from "react-native-easy-grid";
import I18n from 'react-native-i18n';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../style'
import Const from '../Const'
import http from 'react-native-mongoose'
import udp from 'react-native-udp'  //'dgram'
import BackgroundTimer from 'react-native-background-timer';
import * as Animatable from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info'
import NetworkInfo from 'react-native-network-info'
import Button from 'apsl-react-native-button'

export default class Server extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={ 
            task:{
                running:true,
                progress:0,
                role:Const.ROLE.SERVER,
            },
            clients:{}, //available to connect from server
        }
        this.ip='127.0.0.1'
        this.renderMore=this.renderMore.bind(this)
        this.renderMoreOption=this.renderMoreOption.bind(this)
        this.chooseServer=this.chooseServer.bind(this)
        this.taskAction=this.taskAction.bind(this)
        this.udp = null
        this.HTTP_SERVER_PORT = 9999
        this.UDP_LISTEN_PORT  = 9998
        this.heartbeat_id = 0
        this.hostname = DeviceInfo.getDeviceName()
    }
    componentWillMount() {
        this.updateWithActionIcon()
        this.startUDP()
        this.startHTTP()
        this.setupHbUdp()
        NetworkInfo.getIPAddress(ip => {
          this.ip=ip
        });
    }
    /*ab2str16(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    str2ab16(str) {
      var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }*/
    ab2str8(buf) {
      return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
    str2ab8(obj) {
      var uint = new Uint8Array(obj.length);
      for (var i = 0, l = obj.length; i < l; i++){
        uint[i] = obj.charCodeAt(i);
      }
      return new Uint8Array(uint);
    }
    startHTTP(){
        http.start({
            port:this.HTTP_SERVER_PORT+'',
            root:'DOCS',
        })
    }
    stopTask(){
        http.stop()
        this.udp.close()
        BackgroundTimer.clearInterval(this.heartbeat_id)
        Actions.pop()
    }
    startUDP(){
        this.udp = udp.createSocket('udp4')
        this.udp.bind(this.UDP_LISTEN_PORT, (err)=>{
            if (err) throw err;
            this.udp.setBroadcast(true);
        });
        //receive
        this.udp.on('message', (data, rinfo)=>{
            //let msg = data.toString() //b64.fromByteArray(data)
            let strMsg = this.ab2str8(data)
            let json = JSON.parse(strMsg)
            var clients = this.state.clients
            clients[json.ip]=json
            this.setState({
                clients
            })
            this.updateWithActionIcon()
        })
        //ready
        this.udp.once('listening', ()=>{
            //this.sendMsg('255.255.255.255',this.UDP_LISTEN_PORT,'ON')
        })
    }
    setupHbUdp(){
        this.heartbeat_id = BackgroundTimer.setInterval(() => {
            let json = {}
            json['cmd']=Const.CMD.HB
            json['role']=this.state.task.role
            json['ip']=this.ip
            json['name']=this.hostname
            this.sendMsg('255.255.255.255',this.UDP_LISTEN_PORT,JSON.stringify(json))
        }, 10000);
    }
    sendMsg(host,port,msg){
        var buf = this.str2ab8(msg)
        this.udp.send(buf, 0, buf.length, port, host, (err)=>{
            if (err) throw err
            console.log('sent msg:'+msg)
        })
    }
    gotoViewClient(ip){
        alert(ip)
        //Actions.client_view({ip:ip})
    }
    /*getFileInfo(filePath){
        //filename.replace('%3A',':').replace('%2F','/')
        let lastIdx = filePath.lastIndexOf('/')
        let file = filePath.substr(lastIdx+1)
        let folder = filePath.substr(0,lastIdx)
        let dotIdx = file.lastIndexOf('.')
        let fileNoExt = file.substr(0,dotIdx)
        let ext = file.substr(dotIdx+1)
        return {
            dir:folder,
            name:file,
            ext:ext,
            noext:fileNoExt,
            full:filePath,
        }
    }*/
    updateWithActionIcon(){
        Actions.refresh({
            key:'server',
            title:I18n.t('server')+': '+this.hostname,
            //renderRightButton: ()=> <Icon name={'play'} size={20} color={'#333'} onPress={()=>  } />,
            renderRightButton: this.renderMore,
            renderLeftButton:  null,
            file:null,
        });
    }
    renderBackIcon(){
      return (
        <TouchableHighlight onPress={this.taskAction}>
            <Icon name={"chevron-left"} color={"#2a2929"} size={24} style={styles.bk} />
        </TouchableHighlight>
      )
    }
    chooseServer(value){
        //if(value==='') Actions.sql_add({})
        //else Actions.result({file:this.file.full,sql:value})
        //alert('value='+value+'\n'+JSON.stringify(this.state.clients[value]))
        if(value===''){
            //this.stopTask()
            this.taskAction()
        }else{
            this.gotoViewClient(value)
        }
    }
    renderMore(){
        return (
          <View style={{ flex:1 }}>
            <Menu onSelect={(value) => this.chooseServer(value) }>
              <MenuTrigger>
                <Text style={styles.right_icon}>
                  {Object.keys(this.state.clients).length} <Icon name="caret-down" size={15}/>
                </Text>
              </MenuTrigger>
              <MenuOptions>
                {this.renderMoreOption('stop','','minus-circle')}
                {Object.keys(this.state.clients).map((k,i)=>{
                    return this.renderMoreOption('',k,'folder-o')
                })}
              </MenuOptions>
            </Menu>
          </View>
        )
    }
    renderMoreOption(act,value,icon){
        //style={{backgroundColor:'white'}}
        let title=I18n.t('client_open')+' '+value
        if(act==='stop') title=I18n.t('task_stop')
        return (
            <MenuOption value={value} key={value} style={{padding:1}}>
                <View style={{flexDirection:'row',height:40,backgroundColor:'#494949'}}>
                    <View style={{width:30,justifyContent:'center'}}>
                        <Icon name={icon} color={'white'} size={16} style={{marginLeft:10}}/>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{color:'white'}}>{title}</Text>
                    </View>
                </View>
            </MenuOption>
        )
    }
    taskAction(){
        if(this.state.task.running){
            Alert.alert(
                I18n.t("task"),
                I18n.t("confirm_stop_task"),
                [
                    {text:I18n.t("no"), },
                    {text:I18n.t('yes'), onPress:()=>{
                        this.stopTask()
                    }},
                ]
            );
        //}else{ 
        //    this.startTask()
        }
    }
    _renderCircle() {
        let src = this.state.task.running?require('./img/circle-red.png'):require('./img/radar0.png')
        let animate = this.state.task.running?'pulse':'rotate'
        return (
            <View style={styles.home_circle}>
                <TouchableHighlight
                    underlayColor={'white'}
                    onPress={this.taskAction}>
                <Animatable.Image
                    animation={animate} //pulse,rotate,bounce,flash,rubberBand,shake,swing,tada,wobble,zoomIn,zoomOut
                    duration={3000}
                    easing="linear"
                    iterationCount="infinite"
                    style={styles.home_circle}
                    source={src}
                />
                </TouchableHighlight>   
            </View>
        );
    }
    render(){
        return (
        <View style={styles.content} >
            {this._renderCircle()}
            <View style={{height:100}}/>
                <Button
                  style={styles.button_running} 
                  textStyle={{color:'white'}}
                  onPress={ this.taskAction }
                >
                  {I18n.t('task_stop')}
                </Button>
        </View>
        );
    }
}
