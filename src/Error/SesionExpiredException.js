export default class SesionExpiredException extends Error {
    constructor(requestContext) {
        super('No se hay sesión iniciada');
        this.requestContext = requestContext;
        this.name = this.constructor.name;

        // Use V8's native method if available, otherwise fallback
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, SesionExpiredException);
        } else {
            this.stack = (new Error()).stack;
        }
    }
}