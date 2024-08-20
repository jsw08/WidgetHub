import { defaultCSS } from '../Core/defaultCSS';

class Store {
	open = $state(false);
	editProfileModal: {
		open: boolean;
		profileName: string;
	} = $state({
		open: false,
		profileName: ''
	});
	#bodyCSS = $state('');
	#theme: string | 'auto' = $state('auto');

	constructor() {
		if (localStorage.bodyCSS) this.#bodyCSS = localStorage.bodyCSS;
		else localStorage.bodyCSS = this.#bodyCSS;

		if (localStorage.theme) this.theme = localStorage.theme;
		else localStorage.theme = this.theme;

        this.setTheme()
        this.setBodyCSS()
	}
	get bodyCSS() {
		return this.#bodyCSS;
	}
	set bodyCSS(v) {
		this.#bodyCSS = v;
		localStorage.bodyCSS = v;
        this.setBodyCSS()
	}
	get theme() {
		return this.#theme;
	}
	set theme(v) {
		this.#theme = v;
		localStorage.theme = v;
        this.setTheme()
	}

    setBodyCSS() {
        document.body.style.cssText = this.bodyCSS || defaultCSS
    }
	setTheme() {
		const html = document.body.parentElement;
		if (!html) return;

		html.dataset.theme = this.theme === 'auto' ? '' : this.theme;
	}
}
export const options = new Store();
