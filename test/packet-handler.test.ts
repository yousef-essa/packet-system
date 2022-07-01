import {Connection, PacketReceiptStatus, PacketUtil, SimpleChatPacket, PacketHandler} from "../src";

// server tests
const serverHandler = new PacketHandler({
    isServer: true
})

test("the server's receipt is equal to SERVER", () => {
    return expect(serverHandler["receiptStatus"]).toBe(PacketReceiptStatus.SERVER)
})

test("receive pong message from client", () => {
    let pongCallback = false
    // this callback is guaranteed to be invoked if the server-side
    // happen to receive a reply immediately after the message got
    // proceeded by the client-side; thanks to call stack!
    const callback = (content: string) => {
        pongCallback = content == "Pong"
    }

    // server sends a chat packet to client
    serverHandler.send(new SimpleChatPacket("Ping"), createClientConnection(callback))
    expect(pongCallback).toBeTruthy()
})

// client tests
const clientHandler = new PacketHandler()

test("the client's receipt is equal to CLIENT", () => {
    return expect(clientHandler["receiptStatus"]).toBe(PacketReceiptStatus.CLIENT)
})

test("receive pong message from server", () => {
    let pongCallback = false
    // this callback is guaranteed to be invoked if the server-side
    // happen to receive a reply immediately after the message got
    // proceeded by the client-side; thanks to call stack!
    const callback = (content: string) => {
        pongCallback = content == "Pong"
    }

    clientHandler.send(new SimpleChatPacket("Ping"), createServerConnection(callback))
    expect(pongCallback).toBeTruthy()
})

// other

class SimpleConnection extends Connection {
    private readonly _id: string
    private readonly onSend: Function

    constructor(id: string, onSend: Function) {
        super();
        this._id = id;
        this.onSend = onSend;
    }

    close(): void {
        // do nothing
    }

    id(): string {
        return this._id;
    }

    isClosed(): boolean {
        return false;
    }

    send(message: string): void {
        this.onSend(message)
    }
}

function createClientConnection(callback: (content: string) => void, invokeCallback = false): Connection {
    return new SimpleConnection("CLIENT_ID", (message: string) => {
        const packetType = PacketUtil.packetType(message)
        const content = PacketUtil.removePacketType(packetType, message)

        // console.log(`[client] received '${content}' from server!`)
        if (invokeCallback) {
            callback(content)
        }

        clientHandler["onReceive"](packetType, createServerConnection(callback, true), content)
    })
}

function createServerConnection(callback: (content: string) => void, invokeCallback = false): Connection {
    return new SimpleConnection("SERVER_ID", (message: string) => {
        const packetType = PacketUtil.packetType(message)
        const content = PacketUtil.removePacketType(packetType, message)

        // console.log(`[server] received '${content}' from client!`)
        if (invokeCallback) {
            callback(content)
        }

        serverHandler["onReceive"](packetType, createClientConnection(callback, true), content)
    })
}
