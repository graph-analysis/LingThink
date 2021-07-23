class BaseError extends Error {
	constructor(name: string, message: string) {
		super(`[${name}] ${message}`);
		this.name = name;
	}
}

class AppLoadError extends BaseError {
	constructor(message: string) {
		super('AppLoadError', message);
	}
}

export { AppLoadError };
