import React from 'react';
import {Alert, Platform, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
//const DocumentPicker = require('react-native').NativeModules.RNDocumentPicker;
import Icon from 'react-native-vector-icons/FontAwesome';
var Mailer = require('NativeModules').RNMail;
import I18n from 'react-native-i18n';
import styles from '../style'

const contextTypes = {
    drawer: React.PropTypes.object,
};
const readAndoid = (result)=>{
	//{type:'text/comma-separated-values',fileName:'test.csv',fileSize:2499,uri:'content://...'}
	if(result==null){
    }else if(result.type==='text/comma-separated-values' //csv
	|| result.type==='application/vnd.ms-excel'    //xls
	|| result.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  //xlsx
	){
		//alert('excel='+result.type)
		Actions.refresh({
			key:'home',
			file:result.path,
		});
	}else if(result.err){
		alert('err='+result.err)
	}else{
		alert('Not supported type: '+result.type)
	}
}
const readIos = (result)=>{
	//{fileName:'test.csv',fileSize:2499,uri:'file:///private/var/mobile/Containers/Data/Application/.../tmp/com.xrows-Inbox/test.csv'}
	let fi = getFileInfoIos(result.uri)
	if(fi.ext==='csv' || fi.ext==='xls' || fi.ext==='xlsx' ){
		Actions.refresh({
			key:'home',
			file:fi.full,
		});
	}else if(result.err){
		alert('err='+result.err)
	}else{
		alert(I18n.t('file_unsupported')+fi.ext)
	}
}
const getFileInfoIos = (filePath)=>{
	//filename.replace('%3A',':').replace('%2F','/')
        let path = filePath
        if(filePath.startsWith('file://')) {
            path = filePath.substring(7)
        }
	let lastIdx = path.lastIndexOf('/')
	let file = path.substr(lastIdx+1)
	let folder = path.substr(0,lastIdx)
	let dotIdx = file.lastIndexOf('.')
	let fileNoExt = file.substr(0,dotIdx)
	let ext = file.substr(dotIdx+1)
	return{
		dir:folder,
		name:file,
		ext:ext,
		noext:fileNoExt,
		full:path,
	}
}
const showFilePicker = ()=>{
	DocumentPicker.show({
		filetype: [DocumentPickerUtil.allFiles()],
	},(err,result) => {
		let readFile = Platform.OS==='ios'?readIos:readAndoid
		readFile(result)
	});
}
const MailSender = ()=>{
    Mailer.mail({
        subject: 'Query about Xconn app',
        recipients: ['sun.app.service@gmail.com'],
        //ccRecipients: ['supportCC@example.com'],
        //bccRecipients: ['supportBCC@example.com'],
        body: '',
        //isHTML: true, // iOS only, exclude if false
        //attachment: {
        //  path: '',  // The absolute path of the file from which to read data.
        //  type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
        //  name: '',   // Optional: Custom filename for attachment
        //}
    }, (error, event) => {
        if(error) {
            alert('Could not open mailbox. Please send manually to sun.app.service@gmail.com ');
        }
    });
}
const DoubleConfirmDialog = (title,content,func)=>{
	Alert.alert(
		title,   //I18n.t("feedback"),
		content, //I18n.t("confirm_feedback"),
		[
			{text:I18n.t("no"), },
			{text:I18n.t('yes'), onPress:()=>{
				//Linking.openURL('mailto:sun.app.service@gmail.com')
				func()
			}},
		]
	);
}
const renderOneMenu = (drawer,icon,name,func)=>{
    return(
        <TouchableOpacity
            style={styles.menu0}
            onPress={() => { drawer.close(); if(typeof func==='function'){ func() }else{alert(JSON.stringify(Actions))} } }>
            <View style={styles.menu_link}>
                <View style={{width:24,justifyContent:"center",}}>
                    <Icon name={icon} size={20} color={'white'} />
                </View>
                <Text style={styles.menu_name}>{name}</Text>
                <View style={{flex:1}}/>
            </View>
        </TouchableOpacity>
        )
}
const Menu = (props, context) => {
    const drawer = context.drawer;
    return (
        <View style={styles.menu_container}>
            <View style={styles.menu_title}>
				<Text style={styles.menu_name}>{I18n.t('menu')}</Text>
            </View>
            {renderOneMenu(drawer,'folder',I18n.t("open_file"),showFilePicker)}
            {renderOneMenu(drawer,'eye',I18n.t("overview"),Actions.overview)}
            {renderOneMenu(drawer,'envelope',I18n.t('feedback'),()=>DoubleConfirmDialog(I18n.t("feedback"),I18n.t("confirm_feedback"),MailSender))}
            {renderOneMenu(drawer,'info-circle',I18n.t("about"),Actions.about)}
        </View>
    )
}
Menu.contextTypes = contextTypes;
export default Menu;

