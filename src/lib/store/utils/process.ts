class batchExecutor {
	cront: NodeJS.Timeout
	interval: number
	todo: number
	private task: () => Promise<void>
	constructor(fun: Function, interval: number) {
		this.interval = interval
		this.todo = 0

		this.task = async () => {
			await fun()
			clearInterval(this.cront)
		}

		console.log(this)
	}

	exec() {
		return this
	}
}

export { batchExecutor }
