import { profiles, type Widget } from './Profiles.svelte';

export type MouseCoords = {
	x: number;
	y: number;
};
type dragMode = 'move' | 'resize';

class Store {
	edit: boolean = $state(true);
	#dragging: boolean = $state(false);
	#dragMode: 'move' | 'resize' | undefined = $state();
	focus: { id: string | undefined; widget: Widget | undefined } = $state({
		id: undefined,
		widget: undefined
	});
	mouseCoords: MouseCoords = $state({ x: 0, y: 0 });
	mouseCoordsOffset: number = $state(0);

	get dragging() {
		return this.#dragging;
	}
	get dragMode() {
		return this.#dragMode;
	}
	startDrag(dragMode: dragMode, widget: Widget, id: string, offset: number) {
		if (!edit) return;
		if (!widget) throw new Error('Widget not found.');
		this.focus = { id, widget };
		this.#dragging = true;
		this.mouseCoordsOffset = offset;
		this.#dragMode = dragMode;
	}
	stopDrag() {
		this.focus = { id: undefined, widget: undefined };
		this.#dragging = false;
	}
	moveWidget(loc: MouseCoords) {
		if (!this.dragging || !this.focus.widget) return;
		const offset = this.mouseCoordsOffset;
		const widget = this.focus.widget;

		this.focus.widget.size = {
			...widget.size,
			x: loc.x - offset,
			y: loc.y
		};
	}
}

export const edit = new Store();
