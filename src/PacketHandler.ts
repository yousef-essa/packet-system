import PacketAdapter, {PacketReceiptStatus} from "./PacketAdapter";
import Packet from "./Packet";
import PacketContext from "./PacketContext";
import Connection from "./connection/Connection";
import ChatPacketAdapter from "./default/ChatPacketAdapter";

export default class PacketHandler {
    private readonly packetMap = new Map<string, PacketAdapter<any>>()
    private readonly defaultOptions = {
        registerDefaultPacket: true,
        debug: false,
        isServer: false
    }

    private readonly debug: boolean
    private readonly receiptStatus: PacketReceiptStatus

    constructor(options = {}) {
        const newOptions = {...this.defaultOptions, ...options}

        this.debug = newOptions.debug
        this.receiptStatus = newOptions.isServer ? PacketReceiptStatus.SERVER : PacketReceiptStatus.CLIENT
        if (newOptions.registerDefaultPacket) {
            this.registerDefaultPackets()
        }
    }

    /**
     * Registers the default packets; shall be overwritten if preferred
     */
    registerDefaultPackets() {
        this.registerPacket(new ChatPacketAdapter())
    }

    /**
     * Attempts to find the appropriate {@link PacketAdapter},
     * and if it does, and the packet receipt status
     * is appropriate, the respective adapter
     * onReceive method will be invoked.
     *
     * @param packetType the packet type that was sent.
     * @param from the sender connection.
     * @param data the message received.
     */
    onReceive(packetType: string, from: Connection, data: string) {
        const adapter = this.getAdapter(packetType)

        // if there's no packet that is associated with
        // an adapter, don't continue
        if (adapter == null) {
            return
        }

        const receiptStatus = adapter.receiptStatus();
        // if the receipt does not match, do not continue
        if (receiptStatus != PacketReceiptStatus.BOTH && this.receiptStatus != receiptStatus) {
            return
        }

        const deserializedPacket = adapter.onDeserialize(data);
        const packetContext = new PacketContext<any>(this, deserializedPacket, from);

        adapter.onReceive(packetContext)
    }

    /**
     * Sends a message to the target with the given packet.
     *
     * @example
     * // the packet that be sent
     * const helloPacket = new ChatPacket("Hello!")
     *
     * // the target that will receive the packet
     * const target = ...
     *
     * this.send(helloPacket, target)
     *
     * @param packet the packet that will be sent.
     * @param to the target that will receive the packet.
     */
    send(packet: Packet, to: Connection) {
        const adapter = this.getAdapter(packet.type())

        // if there's no packet that is associated with a
        // adapter, don't continue
        if (adapter == null) {
            return
        }

        to.send(`[${packet.type()}] ${packet.toString()}`)
    }

    /**
     * Registers the packet's adapter by binding the
     * {@link PacketAdapter#getType} with the given adapter
     * in a map.
     *
     * @param adapter the adapter to register.
     */
    registerPacket(adapter: PacketAdapter<any>) {
        if (this.debug) {
            console.log(`register packet ${adapter.getType()}`)
        }
        this.packetMap.set(adapter.getType(), adapter)
    }

    /**
     * Unregisters the packet's adapter by removing
     * the value that is associated with the packet's
     * type key; if applicable, of course.
     *
     * @param type the packet name to unregister.
     */
    unregisterPacket(type: string): boolean {
        const deleted = this.packetMap.delete(type);
        if (this.debug && deleted) {
            console.log(`unregister packet ${type}`)
        }
        return deleted
    }

    getAdapter(packet: string) {
        return this.packetMap.get(packet)
    }
}