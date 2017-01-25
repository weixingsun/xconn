import { self } from 'react-native-workers';
import http from 'react-native-mongoose'

self.PORT = 9999
// receive messages from main thread
self.onmessage = (msg) => {
    if(msg==='start'){
        http.start({
            port:self.PORT+'',
            root:'DOCS',
        })
        self.postMessage("http start:"+self.PORT);
    }else if(msg==='stop'){
        http.stop()
        self.postMessage("http stop");
    }
}

function loop() {
  setTimeout(loop, 99000);
}

setTimeout(loop, 99000);
