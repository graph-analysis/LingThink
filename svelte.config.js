import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// 纯静态输出
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})
		// 输出 Node.js SSR
		// adapter: adapter({
		// 	out: 'build',
		// 	precompress: true,
		// 	env: {
		// 		host: '0.0.0.0',
		// 		port: '3000'
		// 	}
		// })
	}
}

export default config
