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
import server from 'react-native-mongoose'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={ 
            sqls:{},
            task:{
                running:false,
                progress:0,
            },
        }
        this.file=null
        this.renderMore=this.renderMore.bind(this)
        this.renderMoreOption=this.renderMoreOption.bind(this)
        this.chooseSql=this.chooseSql.bind(this)
        this.taskAction=this.taskAction.bind(this)
    }
    componentWillMount() {
        this.getSqlDB()
    }
    componentWillReceiveProps(nextProps) {
        //nextProps={onNavigate,navigationState,name,sceneKey,parent,type,title,initial,drawerIcon,component,index,file,from}
        //alert('componentWillReceiveProps: file'+JSON.stringify(nextProps.file))
        if(nextProps.file!==null){
            this.readFile(nextProps.file);
            this.getSqlDB()
        //}else if(nextProps.content){
        //    this.setState({content:nextProps.content})
        }else if(nextProps.add){
            this.getSqlDB()
        }
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
    readFile(filePath){
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
    }
    updateWithActionIcon(){
        Actions.refresh({
            key:'home',
            title:this.file.name,
            //renderRightButton: ()=> <Icon name={'play'} size={20} color={'#333'} onPress={()=>  } />,
            renderRightButton: this.renderMore,
            //content:content,
            file:null,
        });
    }
    chooseSql(value){
        if(value==='') Actions.sql_add({})
        else Actions.result({file:this.file.full,sql:value})
    }
    renderMore(){
        return (
          <View style={{ flex:1 }}>
            <Menu onSelect={(value) => this.chooseSql(value) }>
              <MenuTrigger>
                <Icon name={'play'} size={24} style={styles.right_icon} color={'black'} />
              </MenuTrigger>
              <MenuOptions>
                {this.renderMoreOption('add','','plus')}
                {Object.keys(this.state.sqls).map((k,i)=>{
                        return this.renderMoreOption('',k,'play')
                })}
              </MenuOptions>
            </Menu>
          </View>
        )
    }
    renderMoreOption(act,value,icon){
        //style={{backgroundColor:'white'}}
        let title=I18n.t('sql')+' '+value
        if(act==='add') title=I18n.t('add')+I18n.t('sql')
        return (
            <MenuOption value={value} key={value} style={{padding:1}}>
                <View style={{flexDirection:'row',height:40,backgroundColor:'#494949'}}>
                    <View style={{width:40,justifyContent:'center'}}>
                        <Icon name={icon} color={'white'} size={16} style={{marginLeft:10}}/>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{color:'white'}}>{title}</Text>
                    </View>
                </View>
            </MenuOption>
        )
    }
    _renderRowView(rowData) {
        if(rowData==null) return
        //alert('rowData='+JSON.stringify(rowData))
        return (
            <View style={styles.row}>
                <Grid >
                    {Object.keys(rowData).map((key,i)=>{
                        return <Col key={i} style={styles.cell}><Text style={styles.value_text}>{rowData[key]}</Text></Col>
                    })}
                </Grid>
                <View style={styles.separator} />
            </View>
        );
    }
    startTask(){
        this.setState({
            task:{
                running:true,
            },
        })
        server.start({
            port:'9999',
            root:'DOCS',
        })
    }
    stopTask(){
        this.setState({
            task:{
                running:false,
            },
        })
        server.stop()
    }
    taskAction(){
        if(this.state.task.running){
            Alert.alert(
                I18n.t("task"),
                I18n.t("confirm_stop_task"),
                [
                    {text:I18n.t("no"), },
                    {text:I18n.t('yes'), onPress:()=>{
                        //Linking.openURL('mailto:sun.app.service@gmail.com')
                        this.stopTask()
                    }},
                ]
            );
        }else{ 
            this.startTask()
        }
    }
    _renderCircle() {
        let src = this.state.task.running?require('./img/circle-red.png'):require('./img/circle-green.png')
        return (
            <View style={styles.home_circle}>
                <TouchableHighlight
                    underlayColor={'white'}
                    onPress={this.taskAction}>
                <Image
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
            <View style={{height:100}}>
                <Text>Join a task</Text>
            </View>
        </View>
        );
    }
}
