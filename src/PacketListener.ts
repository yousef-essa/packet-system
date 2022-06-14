import PacketContext from "./PacketContext";
import Packet from "./Packet";

export default abstract class PacketListener<P extends Packet> {
    private readonly type: string

    protected constructor(type: string) {
        this.type = type;
    }

    abstract onDeserialize(message: string): P
    abstract onReceive(context: PacketContext<P>): void
    abstract onSerialize(packet: P): string

    getType() {
        return this.type
    }
}