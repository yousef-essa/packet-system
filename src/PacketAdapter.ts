import PacketContext from "./PacketContext";
import Packet from "./Packet";

export default abstract class PacketAdapter<P extends Packet> {
    private readonly type: string

    /**
     * @param type the packet type
     * @protected
     */
    protected constructor(type: string) {
        this.type = type;
    }

    /**
     * Transform the serialized string back into the
     * respective packet object.
     *
     * @param serializedData the serialized data
     * @return the deserialized object
     */
    abstract onDeserialize(serializedData: string): P

    /**
     * When the receiver receives a message.
     *
     * @param context the packet context.
     */
    abstract onReceive(context: PacketContext<P>): void

    /**
     * To determine the receipt status for the respective packet.
     * See {@link PacketReceiptStatus} for more details.
     */
    abstract receiptStatus(): PacketReceiptStatus

    /**
     * @summary Match the {@link Packet#getType}, otherwise it won't work.
     *
     * This will be used ot bind the adapter with the respective
     * packet. This has to match the given packet, otherwise it
     * won't work as intended.
     * <br>
     * Look at {@link ChatPacket} and {@link ChatPacketAdapter}
     * for good examples.
     */
    getType() {
        return this.type
    }
}

export enum PacketReceiptStatus {
    /**
     * Both server and client can receive the packet.
     */
    BOTH,
    /**
     * Only the server can receive the packet.
     */
    SERVER,
    /**
     * Only the client can receive the packet.
     */
    CLIENT
}