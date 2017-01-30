import React from 'react';
import {Alert, AsyncStorage,Dimensions, Image, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import {Actions} from "react-native-router-flux";
//import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import I18n from 'react-native-i18n';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../style'
import Const from '../Const'
import Global from '../Global'
import * as Animatable from 'react-native-animatable';
import Button from 'apsl-react-native-button'

export default class Client extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={ 
            running:true,
            my_server:this.props.server,
        }
        this.renderMore=this.renderMore.bind(this)
        this.renderMoreOption=this.renderMoreOption.bind(this)
        this.gotoServer=this.gotoServer.bind(this)
        this.taskAction=this.taskAction.bind(this)
    }
    componentWillMount() {
        //this.updateWithActionIcon()
        Global.threads.udp.postMessage("join:"+this.props.server.ip);
    }
    componentWillUnmount(){
        this.stopAll()
        this.updateUI=false
    }
    //netmask = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_netmask)->sin_addr)];
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
    gotoServer(value){
        alert(JSON.stringify(this.state.servers[value]))
        this.updateUI=false
        //let url = 'http://'+ip+':'+Const.PORT.HTTP
        //Actions.web({url})
    }
    renderMore(){
        return (
          <View style={{ flex:1 }}>
            <Menu onSelect={(value) => this.gotoServer(value) }>
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
    stopAll(){
        //Actions.pop()
        Global.threads.udp.postMessage("exit");
        //Global.threads.http.postMessage("stop");
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
            //this.startAll()
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
                    <IIcon name='md-settings' size={200}/>
                </Animatable.View>
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
