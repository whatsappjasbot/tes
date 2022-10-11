try {
  low = require("lowdb");
  console.log('lowdb')
} catch (e) {
  low = require("./lowdb");
  console.log('Pakai Modul local')
}
const chalk = require('chalk')
const fs = require('fs')
const { Low, JSONFile, LowSync, JSONFileSync } = low;
const db = new LowSync(new JSONFileSync("./db.json"));

exports.addlimit = (no, limit) => {
//function addlimit(no, limit) {
  db.read()
  let users = db.data.users[no]
  if (users) {
    users.limit += limit
    db.write()
    status = true
  }else{
    log = ceklimit(no)
    db.read()
    let users = db.data.users[no]
    users.limit += limit
    db.write()
    status = true
  }
  return status
}
exports.veriflimit = (no) => {
//function veriflimit(no){
    db.read()
    if(db.data.users[no].limit < 1) {
      status = true
    }else{
      status = false
    }    
    return status
}
exports.ceklimit = (no) => {
//function ceklimit(no) {
    db.read();             
    let users = db.data.users[no];
    if (users) {
      db.read();
      totallimit = users.limit
    } else {
      db.data.users[no] = {
        ban: false,
        moderator: false,
        vip: false,
        limit: 20,
        nama: '',
        verif: false
      };
      db.write();
      db.read();
      totallimit = 20
    }
    return totallimit;
}
exports.removelimit = (no, limit) => {
//function removelimit(no, limit) {
  db.read()
  let users = db.data.users[no]
  if (users) {
    users.limit -= limit
    db.write()
    status = true
  }else{
    log = ceklimit(no)
    db.read()
    let users = db.data.users[no]
    users.limit -= limit
    db.write()
    status = true
  }
  return status
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
