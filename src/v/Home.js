import React from 'react';
import {Alert, AsyncStorage,Dimensions, Image, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../style'
import Const from '../Const'
import Global from '../Global'
import * as Animatable from 'react-native-animatable';
import Button from 'apsl-react-native-button'
import { Worker } from 'react-native-workers';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={ 
            listening:false,
            //server_menu_opened: false,
            servers:{}, //available to connect from client
        }
        this.renderMore=this.renderMore.bind(this)
        this.renderMoreOption=this.renderMoreOption.bind(this)
        this.chooseServer=this.chooseServer.bind(this)
        this.listenAction=this.listenAction.bind(this)
    }
    componentWillMount() {
        this.updateWithActionIcon()
        Global.threads.http = new Worker('thread_http.js');
        Global.threads.udp  = new Worker('thread_udp.js');
        Global.threads.udp.onmessage = (message) => {
          //alert("Home page msg from udp:"+ message);
          if(message.indexOf('{')>-1 && this.updateUI===true){
              let msg = JSON.parse(message).body
              let arr = this.state.servers
              arr[msg.ip]=msg
              this.setState({
                  servers:arr
              })
              this.updateWithActionIcon()
          }
        }
        this.updateUI=true
    }
    componentWillUnmount(){
        //this.stopAll()
        this.updateUI=false
    }
    updateWithActionIcon(){
        Actions.refresh({
            key:'home',
            renderRightButton: this.renderMore,
        });
    }
    chooseServer(value){
        if(value===''){
            //this.changeRole(true)
            Actions.server({})
        }else {
            Actions.client({server:this.state.servers[value]})
        }
    }
    renderMore(){
        return (
          <View style={{ flex:1 }}>
            <Menu name='serverMenu' onSelect={(value)=>this.chooseServer(value)}>
              <MenuTrigger onPress={this.onTriggerPress}>
                <Text style={styles.right_icon}>
                  {Object.keys(this.state.servers).length} <Icon name="caret-down" size={15}/>
                </Text>
              </MenuTrigger>
              <MenuOptions>
                {this.renderMoreOption('task_start','','plus')}
                {Object.keys(this.state.servers).map((k,i)=>{
                    return this.renderMoreOption('task_join',k,'play')
                })}
              </MenuOptions>
            </Menu>
          </View>
        )
    }
    renderMoreOption(act,value,icon){
        //style={{backgroundColor:'white'}}
        let title=I18n.t(act)+' '+value
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
    listenAction(){
        if(this.state.listening){
            Alert.alert(
                I18n.t("task"),
                I18n.t("confirm_stop_task"),
                [
                    {text:I18n.t("no"), },
                    {text:I18n.t('yes'), onPress:()=>{
                        this.stopListen()
                    }},
                ]
            );
        }else{ 
            this.startListen()
        }
    }
    startListen(){
        this.setState({
            listening:true
        })
        Global.threads.udp.postMessage("start");
    }
    stopListen(){
        this.setState({
            listening:false
        })
        Global.threads.udp.postMessage("stop");
    }
    changeRole(server){
        if(server) role=Const.ROLE.SERVER
        else role=Const.ROLE.CLIENT
        Global.threads.udp.postMessage("role:"+role);
    }
    _renderCircle() {
        let animate = this.state.listening?'rotate':null
        return (
            <View style={styles.home_circle}>
              <TouchableHighlight underlayColor={'white'} onPress={this.listenAction}>
                <Animatable.Image
                    animation={animate} //pulse,rotate,bounce,flash,rubberBand,shake,swing,tada,wobble,zoomIn,zoomOut
                    duration={3000}
                    easing="linear"
                    iterationCount="infinite"
                    style={styles.home_circle}
                    source={require('./img/radar0.png')}
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
                  style={styles.button_idle} 
                  textStyle={{color:'white'}}
                  onPress={ ()=>{
                      //this.changeRole(true)
                      Actions.server({}) 
                  }}
                >
                  {I18n.t('task_start')}
                </Button>
        </View>
        );
    }
}
