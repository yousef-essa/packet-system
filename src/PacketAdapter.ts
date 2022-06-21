import PacketContext from "./PacketContext";
import Packet from "./Packet";

export default abstract class PacketAdapter<P extends Packet> {
    private readonly type: string

    protected constructor(type: string) {
        this.type = type;
    }

    abstract onDeserialize(serializedData: string): P
    abstract onReceive(context: PacketContext<P>): void

    abstract receiptStatus(): PacketReceiptStatus

    getType() {
        return this.type
    }
}

export enum PacketReceiptStatus {
    BOTH,
    SERVER,
    CLIENT
}