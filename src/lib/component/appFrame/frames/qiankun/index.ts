import type { AppMetadata } from '../utils/appMetadata';

const prefetchApp = async (appMetadata: AppMetadata) => {
	const { prefetchApps } = await import('qiankun');
	const entry = appMetadata.entryURL;
	const customFetch = appMetadata.getCustomFetch();
	if (process.env.NODE_ENV === 'development') console.log(`预取应用 ${appMetadata.appConfig.name}`);
	prefetchApps(
		[
			{
				name: appMetadata.appConfig.name,
				entry
			}
		],
		{
			fetch: customFetch
		}
	);
	return true;
};

export { prefetchApp };
