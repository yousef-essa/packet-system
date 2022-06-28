export default abstract class Packet {
    /**
     * The packet identifier.
     * <br>
     * This has to be uniquely different to all other packets,
     * as this will be used to store/retrieve the packet's adapter.
     *
     * @return the packet identifier.
     */
    abstract type(): string

    /**
     * The serialized data of this packet object.
     * <br>
     * This will be used to serialize the packet, transmit
     * the data to other connection(s), and deserialize
     * the data back into the respective packet with a
     * help of the respective packet's adapter.
     *
     * @return the serialized data of this packet object.
     */
    abstract serialize(): string

    /**
     * The serialized data of this packet object.
     * <br>
     * @return the {@link serialize}d data.
     */
    toString(): string {
        return this.serialize()
    }
}