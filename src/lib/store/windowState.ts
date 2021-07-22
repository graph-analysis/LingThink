import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

enum Mode {
	MICRO_APP,
	HOME
}

type WindowConfig = {
	collapsed: boolean;
	mode: Mode;
};

const defaultwindowConfig: WindowConfig = {
	collapsed: false,
	mode: Mode.HOME
};

const windowConfig = <Writable<WindowConfig>>writable(defaultwindowConfig);

export { windowConfig, Mode };

export type { WindowConfig };