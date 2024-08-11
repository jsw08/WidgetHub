import type { Component } from 'svelte';
import Test from '../Widgets/Test.svelte';

type Profile = {
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

	constructor() {
		if (!localStorage.profiles) localStorage.profiles = JSON.stringify(this.profiles);
		else this.profiles = JSON.parse(localStorage.profiles);

		if (!localStorage.activeProfile) localStorage.activeProfile = JSON.stringify(this.activeProfile);
		else this.activeProfile = JSON.parse(localStorage.activeProfile);
	}

	get isSetup() {
		return Object.is(this.profiles, {});
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
		const profile: Profile = this.profiles[this.activeProfile];
		if (!profile) throw new Error('Profile not found.');
		return this.profiles[this.activeProfile];
	}
	getWidget(id: string): Widget {
		const widget = this.profile.widgets[id];
		if (!widget) throw new Error('Widget not found.');
		return this.profile.widgets[id];
	}
	setWidget(id: string, value: (v: Widget) => Widget) {
		const widget = this.getWidget(id);
		this.profile.widgets[id] = value(widget);
	}
}

export const profiles = new Store();
