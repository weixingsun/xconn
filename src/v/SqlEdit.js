import React from 'react';
import {Alert,AsyncStorage, Platform, View, Text, TextInput, StyleSheet,TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";
//import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
//import MIcon from 'react-native-vector-icons/MaterialIcons';
//import SQLite from 'react-native-sqlite-storage'
//import alasql from 'alasql'
//import alasql from '../sql/alasql.fs';
//import AxInput from './AxInput';
import I18n from 'react-native-i18n';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../style'

export default class SqlEdit extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            sqls:{},
        }
        this.formName="sql_list"
	this.default_sqls = {}
        //    sql1:'SELECT * from {SRC} ',
        this.renderBackIcon = this.renderBackIcon.bind(this)
        this.renderMore=this.renderMore.bind(this)
        this.renderMoreOption=this.renderMoreOption.bind(this)
        this.chooseAction=this.chooseAction.bind(this)
    }
    componentWillMount(){
        if(typeof this.props.add==='undefined') this.init()
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.add) this.init()
    }
    init(){
        this.getSqlDB("sqls")
        Actions.refresh({
            renderRightButton: this.renderMore,
            add:false,
        });
        
    }
    chooseAction(str_value){
        let value = JSON.parse(str_value)
        if(value.act==='add'){
            Actions.sql_add({})
        }else if(value.act==='del'){
            Alert.alert(
                I18n.t("del"),
                I18n.t("del")+' '+value.sql,
                [
                    {text:I18n.t("no"), },
                    {text:I18n.t('yes'), onPress:()=>{
                        this.deleteSql(value.sql)
                    }},
                ]
            );
        }
    }
    deleteSql(name){
        var sqls = this.state.sqls //[value.sql]
        delete sqls[name]
        this.setState({
            sqls
        })
        this.setSqlDB('sqls',JSON.stringify(sqls))
    }
    renderMore(){
        let self = this
        return (
          <View style={{ flex:1 }}>
            <Menu onSelect={(value) => this.chooseAction(value) }>
              <MenuTrigger>
                <Icon name={'ellipsis-v'} size={24} style={styles.right_icon} color={'black'} />
              </MenuTrigger>
              <MenuOptions>
                {self.renderMoreOption('add','plus',null)}
                {Object.keys(this.state.sqls).map((k,i)=>{
                    return self.renderMoreOption('del','trash',k)
                })}
              </MenuOptions>
            </Menu>
          </View>
        )
    }
    renderMoreOption(act,icon,sql){
        //style={{backgroundColor:'white'}}
        let json = {act,sql}
        let title = sql==null?I18n.t(act):I18n.t(act)+' '+sql
        return (
            <MenuOption value={JSON.stringify(json)} key={act+sql} style={{padding:1}}>
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
    getSqlDB(name){
        AsyncStorage.getItem(name).then((value)=>{
            if(value){
                this.setState({
                    sqls:JSON.parse(value)
                });
            }
        });
    }
    setSqlDB(name,value){
        AsyncStorage.setItem(name,value)
    }
    handleValueChange(values){
         //alert('values='+JSON.stringify(values))
         //let key = Object.keys(values)[0]
         //let txt = values[key]
         this.setSqlDB('sqls',JSON.stringify(values))
         this.setState({ sqls:values })
             //this.setState({form:{...this.state.form,cat:this.lastcat}})
             //if(values.price)this.setState({validationResults:GiftedFormManager.validate(this.formName)});
        //}
    }
    renderFormModal(name){
        return (
            <GiftedForm.ModalWidget
                key={name}
                name={name}
                title={name}
                //display={this.state.sqls.sql1}
                 //scrollEnabled={true}
                image={<View style={{marginLeft:8,width:20,alignItems:'center'}}><Icon name={'search'} size={20} /></View>}
                value={this.state.sqls[name]}
                //validationResults={this.state.validationResults}
                //displayValue='content'
            >
                <GiftedForm.SeparatorWidget/>
                <GiftedForm.TextAreaWidget name={name} title={I18n.t(name)}
                    autoFocus={true}
                    //placeholder={I18n.t(name)}
                    //value={this.state.form.content}
                    //style={{flex:1}}
                />
            </GiftedForm.ModalWidget>
        )
    }
    renderBackIcon(){
        return (
        <TouchableHighlight onPress={Actions.pop}>
            <Icon name={"chevron-left"} color={"#2a2929"} size={24} style={styles.bk} />
        </TouchableHighlight>
        )
    }
    render(){
        return (
            <View style={styles.content}>
                <GiftedForm
                    formName={this.formName}
                    style={{flex:1,marginLeft:10,marginRight:10}}  //height:form_height
                    openModal={(route) => { Actions.formModal({ ...route, title:route.getTitle(), renderLeftButton:this.renderBackIcon }) }}
                    onValueChange={this.handleValueChange.bind(this)}
                    //validators={ this.validators }
                    //defaults={this.state.form}
                    >
                    {Object.keys(this.state.sqls).map((k,i)=>{
                        return this.renderFormModal(k)
                    })}
                </GiftedForm>
            </View>
        );
    }
}
