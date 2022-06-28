import Packet from "./Packet";
import PacketContext from "./PacketContext";

export default class PacketUtil {
    /**
     * A convenience method for sending a reply message.
     *
     * @param context the packet context that was created from adapter.
     * @param packet the packet to be sent to sender.
     */
    public static reply(context: PacketContext<any>, packet: Packet) {
        context.getPacketHandler().send(packet, context.getFrom())
    }
}