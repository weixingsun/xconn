import React from 'react';
import {Alert,Image,ListView, View, Text, StyleSheet, ScrollView, TouchableOpacity,NativeModules,Linking,WebView} from "react-native";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import I18n from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info'
import styles from '../style'
//import NetworkInfo from 'react-native-network-info'

export default class Web extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            //ip:this.props.url,
        }
        this.WEB='web'
    }
    componentWillMount() {
        Actions.refresh({
            key:'web',
            title:this.props.url,
            //renderRightButton: ()=> <Icon name={'play'} size={20} color={'#333'} onPress={()=>  } />,
            //renderRightButton: this.renderMore,
            //renderLeftButton:  null,
        });
    }
    render(){
        return (
          <View style={styles.web}>
            <WebView
            //style={Style.web} 
            ref={this.WEB}
            source={{uri:this.props.url}}
            //scalesPageToFit={true}
            //automaticallyAdjustContentInsets={false}
            //decelerationRate="normal"
            //st5artInLoadingState={true}
            domStorageEnabled={true}
            javaScriptEnabled={false}
            //onNavigationStateChange={this.onNavigationStateChange}
            //onShouldStartLoadWithRequest={()=>{return true}}
            />
          </View>
        );
    }
}
