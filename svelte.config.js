import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-node'
import polyfill from 'rollup-plugin-node-polyfills'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [
				polyfill()
			]
		},
		adapter: adapter({
			out: 'build',
			precompress: true,
			env: {
				host: '0.0.0.0',
				port: '3000'
			}
		})
	}
}

export default config
