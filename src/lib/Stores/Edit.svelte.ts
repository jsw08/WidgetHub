import { Profiles } from "./Profiles.svelte";

type MouseCoords = {
    x: number;
    y: number;
}

class Store {
    edit: boolean = $state(true);
    #dragging: boolean = $state(false);
    focus: string = $state("");
    #mouseCoords: MouseCoords = $state({x: 0, y: 0});
    #mouseCoordsOffset: MouseCoords = $state({x: 0, y: 0});

    get dragging() {
        return this.#dragging
    }
    set dragging(v) {
        this.#dragging = edit && v

        const widget = Profiles.getWidget(this.focus)
        if (!widget) throw new Error("Widget not found! Always set the focussed widget before enableing drag mode or resize mode.")
        
        const wSize = widget.size;
        this.#mouseCoordsOffset.x = wSize.x + wSize.width - this.#mouseCoords.x 
        this.#mouseCoordsOffset.y = wSize.y + wSize.height - this.#mouseCoords.y 

    }
    get mouseCoords() {
        return this.#mouseCoords
    }
    set mouseCoords(v) {
        this.#mouseCoords = v; 
    }
    get mouseCoordsOffset() {
        return this.#mouseCoordsOffset
    }
}

export const edit = new Store()