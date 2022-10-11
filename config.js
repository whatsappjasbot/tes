//libery Tambahan
const fs = require('fs')
const chalk = require('chalk')


// Owner Yg akan di tampilkan ( .owner )
global.owner = ['6285748411847','6281228007929']

//Nomer Creator Buat Fitur Report, Untuk laporan Bug Jangan di ganti Biar Tidak Terganggu bila ada spam
//Nomer Tidak di tampilkan Ke Bot
global.owner1 = '6285748411847'
global.ownere = '6285748411847@s.whatsapp.net'

//Ubah Ke True Untuk Otomatis Update Sebelum Bot Berjalan
global.autoupdate = false //Jangan Di ubah Di Versi ini

//Auto Read Message
global.autoread = true

//Auto Pesan Selamat datang, leave, promote, demote
global.demote = false
global.autopromote = false



//API KEY
global.keyneor = 'acuyxzyyy' //https://api.neoxr.my.id


//PackName Setiker
global.packname = ''
global.author = 'Setiker ini di buat oleh Botn/Whatsapp Bot\nwa.me/6281357396914'

//Nama Session Whatsapp D
global.sessionName = 'main'

//Lanjutan
global.prefa = ['.']

global.sp = '♦'
//function Pesan Singkat
global.mess = {
    success: '✓ Success',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'Loading...',
    limit: 'Maaf Anda sudah Mencapai Limit, Silahkan Tunggu Besok',
    
}

//Gambar thumb
global.thumb = fs.readFileSync('./lib/thum.jpg')



//Dibawah Ini Jangan Di rubah Biar tidak error
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
