export default abstract class Connection {
    abstract id(): string

    abstract send(message: string): void
    abstract close(): void

    abstract isClosed(): boolean
}