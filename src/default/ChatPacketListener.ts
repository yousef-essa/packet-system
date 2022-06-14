import PacketListener from "../PacketListener";
import ChatPacket, {SimpleChatPacket} from "../default/ChatPacket";
import PacketContext from "../PacketContext";
import PacketUtil from "../PacketUtil";

export default class ChatPacketListener extends PacketListener<ChatPacket> {
    constructor() {
        super(SimpleChatPacket.name)
    }

    onSerialize(packet: ChatPacket): string {
        return packet.getMessage()
    }

    onReceive(context: PacketContext<ChatPacket>) {
        if (context.getPacket().getMessage() == 'Ping') {
            PacketUtil.reply(context, new SimpleChatPacket("Pong"))
        }
        // do nothing
    }

    onDeserialize(message: string): ChatPacket {
        return new SimpleChatPacket(message);
    }
}