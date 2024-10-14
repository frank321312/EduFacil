export class ValidationError extends Error {
    error: number;
    constructor(message: string, error: number) {
        super(message)
        this.name = "ValidationError"
        this.error = error
    }
}