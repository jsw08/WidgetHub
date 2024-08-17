import type { Component } from 'svelte';
import { emptyProfile, profiles, type Profile } from './Profiles.svelte';

import Welcome from '../Setup/Welcome.svelte';
import { default as ProfileSetup } from '../Setup/Profile.svelte';
import Screen from '../Setup/Screen.svelte';
import Finished from '../Setup/Finished.svelte';

class Store {
	// Seperate store for setup because i've split setup up in many seperate files
	index: number = $state(0);
	pages: Component<{}>[] = $state([Welcome, ProfileSetup, Screen, Finished]);
	profile: Profile = $state(emptyProfile);
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
