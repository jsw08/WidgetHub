import type { Component } from 'svelte';
import type { GridSize } from '../Core/gridSize';
import Test from '../Widgets/Test.svelte';

export type Profile = {
	gridSize: GridSize;
	widgets: {
		[x: string]: Widget;
	};
};
export type Widget = {
	component: string;
	size: {
		width: number;
		height: number;
		x: number;
		y: number;
	};
	options?: any;
};
export type WidgetProps = { id: string; widget: Widget };
export const Widgets: {
	[x: string]: { component: Component<WidgetProps>; size: { minWidth: number; minHeight: number } };
} = {
	Test: {
		component: Test,
		size: {
			minWidth: 2,
			minHeight: 2
		}
	}
};

class Store {
	// Init vars
	#profiles: { [x: string]: Profile } = $state({});
	#activeProfile: string = $state('');
	#isSetup = $state(false);
	#profile = $derived(this.#profiles[this.#activeProfile]);

	constructor() {
		// read from or set them in localstorage
		if (!localStorage.profiles) localStorage.profiles = JSON.stringify(this.profiles);
		else this.profiles = JSON.parse(localStorage.profiles);

		if (!localStorage.activeProfile)
			localStorage.activeProfile = JSON.stringify(this.activeProfile);
		else this.activeProfile = JSON.parse(localStorage.activeProfile);

		if (!localStorage.isSetup) localStorage.isSetup = JSON.stringify(this.isSetup);
		else this.isSetup = JSON.parse(localStorage.isSetup);
	}

	// extra setters (and thus getters) to update the value in localstorage
	get isSetup() {
		return this.#isSetup;
	}
	set isSetup(v) {
		this.#isSetup = v;
		localStorage.isSetup = JSON.stringify(v);
	}
	get profiles() {
		return this.#profiles;
	}
	set profiles(v) {
		localStorage.profiles = JSON.stringify(v);
		this.#profiles = v;
	}
	get activeProfile() {
		return this.#activeProfile;
	}
	set activeProfile(v) {
		localStorage.activeProfile = JSON.stringify(v);
		this.#activeProfile = v;
	}
	get profile() {
		if (!this.#profile)
			throw new Error(
				`Profile '${this.#activeProfile}' not found;\n${JSON.stringify(this.#profiles)}`
			);
		return this.#profile;
	}
	set profile(v) {
		if (!this.#profile)
			throw new Error(
				`Profile '${this.#activeProfile}' not found;\n${JSON.stringify(this.#profiles)}`
			);
		this.profiles[this.activeProfile] = v;
		this.profiles = {
			// Trigger reactivity
			...this.profiles
		};
	}
	getWidget(id: string): Widget {
		const widget = this.profile.widgets[id];
		if (!widget) throw new Error('Widget not found.');
		return this.profile.widgets[id];
	}
	setWidget(id: string, value: (v: Widget) => Widget) {
		const widget = this.getWidget(id);
		this.profile.widgets[id] = value(widget);
		this.profile = {
			// Trigger reactivity
			...this.profile
		};
	}
}

export const profiles = new Store();
