import Packet from "./Packet";
import PacketContext from "./PacketContext";

export default class PacketUtil {
    static reply(context: PacketContext<any>, packet: Packet) {
        context.getPacketHandler().send(packet, context.getFrom())
    }
}