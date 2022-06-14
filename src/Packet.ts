export default abstract class Packet {
    type(): string {
        return this.constructor.name
    }
}