import type { Component } from 'svelte';
import Test from '../Widgets/Test.svelte';

export type Profile = {
	gridSize: {
		rows: number;
		cols: number;
		boxSize: number;
	};
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
};
export type WidgetProps = { id: string; widget: Widget };
export const Widgets: { [x: string]: Component<WidgetProps> } = {
	Test: Test
};

class Store {
	#profiles: { [x: string]: Profile } = $state({});
	#activeProfile: string = $state('');
	#isSetup = $state(false);
	#profile = $derived(this.#profiles[this.#activeProfile]);

	constructor() {
		if (!localStorage.profiles) localStorage.profiles = JSON.stringify(this.profiles);
		else this.profiles = JSON.parse(localStorage.profiles);

		if (!localStorage.activeProfile)
			localStorage.activeProfile = JSON.stringify(this.activeProfile);
		else this.activeProfile = JSON.parse(localStorage.activeProfile);

		if (!localStorage.isSetup)
			localStorage.isSetup = JSON.stringify(this.isSetup);
		else this.isSetup = JSON.parse(localStorage.isSetup);
	}

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
		this.#profiles = v;
		localStorage.profiles = JSON.stringify(v);
	}
	get activeProfile() {
		return this.#activeProfile;
	}
	set activeProfile(v) {
		this.#activeProfile = v;
		localStorage.activeProfile = JSON.stringify(v);
	}
	get profile() {
		if (!this.#profile) throw new Error(`Profile '${this.#activeProfile}' not found;\n${JSON.stringify(this.#profiles)}`)
		return this.#profile
	}
	set profile(v) {
		if (!this.#profile) throw new Error(`Profile '${this.#activeProfile}' not found;\n${JSON.stringify(this.#profiles)}`)
		this.#profiles[this.#activeProfile] = v;
	}
	getWidget(id: string): Widget {
		const widget = this.profile.widgets[id];
		if (!widget) throw new Error('Widget not found.');
		return this.profile.widgets[id];
	}
	setWidget(id: string, value: (v: Widget) => Widget) {
		const widget = this.getWidget(id);
		this.profile.widgets[id] = value(widget); // #FIXME: widget not being saved into localstorage.
	}
}

export const profiles = new Store();
