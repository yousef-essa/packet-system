export default abstract class Connection {
    /**
     * The unique identifier of this connection.
     * <br>
     * This is for accurately identify the connection
     * object with this id.
     *
     * @return the unique identifier of this connection.
     */
    abstract id(): string

    /**
     * Send a message to this connection.
     *
     * @param message the message to send.
     */
    abstract send(message: string): void

    /**
     * Closes the connection.
     */
    abstract close(): void

    /**
     * When the connection gets closed.
     */
    onClose(): void {
    }

    /**
     * To identify whether the connection is closed or not.
     *
     * @return true when the connection is closed, otherwise false.
     */
    abstract isClosed(): boolean
}