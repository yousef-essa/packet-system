export default abstract class Connection {
    abstract id(): string

    abstract send(message: string): void

    abstract close(): void

    onClose(): void {
    }

    abstract isClosed(): boolean
}