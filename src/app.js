import React, { Component } from 'react'
import {TouchableHighlight} from 'react-native'
import {Actions, Scene, Router, ActionConst,} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from './v/Drawer';
import Book from './v/Book'
import Menu from './v/Menu'
import Home from './v/Home'
import SqlAdd from './v/SqlAdd'
import SqlEdit from './v/SqlEdit'
import FuncAdd from './v/FuncAdd'
import FuncEdit from './v/FuncEdit'
import About  from './v/About'
import Result from './v/Result'
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
          <Scene key="inner">
            <Scene key="home" component={Home} title={I18n.t('home')} initial={true} drawerIcon={drIcon}/>
            <Scene key="sql_edit" component={SqlEdit} title={I18n.t('sql_editor')} renderLeftButton={renderBackIcon} />
            <Scene key="sql_add" component={SqlAdd} title={I18n.t('sql_add')} renderLeftButton={renderBackIcon} />
            <Scene key="func_edit" component={FuncEdit} title={I18n.t('func_editor')} renderLeftButton={renderBackIcon} />
            <Scene key="func_add" component={FuncAdd} title={I18n.t('func_add')} renderLeftButton={renderBackIcon} />
            <Scene key="book" component={Book} title={I18n.t("manual")} renderLeftButton={renderBackIcon} />
            <Scene key="formModal" component={FormModal} title={I18n.t("form")} renderLeftButton={renderBackIcon} />
            <Scene key="about" component={About} title={I18n.t('about')} renderLeftButton={renderBackIcon} />
            <Scene key="result" component={Result} title={I18n.t('result')} renderLeftButton={renderBackIcon} />
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
	<MenuContext style={{ flex: 1, flexDirection: 'row',}} ref={"menu"}>
            <Router scenes={scenes} />
	</MenuContext>
        )
    }
}
