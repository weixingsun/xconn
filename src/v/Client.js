import React from 'react';
import {Alert, AsyncStorage,Dimensions, Image, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import {Actions} from "react-native-router-flux";
import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
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

export default class Client extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={ 
            running:true,
            my_server:'127.0.0.1',
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
        //this.getSqlDB()
        //this.updateWithActionIcon()
        //this.listenUDP()
        NetworkInfo.getIPAddress(ip => {
          this.ip=ip
        });
        //alert('Client.componentWillMount')
    }
    componentWillReceiveProps(nextProps) {
        //nextProps={onNavigate,navigationState,name,sceneKey,parent,type,title,initial,drawerIcon,component,index,file,from}
        //alert('componentWillReceiveProps: file'+JSON.stringify(nextProps.file))
        //if(nextProps.file!==null){
        //    this.readFile(nextProps.file);
        //    this.getSqlDB()
        //}else if(nextProps.content){
        //    this.setState({content:nextProps.content})
        //}else if(nextProps.add){
        //    this.getSqlDB()
        //}
    }
    getSqlDB(){
        AsyncStorage.getItem('sqls').then((value)=>{
            if(value){
                this.setState({
                    sqls:JSON.parse(value)
                });
            }
        });
    }
    ab2str16(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    str2ab16(str) {
      var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
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
    listenUDP(){
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
            var servers = this.state.servers
            servers[json.ip]=json
            this.setState({
                servers
            })
            //console.warn('received msg:'+msg)
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
    getFileInfo(filePath){
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
    }
    /*readFile(filePath){
        this.file = this.getFileInfo(filePath)
        //alert(this.file.ext)
        if(this.file.ext==='csv'||this.file.ext==='xls'||this.file.ext==='xlsx'){
            this.readExcel(this.file)
        }
    }
    readExcel(file){
        //var sql = 'SELECT * from csv("'+file.full+'",{headers:true}) '
        var sql = 'SELECT * from '+file.ext+'("'+file.full+'") '
        //alert('sql='+sql)
        //this.updateWithActionIcon()
        alasql(sql,[],(result)=>{
            //alert('alasql.select * '+JSON.stringify(result))
            this.updateWithActionIcon()
            this.setState({
                lines:result,
            })
            //let sql2 = 'SELECT * INTO csv("'+this.file.dir+'/test2.csv",{headers:true,separator:","}) FROM ?'
            //alert('sql2='+sql2)
            //alasql(sql2, [result]);
        })
    }*/
    updateWithActionIcon(){
        Actions.refresh({
            key:'home',
            //title:this.file.name,
            //renderRightButton: ()=> <Icon name={'play'} size={20} color={'#333'} onPress={()=>  } />,
            renderRightButton: this.renderMore,
            //content:content,
            file:null,
        });
    }
    chooseServer(value){
        //if(value==='') Actions.sql_add({})
        //else Actions.result({file:this.file.full,sql:value})
        alert(JSON.stringify(this.state.servers[value]))
    }
    renderMore(){
        return (
          <View style={{ flex:1 }}>
            <Menu onSelect={(value) => this.chooseServer(value) }>
              <MenuTrigger>
                <Text style={styles.right_icon}>
                  {Object.keys(this.state.servers).length}
                </Text>
              </MenuTrigger>
              <MenuOptions>
                {this.renderMoreOption('add','','plus')}
                {Object.keys(this.state.servers).map((k,i)=>{
                    return this.renderMoreOption('',k,'play')
                })}
              </MenuOptions>
            </Menu>
          </View>
        )
    }
    renderMoreOption(act,value,icon){
        //style={{backgroundColor:'white'}}
        let title=I18n.t('task_join')+' '+value
        if(act==='add') title=I18n.t('task_start')
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
    startTask(){
        this.setState({
            running:true,
        })
        http.start({
            port:this.HTTP_SERVER_PORT+'',
            root:'DOCS',
        })
        this.setupHbUdp()
    }
    stopTask(){
        this.setState({
            running:false,
        })
        http.stop()
        //this.udp.close()
        BackgroundTimer.clearInterval(this.heartbeat_id)
    }
    taskAction(){
        if(this.state.running){
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
        }else{ 
            this.startTask()
        }
    }
    _renderCircle() {
        let src = this.state.running?require('./img/circle-red.png'):require('./img/radar0.png')
        let animate = this.state.running?'pulse':'rotate'
        //IIcon name='ios-cog'
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
        let buttonText = this.state.running?I18n.t('task_stop'):I18n.t('task_start')
        let buttonStyle= this.state.running?styles.button_running:styles.button_idle
        return (
        <View style={styles.content} >
            {this._renderCircle()}
            <View style={{height:100}}/>
                <Button
                  style={buttonStyle} 
                  textStyle={{color:'white'}}
                  onPress={ this.taskAction }
                >
                  {buttonText}
                </Button>
        </View>
        );
    }
}
