import { self } from 'react-native-workers';
import udp from 'react-native-udp'
import DeviceInfo from 'react-native-device-info'
import NetworkInfo from 'react-native-network-info'
import Base64 from './src/hi-base64'
import Const from './src/Const'
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
  if(self.role === Const.ROLE.SERVER) sendMsg(self.bcip,self.PORT,JSON.stringify(self.pkt))
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
    self.socket = udp.createSocket('udp4')
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
function startBroadcast(){
    if(self.broadcasting) return
    self.name=DeviceInfo.getDeviceName()
    self.mfg=DeviceInfo.getManufacturer()
    NetworkInfo.getIPAddress(ip => {
        self.myip=ip
        wrapHbPkt()
    });
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
    let arr = self.myip.split('.')
    self.bcip=arr[0]+'.'+arr[1]+'.'+arr[2]+'.255'
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
      startListen()
      startBroadcast()
    }
}

setTimeout(loop, 5000);
