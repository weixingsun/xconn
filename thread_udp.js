import { self } from 'react-native-workers';
import udp from 'react-native-udp'
import DeviceInfo from 'react-native-device-info'
import NetworkInfo from 'react-native-network-info'
import Base64 from './src/hi-base64'
import Const from './src/Const'

var ip_reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
var mask_reg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;

if(!String.prototype.startsWith){
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
}
self.PORT = 9998
//self.socket = udp.createSocket('udp4')
//self.role = Const.ROLE.CLIENT
//self.myip='127.0.0.1'
//self.name=''
//self.dev=''
// receive messages from main thread
self.onmessage = (msg) => {
  if(msg==='start') startListen()
  //else if(msg==='stop') stopListen()
  else if(msg.startsWith('role:')) changeRole(msg)
  //alert('worker udp received message: '+ msg);
  //self.postMessage("Ping");
}

function loop() {
  //self.postMessage("Ping");
  if(self.role===Const.ROLE.SERVER){
    let toip = self.bcip===''?self.myip:self.bcip
    sendMsg(toip,self.PORT,JSON.stringify(self.pkt))
  }
  setTimeout(loop, 5000);
}
function changeRole(msg){
  self.role=msg.substring(5)
  if(self.role === Const.ROLE.SERVER) startBroadcast()
  //else stopBroadcast()
  self.postMessage("udp role:"+self.role);
}
function arr2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}
function str2arr(obj) {
    var uint = new Uint8Array(obj.length);
    for (var i = 0, l = obj.length; i < l; i++){
      uint[i] = obj.charCodeAt(i);
    }
    return new Uint8Array(uint);
}
function stopListen(){
    self.socket.close()
    self.postMessage("udp stopped");
}
function startListen(){
    if(self.listening) return
    NetworkInfo.getAllIPs(ips => {
        let pip=getPrimaryIPMask(JSON.parse(ips))
        self.myip=pip.addr
        self.bcip = getBroadcastAddr4(pip.mask,pip.addr)
        //alert(self.myip+' \n'+self.bcip)
        wrapHbPkt()
        init()
    });
}
function init(){
    let p = self.myip.indexOf('.')<0?'udp6':'udp4'
    self.socket = udp.createSocket(p)
    self.socket.bind(self.PORT, (err)=>{
        if (err) throw err;
        self.socket.setBroadcast(true);
    });
    //receive
    self.socket.on('message', (data, rinfo)=>{
        //let msg = data.toString() //b64.fromByteArray(data)
        let str64 = arr2str(data)
        let strMsg = Base64.decode(str64)
        let body = JSON.parse(strMsg)
        let udp_msg = {}
        udp_msg['p']='udp'
        udp_msg['role']=self.role
        udp_msg['body']=body
        udp_msg['type']='rcv'
        self.postMessage(JSON.stringify(udp_msg));
        //alert(strMsg)
        //var servers = this.state.servers
        //servers[json.ip]=json
        //this.setState({ servers })
        //console.warn('received msg:'+msg)
        //this.updateWithActionIcon()
    })
    //ready
    self.socket.once('listening', ()=>{
        self.postMessage("udp is listening");
    })
    self.listening=true
}
function getPrimaryIPMask(ips){
    let pip = {addr:'127.0.0.1',mask:'255.255.255.255'}
    if(ips['en0/ipv4']){
        pip=ips['en0/ipv4']
    }else if(ips['en0/ipv6']){
        pip=ips['en0/ipv6']
    }else if(ips['pdp_ip0/ipv4']){
        pip=ips['pdp_ip0/ipv4']
    }else if(ips['pdp_ip0/ipv6']){
        pip=ips['pdp_ip0/ipv6']
    }
    return pip
}
function startBroadcast(){
    if(self.broadcasting) return
    self.name=DeviceInfo.getDeviceName()
    self.mfg=DeviceInfo.getManufacturer()
    /*NetworkInfo.getAllIPs(ips => {
        let pip=getPrimaryIPMask(JSON.parse(ips))
        self.myip=pip.addr
        self.bcip = getBroadcastAddr4(pip.mask,pip.addr)
        //alert(self.myip+' \n'+self.bcip)
        wrapHbPkt()
    })*/
    self.postMessage("udp startBroadcast");
    self.broadcasting=true
}
function stopBroadcast(){
    self.socket.close()
    self.postMessage("udp stop broadcast");
}
function wrapHbPkt(){
    self.pkt = {
        cmd:'HB',
        role:self.role,  //127.0.0.1
        ip:self.myip,
        name:self.name,
        mfg:self.mfg,
        //this.sendMsg(bcip,this.UDP_LISTEN_PORT,JSON.stringify(json))
    }
}
function sendMsg(host,port,msg){
    if(self.socket!=null){
      let msg64 = Base64.encode(msg)
      var buf = str2arr(msg64)
      self.socket.send(buf, 0, buf.length, port, host, (err)=>{
        if (err) {
          //if(self.socket.close) self.socket.close()
          //startBroadcast()
          console.log('error sent msg:'+msg)
        }else{
          console.log('sent msg:'+msg)
        }
      })
    }else{
      //startListen()
      startBroadcast()
    }
}
/////////////////////////////////////////////////////////////////////////
function binary_to_ip4(binary){
    if (binary.length == 32) {
        let a = parseInt(binary.substr(0, 8), 2);
        let b = parseInt(binary.substr(8, 8), 2);
        let c = parseInt(binary.substr(16, 8), 2);
        let d = parseInt(binary.slice(-8), 2);
        return a + '.' + b + '.' + c + '.' + d;
    }
    return '';
}
function ip_to_binary4(ip){
    if (ip_reg.test(ip)) {
        var ip_str = "", ip_arr = ip.split(".");
        for (var i = 0; i < 4; i++) {
            let curr_num = ip_arr[i];
            let number_bin = parseInt(curr_num);
            number_bin = number_bin.toString(2);
            let count = 8 - number_bin.length;
            for (var j = 0; j < count; j++) {
                number_bin = "0" + number_bin;
            }
            ip_str += number_bin;
        }
        return ip_str;
    }
    return '';
}
function getBroadcastAddr4(mask, ip){
    if(ip.indexOf('.')<0) return ''
    /*
    let network_broadcast = [];
    let network_addr = "";
    let mask_arr = mask.split(".");
    let ip_arr = ip.split(".");
    // 计算IP的网络地址 与(&)运算
    for (var i = 0; i < mask_arr.length; i++) {
        let number1 = parseInt(mask_arr[i]);
        let number2 = parseInt(ip_arr[i]);
        network_addr += number1 & number2;
        if( i < 3 ){
            network_addr += ".";
        }
    }
    network_broadcast.push(network_addr);
    */
    // 计算广播地址
    // 子掩码后面有几个0，就去掉IP地址后几位再补1
    let mask_binary = ip_to_binary4(mask);
    let ip_binary = ip_to_binary4(ip);
    let mask_zero = mask_binary.split(0).length - 1;
    let one_number = new Array(mask_zero + 1).join('1'); // IP地址后位补1
    let ip_1 = ip_binary.slice(0, -mask_zero) + one_number;
    //network_broadcast.push(binary_to_ip(ip_1));
    //return network_broadcast;
    return binary_to_ip4(ip_1);
}

setTimeout(loop, 5000);
