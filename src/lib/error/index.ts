class BaseError extends Error {
	constructor(message: string) {
		super(message);
	}
}

class AppLoadError extends BaseError {
	constructor(message: string) {
		super(message);
		this.name = 'AppLoadError';
	}
}

export { AppLoadError };
