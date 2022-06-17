export default abstract class Packet {
    abstract type(): string
    abstract serialize(): string

    toString(): string {
        return this.serialize()
    }
}