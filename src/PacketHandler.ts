import PacketAdapter from "./PacketAdapter";
import Packet from "./Packet";
import PacketContext from "./PacketContext";
import Connection from "./connection/Connection";
import ChatPacketAdapter from "./default/ChatPacketAdapter";

export default class PacketHandler {
    private readonly packetMap = new Map<string, PacketAdapter<any>>()
    private readonly defaultOptions = {
        registerDefaultPacket: true,
        debug: false
    }

    private readonly debug: boolean

    constructor(options = {}) {
        const newOptions = {...this.defaultOptions, ...options}

        this.debug = newOptions.debug
        if (newOptions.registerDefaultPacket) {
            this.registerDefaultPackets()
        }
    }

    registerDefaultPackets() {
        this.registerPacket(new ChatPacketAdapter())
    }

    onReceive(packetType: string, from: Connection, data: string) {
        const adapter = this.getAdapter(packetType)

        // if there's no packet that is associated with a
        // adapter, don't continue
        if (adapter == null) {
            return
        }

        const packet = adapter.onDeserialize(data);
        adapter.onReceive(new PacketContext<any>(this, packet, from))
    }

    send(packet: Packet, to: Connection) {
        const adapter = this.getAdapter(packet.type())

        // if there's no packet that is associated with a
        // adapter, don't continue
        if (adapter == null) {
            return
        }

        to.send(`[${packet.type()}] ${packet.toString()}`)
    }

    registerPacket(adapter: PacketAdapter<any>) {
        if (this.debug) {
            console.log(`register packet ${adapter.getType()}`)
        }
        this.packetMap.set(adapter.getType(), adapter)
    }

    unregisterPacket(type: string): boolean {
        if (this.debug) {
            console.log(`unregister packet ${type}`)
        }
        return this.packetMap.delete(type)
    }

    getAdapter(packet: string) {
        return this.packetMap.get(packet)
    }
}