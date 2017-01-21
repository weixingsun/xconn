import React from 'react';
import {Alert,AsyncStorage, Platform, View, Text, TextInput, StyleSheet,TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
//import RNFS from 'react-native-fs';
//import MIcon from 'react-native-vector-icons/MaterialIcons';
//import SQLite from 'react-native-sqlite-storage'
//import alasql from 'alasql'
//import alasql from '../sql/alasql.fs';
//import AxInput from './AxInput';
import I18n from 'react-native-i18n';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from '../style'

export default class FunctionEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            functions:{},
        }
        this.formName="func_list"
        this.default_funcs = {}
        this.renderBackIcon = this.renderBackIcon.bind(this)
        this.renderMore=this.renderMore.bind(this)
        this.renderMoreOption=this.renderMoreOption.bind(this)
        this.chooseAction=this.chooseAction.bind(this)
    }
    componentWillMount(){
        //AsyncStorage.removeItem("functions")
        if(typeof this.props.add==='undefined') this.init()
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.add) this.init()
    }
    init(){
        this.getFunctionDB("functions")
        //this.default_funcs['sqrt'] = 'function(x){\n  return Math.sqrt(x)\n}'
        //this.default_funcs['inc'] = 'function(x){\n  return x+1\n}'
        Actions.refresh({
            renderRightButton: this.renderMore,
            add:false,
        });
    }
    chooseAction(str_value){
        let value = JSON.parse(str_value)
        if(value.act==='add'){
            Actions.func_add({})
        }else if(value.act==='del'){
            Alert.alert(
                I18n.t("del"),
                I18n.t("del")+' '+I18n.t("func"),
                [
                    {text:I18n.t("no"), },
                    {text:I18n.t('yes'), onPress:()=>{
                        this.deleteFunc(value.func)
                    }},
                ]
            );
        }
    }
    deleteFunc(name){
        var funcs = this.state.functions //[value.func]
        delete funcs[name]
        this.setState({
            functions:funcs
        })
        this.setFunctionDB('functions',JSON.stringify(funcs))
    }
    renderMore(){
        let self = this
        //add func2
        //delete func1
        return (
          <View style={{ flex:1 }}>
            <Menu onSelect={(value) => this.chooseAction(value) }>
              <MenuTrigger>
                <Icon name={'ellipsis-v'} size={24} style={styles.right_icon} color={'black'} />
              </MenuTrigger>
              <MenuOptions>
                {self.renderMoreOption('add','plus',null)}
                {Object.keys(this.state.functions).map((k,i)=>{
                    return self.renderMoreOption('del','trash',k)
                })}
              </MenuOptions>
            </Menu>
          </View>
        )
    }
    renderMoreOption(act,icon,func){
        //style={{backgroundColor:'white'}}
        let json = {act,func}
        let title = func==null?I18n.t(act):I18n.t(act)+' '+func
        return (
            <MenuOption value={JSON.stringify(json)} key={act+func} style={{padding:1}}>
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
    getDefaultFunction(name){
        return this.default_funcs //.replace('{function}',name)
    }
    getFunctionDB(name){
        AsyncStorage.getItem(name).then((value)=>{
            if(value){
                this.setState({
                    functions:JSON.parse(value)
                });
            }
        });
    }
    setFunctionDB(name,value){
        if(typeof value==='object') value=JSON.stringify(value)
        AsyncStorage.setItem(name,value)
    }
    handleValueChange(values){
         //alert('values='+JSON.stringify(values))
         //if(values.func1){
         //let key = Object.keys(values)[0]
         //let txt = values[key]
         this.setFunctionDB('functions',JSON.stringify(values))
         this.setState({ functions:values })
             //this.setState({form:{...this.state.form,cat:this.lastcat}})
             //if(values.price)this.setState({validationResults:GiftedFormManager.validate(this.formName)});
        //}
    }
    renderFormFunc(name){
        return (
            <GiftedForm.ModalWidget
                name={name}
                title={name}
                //display={this.state.functions.func1}
                key={name}
                //scrollEnabled={true}
                image={<View style={{marginLeft:8,width:20,alignItems:'center'}}><Icon name={'slack'} size={20} /></View>}
                value={this.state.functions[name]}
                //validationResults={this.state.validationResults}
                //displayValue='content'
            >
                <GiftedForm.SeparatorWidget/>
                <GiftedForm.TextAreaWidget name={name} title={I18n.t(name)}
                    autoFocus={true}
                    placeholder={'function(x){\n  return x+1\n}'}
                    value={this.state.functions[name]}
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
        //alert(JSON.stringify(this.state.functions))
        return (
            <View style={styles.content}>
                <GiftedForm
                    formName={this.formName}
                    style={{flex:1,marginLeft:10,marginRight:10}}  //height:form_height
                    openModal={(route) => { Actions.formModal({ ...route, title:route.getTitle(), renderLeftButton:this.renderBackIcon }) }}
                    onValueChange={this.handleValueChange.bind(this)}
                    //validators={ this.validators }
                    defaults={this.state.form}
                    >
                    {Object.keys(this.state.functions).map((k,i)=>{
                        return this.renderFormFunc(k)
                    })}
                </GiftedForm>
            </View>
        );
    }
}
