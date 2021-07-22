import type { AppConfig } from '$lib/store/appState';

interface Source {
	domain: string;
	baseURL: string;
	entry: string;
}

// 输入pakage.json或plugin.json
class AppMetadata {
	private source: Source;
	private baseURL: string;
	entryURL: string;
	appConfig: AppConfig;
	async init(appConfig: AppConfig) {
		this.appConfig = appConfig;

		if (appConfig.configURL.endsWith('package.json')) {
			// pkgjson模式初始化
			await this.getPkgMetadata(appConfig.configURL);
		} else {
			throw new Error('目前支持 package.json 模式');
		}

		return this;
	}

	// package.json初始化模式
	private async getPkgMetadata(url: string) {
		const pkgResp = await fetch(url);
		const pkg = await pkgResp.json();
		this.source = pkg?.plugin?.source;

		if (this.source === undefined) {
			throw Error('package.json 非法');
		}

		this.baseURL = this.rep(this.source.baseURL, pkg);
		this.entryURL = this.getEntryURL();
	}

	// 获取微应用入口点
	private getEntryURL() {
		return `//${this.source.domain}/${this.baseURL}/${this.source.entry}`;
	}

	// 基于json将${value}进行模版替换
	private rep(str: string, pkg: object) {
		const re = /\${(.*?)}/g;
		const matchList = str.match(re);
		const ob: object = {};
		matchList.forEach((key: string) => {
			ob[key] = String(pkg[key.slice(2, -1)]) || '';
		});

		for (const v in ob) {
			str = str.replace(v, ob[v]);
		}

		return str;
	}

	// 微应用在非根路由的情况下需要自定义fetch请求静态文件
	getCustomFetch() {
		// 替换域名为域名+前辍
		const fetchAdapter = (url: RequestInfo) => {
			if (url.toString().includes(`${this.source.domain}/${this.baseURL}`)) {
				return url;
			}

			return url.toString().replace(this.source.domain, `${this.source.domain}/${this.baseURL}`);
		};

		// 构造自定义fetch
		const customFetch = (input: RequestInfo, init?: RequestInit) => {
			if (input.toString().includes(this.source.domain)) {
				return fetch(fetchAdapter(input), init);
			}
			return fetch(input, init);
		};
		return customFetch;
	}
}

// 从URL配置中获取应用元信息
const appMetadataGetter = (appConfig: AppConfig) => new AppMetadata().init(appConfig);

export { appMetadataGetter, AppMetadata };
