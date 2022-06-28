import Connection from './connection/Connection';
import PacketHandler from "./PacketHandler";
import Packet from "./Packet";

export default class PacketContext<P extends Packet> {
    private readonly packetHandler: PacketHandler
    private readonly packet: P
    private readonly from: Connection

    constructor(packetHandler: PacketHandler, packet: P, from: Connection) {
        this.packetHandler = packetHandler
        this.packet = packet;
        this.from = from
    }

    /**
     * This can be used, for example, send reply packet to the sender.
     *
     * @example
     * // the sender
     * const sender = this.getFrom()
     * const replyPacket = new ChatPacket("Pong!")
     *
     * // sending a reply message back to the sender
     * this.getPacketHandler().send(replyPacket, sender)
     *
     * // convenience method
     * PacketUtil.reply(context, replyPacket)
     *
     * @return an instance of PacketHandler handler.
     */
    getPacketHandler(): PacketHandler {
        return this.packetHandler
    }

    /**
     * The packet that was sent from the sender.
     *
     * @return the packet the sender sent.
     */
    getPacket(): P {
        return this.packet
    }

    /**
     * This can be used, combined with {@link PacketHandler}
     * to send a reply message. Also see {@link PacketUtil#reply}
     *
     * @return the sender connection.
     */
    getFrom(): Connection {
        return this.from
    }
}