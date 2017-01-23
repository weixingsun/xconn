module.exports = {
  CMD:{
    //System Operations
    HB:  'HB',  //'Heart Beat',
    AN:  'AN',  //'Add Node',
    ANS: 'ANS', //'Add Node Success',
    ANF: 'ANF', //'Add Node Fail',
    DO:  'DO',  //'Do a task: from server to client',
    DONE:'DONE',//'Done a task: from client to server',
    USE: 'USE', //'Get System Usage',

    //Data Operations
    DL:  'DL', //'Download a file: from server to client',
    DLD: 'DLD',//'Complete a download: from client to server',
    UL:  'UL', //'Upload a file: from client to server',
    ULD: 'ULD',//'Complete a Upload: from client to server',
  },
  ROLE:{
    CLIENT:'c',
    SERVER:'s',
  },
}
