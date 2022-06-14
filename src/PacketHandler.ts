import PacketListener from "./PacketListener";
import Packet from "./Packet";
import PacketContext from "./PacketContext";
import Connection from "./connection/Connection";
import ChatPacketListener from "./default/ChatPacketListener";

export default class PacketHandler {
    private readonly packetMap = new Map<string, PacketListener<any>>()

    constructor() {
        this.registerPacket(new ChatPacketListener())
    }

    onReceive(packetType: string, from: Connection, data: string) {
        const listener = this.getListener(packetType)

        // if there's no packet that is associated with a
        // listener, don't continue
        if (listener == null) {
            return
        }

        const packet = listener.onDeserialize(data);
        listener.onReceive(new PacketContext<any>(this, packet, from))
    }

    send(packet: Packet, to: Connection) {
        const listener = this.getListener(packet.type())

        // if there's no packet that is associated with a
        // listener, don't continue
        if (listener == null) {
            return
        }

        const input = listener.onSerialize(packet)
        to.send(`[${packet.type()}] ${input}`)
    }

    registerPacket(listener: PacketListener<any>) {
        console.log(`register packet ${listener.getType()}`)
        this.packetMap.set(listener.getType(), listener)
    }

    unregisterPacket(type: string): boolean {
        console.log(`unregister packet ${type}`)
        return this.packetMap.delete(type)
    }

    getListener(packet: string) {
        return this.packetMap.get(packet)
    }
}