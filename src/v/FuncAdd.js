import React from 'react';
import {AsyncStorage, Platform, View, Text, TextInput, StyleSheet,TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
//import SQLite from 'react-native-sqlite-storage'
//import alasql from 'alasql'
import alasql from '../sql/alasql.fs';
import AxInput from './AxInput';
import I18n from 'react-native-i18n';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import styles from '../style'

export default class FuncAdd extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            functions:{},
            values:{
                name:'',
                func:'',
            },
        }
	this.default_values = {
            name:'power',
            func:'function(x){\n  return x*x\n} ',
        }
        this.formName="func_add"
        this.renderBackIcon = this.renderBackIcon.bind(this)
    }
    componentWillMount(){
        this.getFunctionDB("functions")
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
        if(values.name && values.func){
            //alert(values.name+values.func)
        }
        //let key = Object.keys(values)[0]
        //let txt = values[key]
        //this.setState({ sqls:values })
        //this.setState({form:{...this.state.form,cat:this.lastcat}})
        //if(values.price)this.setState({validationResults:GiftedFormManager.validate(this.formName)});
        //}
    }
    renderFormInput(name){
        return (
            <GiftedForm.TextInputWidget
                key={name}
                name={name}
                title={I18n.t(name)}
                image={<View style={{marginLeft:8,width:20,alignItems:'center'}}><MIcon name={'title'} size={20} /></View>}
                value={this.state.values[name]}
                //validationResults={this.state.validationResults}
                //displayValue='content'
            />
        )
    }
    renderFormModal(name){
        return (
            <GiftedForm.ModalWidget
                name={name}
                title={I18n.t(name)}
                //display={this.state.sqls.sql1}
                 //scrollEnabled={true}
                image={<View style={{marginLeft:8,width:20,alignItems:'center'}}><MIcon name={'functions'} size={20} /></View>}
                value={this.state.values[name]}
                //validationResults={this.state.validationResults}
                //displayValue='content'
            >
                <GiftedForm.SeparatorWidget/>
                <GiftedForm.TextAreaWidget name={name} title={I18n.t(name)}
                    autoFocus={true}
                    placeholder={this.default_values.func}
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
                    defaults={this.state.form}
                    >
                        {this.renderFormInput('name')}
                        {this.renderFormModal('func')}
                        {this.renderSubmit()}
                </GiftedForm>
            </View>
        );
    }
    renderSubmit(){
        return(
            <GiftedForm.SubmitWidget
                title={I18n.t('add')}
                widgetStyles={{
                    submitButton: {
                        backgroundColor: '#494949',
                    }
                }}
                onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                    //alert('validators='+JSON.stringify(this.validators))
                    //this.setState({ validationResults:validationResults.results })
                    if (isValid === true) {
                        this.onSubmit(values)
                        //alert('values='+JSON.stringify(values))
                        postSubmit();
                    }else{
                        alert(JSON.stringify(values))
                    }
                }}
            />
        )
    }
    onSubmit(values){
        if(values.name.length<1){
            alert(I18n.t('no_name'))
        }else if(values.func.length<1){
            alert(I18n.t('no_func'))
        }else if(this.errorSyntax(values.func)){
            alert(I18n.t('invalid_func'))
        }else{
            var funcs = this.state.functions
            funcs[values.name] = values.func
            this.setFunctionDB('functions',funcs)
            Actions.pop({ refresh: {add:true} });
        }
    }
    errorSyntax(code){
        try {
            eval('('+code+')'); 
        } catch (e) {
            if (e instanceof SyntaxError) {
                return true
            }
        }
        return false
    }
}
