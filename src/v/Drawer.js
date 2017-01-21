import React from 'react';
import Drawer from 'react-native-drawer';
import Menu from './Menu';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class extends React.Component {
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                drawerIcon={<Icon name={"bars"} color={"#2a2929"} size={30}/>}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                //type="static"
                //type="displace"
                type="overlay"
                content={<Menu />}
                tapToClose={true}
                openDrawerOffset={0.3}
                //panCloseMask={0.2}
                //negotiatePan={true}
                //tweenHandler={Drawer.tweenPresets.parallax}
                //tweenHandler={(ratio) => ({
                // main: { opacity:Math.max(0.54,1-ratio) }
                //})}
            >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}
