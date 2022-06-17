import Packet from "../Packet";

export default abstract class ChatPacket extends Packet {
    public static readonly PACKET_NAME = "ChatPacket"
    private readonly message: string

    protected constructor(message: string) {
        super()
        this.message = message
    }

    getMessage() {
        return this.message
    }

    type(): string {
        return ChatPacket.PACKET_NAME
    }
}

export class SimpleChatPacket extends ChatPacket {
    constructor(message: string) {
        super(message);
    }

    serialize(): string {
        return this.getMessage();
    }
}