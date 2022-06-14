export default abstract class Connection {
    abstract send(message: string): void
}