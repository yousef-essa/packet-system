import Packet from "./Packet";
import PacketContext from "./PacketContext";

export default class PacketUtil {
    private static PACKET_TYPE_REGEX: RegExp = /(?<=\[).+?(?=\])/

    /**
     * A convenience method for sending a reply message.
     *
     * @param context the packet context that was created from adapter.
     * @param packet the packet to be sent to sender.
     */
    public static reply(context: PacketContext<any>, packet: Packet) {
        context.getPacketHandler().send(packet, context.getFrom())
    }

    /**
     * This method attempts to retrieve the packet
     * type from the given message content.
     *
     * @param message the message content to retrieve packet type from.
     * @return the packet type if applicable, otherwise 'unknown' is returned.
     */
    public static packetType(message: string): string {
        const searchValue = this.PACKET_TYPE_REGEX.exec(message)

        const firstValue = searchValue?.find(((_value, index) => index == 0))
        if (searchValue == undefined || firstValue == undefined) {
            return "unknown"
        }

        return firstValue
    }

    /**
     * A convenience method for getting rid of the packet
     * type from the message content.
     *
     * @param type the packet type that will be removed
     * @param message the message content to remove from
     * @return the message content without the packet type if applicable,
     * otherwise the message will return as untouched.
     */
    public static removePacketType(type: string, message: string): string {
        return message.replace(`[${type}] `, '')
    }
}