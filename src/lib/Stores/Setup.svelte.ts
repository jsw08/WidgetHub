import { profiles, type Profile } from './Profiles.svelte';
import type { Component } from 'svelte';

import Welcome from '../Setup/Welcome.svelte';
import { default as ProfileSetup } from '../Setup/Profile.svelte';
import Screen from '../Setup/Screen.svelte';
import Finished from '../Setup/Finished.svelte';

class Store {
	// Seperate store for setup because i've split setup up in many seperate files
	pages: Component<{}>[] = $state([Welcome, ProfileSetup, Screen, Finished]);
	index: number = $state(0);
	profile: Profile = $state({
		gridSize: {
			rows: 0,
			cols: 0,
			boxSize: 100
		},
		widgets: {}
	});
	profileName: string = $state('');
	#activeComp: Component = $derived(this.pages[this.index]);

	get activeComp() {
		return this.#activeComp;
	}

	finish() {
		profiles.activeProfile = this.profileName;
		profiles.profiles = { [this.profileName]: this.profile };
		profiles.isSetup = true;
	}
}
export const setup = new Store();
