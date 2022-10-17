let handler = async (m, { conn, text } ) => {
 let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])

conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
  m.reply('*D O N E !*')
}
handler.command = ['o9']
handler.tags = ['o9']
handler.help = ['o9']

handler.rowner = true

export default handler
