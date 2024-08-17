import type { Component } from 'svelte';
import { calcGridSize, type GridSize } from '../Core/gridSize';
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

export const emptyProfile: Profile = {
	gridSize: {
		rows: 0,
		cols: 0,
		boxSize: 0
	},
	widgets: {}
}

class Store {
	// Init vars
	#activeProfile: string = $state('');
	#isSetup = $state(false);
	#profiles: { [x: string]: Profile } = $state({});

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
		if (!this.profiles[this.#activeProfile])
			throw new Error(
				`Profile '${this.#activeProfile}' not found;\n${JSON.stringify(this.#profiles)}`
			);
		return this.profiles[this.#activeProfile];
	}
	set profile(v) {
		if (!this.profiles[this.#activeProfile])
			throw new Error(
				`Profile '${this.#activeProfile}' not found;\n${JSON.stringify(this.#profiles)}`
			);
		this.profiles = {
			// Trigger setter
			...this.profiles,
			[this.activeProfile]: v
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
			// Trigger setter
			...this.profile
		};
	}
    createProfile(name: string) {
        if (!name || Object.keys(this.profiles).includes(name)) throw Error("Invalid name.")
		const gridSize = calcGridSize(innerWidth, innerHeight, emptyProfile.gridSize.boxSize);
        this.profiles = {
            ...this.profiles,
            [name]: {
                ...emptyProfile,
                ...{
                    gridSize
                }
            }
        }
    }
	deleteProfile(name: string) {
		if (!this.profiles[name]) throw new Error("Profile not found.")	

		const {[name]: old, ...newProfiles} = this.profiles
		this.profiles = newProfiles
	}
}

export const profiles = new Store();
