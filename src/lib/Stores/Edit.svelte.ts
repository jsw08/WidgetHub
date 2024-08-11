import { profiles, type Widget } from './Profiles.svelte';

export type MouseCoords = {
	x: number;
	y: number;
};
type dragMode = 'move' | 'resize';

class Store {
	edit: boolean = $state(false);
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
		if (!this.dragging || this.dragMode !== 'move' || !this.focus.widget) return;
		const offset = this.mouseCoordsOffset;
		const widget = this.focus.widget;

		this.focus.widget.size = {
			...widget.size,
			x: loc.x - offset,
			y: loc.y
		};
	}
	resizeWidget(loc: MouseCoords) {
		if (!this.dragging || this.dragMode !== 'resize' || !this.focus.widget) return;
		const size = this.focus.widget.size;
		let newSize: { width: number; height: number } = {
			height: loc.y - size.y + 1,
			width: loc.x - size.x + 1
		};
		newSize = {
			height: newSize.height > 0 ? newSize.height : 1,
			width: newSize.width > 0 ? newSize.width : 1
		};

		this.focus.widget.size = {
			...size,
			...newSize
		};
		console.log(loc, this.focus.widget.size);
	}
}

export const edit = new Store();
