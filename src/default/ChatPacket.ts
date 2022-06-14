import Packet from "../Packet";

export default abstract class ChatPacket extends Packet {
    private readonly message: string

    protected constructor(message: string) {
        super()
        this.message = message
    }

    getMessage() {
        return this.message
    }
}

export class SimpleChatPacket extends ChatPacket {

    constructor(message: string) {
        super(message);
    }
}