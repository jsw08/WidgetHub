import type { Component } from "svelte"

type Profile = {
    gridSize: {
        rows: number
        cols: number
        boxSize: number
    }
    widgets: {
        [x: string]: Widget
    }
}
export type Widget = {
    component: string
    size: {
        width: number
        height: number
        x: number
        y: number
    }
}

export const Widgets: {[x: string]: Component<{id: string, widget: Widget}>} = {

}

class Store {
    profiles: {[x: string]: Profile} = $state({
    
    })
    activeProfile: string = $state("");

    get profile() {
        return this.profiles[this.activeProfile]
    }
    getWidget(id: string): Widget | undefined {
        return this.profile.widgets[id]
    }
    setWidget(id: string, value: (v: Widget) => Widget) {
        const widget = this.getWidget(id) 
        if (!widget) throw new Error("Widget not found.");
        
        this.profile.widgets[id] = value(widget);
    }
}

export const Profiles = new Store();