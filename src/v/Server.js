import React from 'react';
import {Alert, AsyncStorage,Dimensions, Image, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import {Actions} from "react-native-router-flux";
import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import I18n from 'react-native-i18n';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../style'
import Const from '../Const'
import Global from '../Global'
import * as Animatable from 'react-native-animatable';
import Button from 'apsl-react-native-button'
import DeviceInfo from 'react-native-device-info'

export default class Server extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={ 
            running:true,
            role:Const.ROLE.SERVER,
            clients:{}, //available to connect from server
        }
        this.renderMore=this.renderMore.bind(this)
        this.renderMoreOption=this.renderMoreOption.bind(this)
        this.chooseClient=this.chooseClient.bind(this)
        this.taskAction=this.taskAction.bind(this)
    }
    componentWillMount() {
        this.updateWithActionIcon()
        this.startHTTP()
        this.updateUI=true
        //NetworkInfo.getIPAddress(ip => {
        //  this.myip=ip
        //  this.setupHbUdp()
        //});
    }
    componentWillUnmount(){
        //this.stopAll()
        this.updateUI=false
    }
    startHTTP(){
        //http.start({
        //    port:this.HTTP_SERVER_PORT+'',
        //    root:'DOCS',
        //})
        Global.threads.http.postMessage("start");
        Global.threads.udp.postMessage("role:"+Const.ROLE.SERVER);
        Global.threads.udp.onmessage = (message) => {
          //alert('server recv msg: '+message);
          if(message.indexOf('{')>-1 && this.updateUI===true){
              let msg = JSON.parse(message).body
              let arr = this.state.clients
              arr[msg.ip]=msg
              this.setState({
                  clients:arr
              })
              this.updateWithActionIcon()
          }
        }
    }
    stopAll(){
        //if(this.state.running) http.stop()
        //if(this.udp) this.udp.close()
        //BackgroundTimer.clearInterval(this.heartbeat_id)
        //Actions.pop()
        Global.threads.udp.postMessage("role:"+Const.ROLE.CLIENT);
        Global.threads.http.postMessage("stop");
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
            title:I18n.t('server')+': '+DeviceInfo.getDeviceName(),
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
    chooseClient(value){
        //if(value==='') Actions.sql_add({})
        //else Actions.result({file:this.file.full,sql:value})
        //alert('value='+value+'\n'+JSON.stringify(this.state.clients[value]))
        if(value===''){
            this.stopAll()
        }else if(value==='10.32.15.177'){
            let json = {}
            json['cmd']=Const.CMD.HB
            json['role']=this.state.role
            json['ip']=this.myip
            json['name']=DeviceInfo.getDeviceName()
            let arr = this.myip.split('.')
            let bcip = arr[0]+'.'+arr[1]+'.255.255'
            this.sendMsg(value,this.UDP_LISTEN_PORT,JSON.stringify(json))
        }else{
            this.gotoViewClient(value)
        }
    }
    renderMore(){
        //{this.renderMoreOption('add','10.32.15.177','plus')}
        //{this.renderMoreOption('stop','','minus-circle')}
        return (
          <View style={{ flex:1 }}>
            <Menu onSelect={(value) => this.chooseClient(value) }>
              <MenuTrigger>
                <Text style={styles.right_icon}>
                  {Object.keys(this.state.clients).length} <Icon name="caret-down" size={15}/>
                </Text>
              </MenuTrigger>
              <MenuOptions>
                {Object.keys(this.state.clients).map((k,i)=>{
                    return this.renderMoreOption('',k,this.state.clients[k].mfg)
                })}
              </MenuOptions>
            </Menu>
          </View>
        )
    }
    renderMoreOption(act,value,icon){
        let ticon=icon==='Apple'?'apple':'android'
        //style={{backgroundColor:'white'}}
        let title=I18n.t('client_open')+' '+value
        if(act==='stop') title=I18n.t('task_stop')
        return (
            <MenuOption value={value} key={value} style={{padding:1}}>
                <View style={{flexDirection:'row',height:40,backgroundColor:'#494949'}}>
                    <View style={{width:30,justifyContent:'center'}}>
                        <Icon name={ticon} color={'white'} size={16} style={{marginLeft:10}}/>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{color:'white'}}>{title}</Text>
                    </View>
                </View>
            </MenuOption>
        )
    }
    taskAction(){
        if(this.state.running){
            Alert.alert(
                I18n.t("task"),
                I18n.t("confirm_stop_task"),
                [
                    {text:I18n.t("no"), },
                    {text:I18n.t('yes'), onPress:()=>{
                        this.stopAll()
                        Actions.pop()
                    }},
                ]
            );
        //}else{ 
        //    this.startTask()
        }
    }
    _renderCircle() {
        //let src = this.state.running?require('./img/circle-red.png'):require('./img/radar0.png')
        let animate = this.state.running?'rotate':null
        return (
            <View style={styles.home_circle}>
                <TouchableHighlight
                    underlayColor={'white'}
                    onPress={this.taskAction}>
                <Animatable.View
                    animation={animate} //pulse,rotate,bounce,flash,rubberBand,shake,swing,tada,wobble,zoomIn,zoomOut
                    duration={3000}
                    easing="linear"
                    iterationCount="infinite"
                    style={styles.home_circle}
                    //source={src}
                >
                    <IIcon name='ios-cog' size={200}/>
                </Animatable.View>
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
