import { profiles, type Widget } from './Profiles.svelte';

export type MouseCoords = {
	x: number;
	y: number;
};
type dragMode = 'move' | 'resize' | 'place';

class Store {
	edit: boolean = $state(false);
	#dragging: boolean = $state(false);
	#dragMode: dragMode | undefined = $state();
	focus: undefined | { id: string; widget: Widget } = $state();
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
		this.focus = undefined;
		this.#dragging = false;
	}
	moveWidget(loc: MouseCoords) {
		if (!this.dragging || this.dragMode !== 'move' || !this.focus) return;
		const offset = this.mouseCoordsOffset;
		const widget = this.focus.widget;

		profiles.setWidget(this.focus.id, (v) => ({
			...v,
			size: {
				...v.size,
				x: loc.x - offset,
				y: loc.y
			}
		}));
	}
	resizeWidget(loc: MouseCoords) {
		if (!this.dragging || this.dragMode !== 'resize' || !this.focus) return;
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
	}
	startPlace(widget: string) {
		this.#dragging = true;
		this.#dragMode = 'place';
		this.focus = {
			id: crypto.randomUUID(),
			widget: {
				component: widget,
				size: {
					x: 0,
					y: 0,
					width: 1,
					height: 1,
				}	
			}
		}
	}
	placeWidget(x: number, y: number) {
		console.log(this.focus)
		if (!this.dragging || this.dragMode !== "place" || !this.focus) return
		this.focus.widget.size = {...this.focus.widget.size, x, y}
		profiles.profile.widgets[this.focus.id] = this.focus.widget;
		profiles.profile = {
			...profiles.profile
		}
		console.log(profiles.profile)
	}
	isBlockOccupied(x: number, y: number): boolean {
		let widgets = Object.keys(profiles.profile.widgets);
		let widgetAreas: `${number}.${number}`[][] = [];
		for (let widgetId of widgets) {
			const widget: Widget = profiles.getWidget(widgetId);
			const size = widget.size;
			let areas: `${number}.${number}`[] = [];
			const xArea = size.x + size.width;
			const yArea = size.y + size.height;
			for (let x = size.x; xArea > x; x++) {
				for (let y = size.y; yArea > y; y++) {
					areas.push(`${x}.${y}`);
				}
			}
			widgetAreas.push(areas);
		}
		return widgetAreas.some(widgetArea => widgetArea.some(v => v === `${x}.${y}`))
	}
}

export const edit = new Store();
