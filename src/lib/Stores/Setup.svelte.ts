import {profiles, type Profile} from "./Profiles.svelte"
import type { Component } from 'svelte';

import Welcome from '../Setup/Welcome.svelte';
import {default as ProfileSetup }from '../Setup/Profile.svelte';
import Screen from '../Setup/Screen.svelte';

class Store {
	pages: Component<{}>[] = $state([
		Welcome,
		ProfileSetup,
		Screen
	]);
	index: number = $state(2);
	profile: Profile = $state({
		gridSize: {
			rows: 0,
			cols: 0,
			boxSize: 100
		},
		widgets: {}
	});
    profileName: string = $state("")

	finish() {
		profiles.activeProfile = this.profileName;
		profiles.profiles = { [this.profileName]: this.profile };
		profiles.isSetup = true;
	};
}
export const setup = new Store();