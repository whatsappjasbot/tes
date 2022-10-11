const fs = require('fs')
const chalk = require('chalk')

exports.lmenu = () => {
	return `➢Informasi Anda

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
│.editinfo
│.antilink
│.autodelete
│.welcome
│.welcometext <Text>
│.demote
│.linkgc
└─────────◉
┌──(♦Main Menu)
│.menu
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
│.dell ( Hapus Pesan User )
│.del ( Hapus Pesan Bot )
└───────⭓
┌──⭓(♦Pencarian)
│
│.play <Query>
│.gimage <Query>
│.meme
│.walpaper <Query>
│.waifu
│.emojimix <Emoji>+<Emoji> ( 😂+😇 )
└───────⭓
┌──⭓(♦Download))
│
│.ytmp4 <Link>
│.ytmp3 <Link>
│.ssweb <Link>
│.tiktok <Link>
│.ig <Link>
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
└───────⭓`}
exports.lantilink = () => {
  return `Mengirim Link`
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
