import Connection from "../connection/Connection";
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

    getPacketHandler(): PacketHandler {
        return this.packetHandler
    }

    getPacket(): P {
        return this.packet
    }

    getFrom(): Connection {
        return this.from
    }
}