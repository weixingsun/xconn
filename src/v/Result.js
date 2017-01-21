import React from 'react';
import {AsyncStorage, Dimensions, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import IIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
//import SQLite from 'react-native-sqlite-storage'
import alasql from '../sql/alasql.fs';
import { Col, Row, Grid } from "react-native-easy-grid";
import I18n from 'react-native-i18n';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../style'
var Mailer = require('NativeModules').RNMail;

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            //actions:['email'], //'icloud'
            lines:[],
        }
        this.result_file=null
        this.default_sql = 'select * from {src} '
        this.default_sqls = {
            sql1:this.default_sql,
            sql2:this.default_sql,
            sql3:this.default_sql,
        }
        //this.shareResult=this.shareResult.bind(this)
        this.renderMore=this.renderMore.bind(this)
        this.renderMoreOption=this.renderMoreOption.bind(this)
    }
    componentWillMount(){
        this.findFuncs()
        this.exist(this.props.file)
    }
    exist(path){
        RNFS.exists(path).then((result) => {
            if(result) {
                let file=this.getFileInfo(this.props.file)
                this.execSql(this.props.sql,file)
                this.updateTitle()
            }else{
                alert(I18n.t('file_expired'))
            }
        }).catch((err)=>{
            alert('err '+JSON.stringify(err))
        })
    }
    processSql(name,txt,file){
        let sql0 = txt.toLowerCase()
        let sql1 = sql0.replace('from',' into {DST} from ')
        let dst = 'csv("'+file.dir+'/'+name+'.csv",{separator:","})'
        let insert = sql1.replace('{DST}',dst).replace('{src}',file.ext+'("'+file.full+'") ')
        //alert('insert='+insert+'\nsql0='+sql0+'\nsql1='+sql1)
        this.result_file = file.dir+'/'+name+'.csv'
        var select = 'SELECT * from csv("'+this.result_file+'",{separator:","}) '
        return {insert,select}
    }
    findFuncs(){
        AsyncStorage.getItem('functions').then((funcs_result)=>{
            if(funcs_result!=null){
                let json = JSON.parse(funcs_result)
                Object.keys(json).map((k,i)=>{
                    alasql.fn[k] = eval('('+json[k]+')')
                })
            }
        });
    }
    findSql(sqls_txt,name){
        let json = typeof sqls_txt==='object'?sqls_txt:JSON.parse(sqls_txt)
        return json[name]
    }
    execSql(name,file){
        AsyncStorage.getItem('sqls').then((sqls_txt)=>{
            let sql = this.default_sql
            let sql_txt = this.findSql(sqls_txt,name)
            let sqls = this.processSql(name,sql_txt,file)
            //alert('sqls='+JSON.stringify(sqls))
            alasql.promise(sqls.insert).then((res)=>{
                alasql.promise(sqls.select).then((result)=>{
                    this.setState({ lines:result })
                }).catch((err)=>{})
            }).catch((err)=>{
                alert(I18n.t('invalid_sql'))
            })
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
        return{
            dir:folder,
            name:file,
            ext:ext,
            noext:fileNoExt,
            full:filePath,
        }
    }
    //shareResult(){
    //    alert(this.result_file)
    //}
    updateTitle(){
        Actions.refresh({
            title:'Result '+this.props.sql+'.csv',
            //renderRightButton: ()=> <IIcon name={'ios-share-outline'} size={26} color={'#333'} onPress={ this.shareResult } />,
            renderRightButton: this.renderMore,
        });
    }
    chooseShare(value){
        if(value==='email') this.mailer()
    }
    mailer(){
        Mailer.mail({
          subject: 'Xrows result of '+this.props.sql+'.csv',
          recipients: [],
          //ccRecipients: ['supportCC@example.com'],
          //bccRecipients: ['supportBCC@example.com'],
          body: '',
          //isHTML: true, // iOS only, exclude if false
          attachment: {
            path: this.result_file,  // The absolute path of the file from which to read data.
            type: 'csv',   // Mime Type: jpg, png, doc, ppt, html, pdf
          //  name: '',   // Optional: Custom filename for attachment
          }
        }, (error, event) => {
          if(error) {
            alert('Could not open mailbox. '+JSON.stringify(error));
          }
        });
    }
    renderMore(){
        let self = this
        return (
          <View style={{ flex:1 }}>
            <Menu onSelect={(value) => this.chooseShare(value) }>
              <MenuTrigger>
                <Icon name={'ellipsis-v'} size={23} style={styles.right_icon} />
              </MenuTrigger>
              <MenuOptions>
                  {self.renderMoreOption('email','envelope')}
              </MenuOptions>
            </Menu>
          </View>
        )
    }
    renderMoreOption(value,icon){
        //style={{backgroundColor:'white'}}
        return (
            <MenuOption value={value} key={value} style={{padding:1}}>
                <View style={{flexDirection:'row',height:40,backgroundColor:'#494949'}}>
                    <View style={{width:40,justifyContent:'center'}}>
                        <Icon name={icon} color={'white'} size={16} style={{marginLeft:10}}/>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{color:'white'}}>{I18n.t('via')+' '+I18n.t(value)+I18n.t('share')}</Text>
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
    _renderTitleRowView(rowData) {
        if(rowData==null) return
        return (
            <View style={styles.header}>
                <Grid >
                    {Object.keys(rowData).map((key,i)=>{
                        return <Col key={i} style={styles.cell}><Text style={styles.header_text}>{key}</Text></Col>
                    })}
                </Grid>
                <View style={styles.separator} />
            </View>
        );
    }
    render(){
        return (
        <View style={styles.content} >
            {this._renderTitleRowView(this.state.lines[0])}
            <ListView style={styles.listContainer}
                dataSource={this.ds.cloneWithRows(this.state.lines)}
                renderRow={this._renderRowView.bind(this)}
                enableEmptySections={true}
            />
        </View>
        );
    }
}
