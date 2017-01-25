import React, { Component } from 'react'
import {TouchableHighlight} from 'react-native'
import {Actions, Scene, Router, ActionConst,} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from './v/Drawer';
//import Book from './v/Book'
import Menu from './v/Menu'
import Home from './v/Home'
import Server from './v/Server'
import Client from './v/Client'
import About  from './v/About'
import Web  from './v/Web'
import FormModal from './v/FormModal'
import Langs from './lang/all';
import I18n from 'react-native-i18n';
import { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from './style'
const drIcon=<Icon name={"bars"} color={"#2a2929"} size={30}/>
const renderBackIcon=function(){
    return (
    <TouchableHighlight onPress={Actions.pop}>
        <Icon name={"chevron-left"} color={"#2a2929"} size={24} style={styles.bk} />
    </TouchableHighlight>
    )
}
const scenes = Actions.create(
    <Scene key="root">
        <Scene key="drawer" component={Drawer} open={false} type={"reset"} >
          <Scene key="inner" type={'replace'}>
            <Scene key="home" component={Home} initial={true} drawerIcon={drIcon} />
            <Scene key="server" component={Server} title={I18n.t('server')} type={'push'}/>
            <Scene key="client" component={Client} title={I18n.t('client')} type={'push'}/>
            <Scene key="web" component={Web} title={I18n.t('ip')} type={'push'}/>
            <Scene key="formModal" component={FormModal} title={I18n.t("form")} renderLeftButton={renderBackIcon} />
            <Scene key="about" component={About} title={I18n.t('about')} renderLeftButton={renderBackIcon} />
          </Scene>
        </Scene>
    </Scene>
);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentWillMount() {}
    render() {
        return (
	<MenuContext style={{ flex: 1, flexDirection: 'row',}} ref={mc => this.menuContext = mc}>
            <Router scenes={scenes} />
	</MenuContext>
        )
    }
}
