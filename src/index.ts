// export const sum = (a: number, b: number) => {
//   if ('development' === process.env.NODE_ENV) {
//     console.log('boop');
//   }
//   return a + b;
// };

import Connection from './connection/Connection'

import Packet from './Packet'
import PacketHandler from './PacketHandler'
import PacketContext from './PacketContext'
import PacketListener from './PacketListener'
import PacketUtil from './PacketUtil'
import ChatPacket from './default/ChatPacket'
import ChatPacketListener from './default/ChatPacketListener'

export { Connection, Packet, PacketHandler, PacketContext, PacketListener, PacketUtil, ChatPacket, ChatPacketListener }

// module.exports = {
//   Connection: Connection,
//   Packet: Packet,
//   PacketHandler: PacketHandler,
//   PacketContext: PacketContext,
//   PacketListener: PacketListener,
//   PacketUtil: PacketUtil,
//   ChatPacket: ChatPacket,
//   ChatPacketListener: ChatPacketListener
// }