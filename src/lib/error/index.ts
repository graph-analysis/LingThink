/**基础错误类型
 * name 错误名称
 * message 错误消息
 * @class BaseError
 * @extends {Error}
 */
class BaseError extends Error {
	constructor(name: string, message: string) {
		super(message)
		this.name = name
	}
}

/**应用加载错误
 * @class AppLoadError
 * @extends {BaseError}
 */
class AppLoadError extends BaseError {
	constructor(message: string) {
		super('AppLoadError', message)
	}
}

export { AppLoadError }
