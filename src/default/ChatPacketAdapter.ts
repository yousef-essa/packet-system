import PacketAdapter, {PacketReceiptStatus} from "../PacketAdapter";
import ChatPacket, {SimpleChatPacket} from "../default/ChatPacket";
import PacketContext from "../PacketContext";
import PacketUtil from "../PacketUtil";

export default class ChatPacketAdapter extends PacketAdapter<ChatPacket> {
    constructor() {
        super(ChatPacket.PACKET_NAME)
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

    receiptStatus(): PacketReceiptStatus {
        return PacketReceiptStatus.BOTH;
    }
}