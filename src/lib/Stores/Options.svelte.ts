import { defaultCSS } from "../Core/defaultCSS";

class Store {
    open = $state(false)
    editProfileModal: {
        open: boolean,
        profileName: string
    } = $state({
        open: false,
        profileName: "" 
    })
    #bodyCSS = $state("");

    constructor() {
        if (localStorage.bodyCSS) this.#bodyCSS = localStorage.bodyCSS;
        else localStorage.bodyCSS = this.#bodyCSS
    }
    get bodyCSS() {
        return this.#bodyCSS
    }
    set bodyCSS(v) {
        this.#bodyCSS = v;
        localStorage.bodyCSS = v;
    }
}
export const options = new Store();
