import { profiles, Widgets, type Widget } from './Profiles.svelte';

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
		const newSize = {
			...this.focus.widget.size,
			x: loc.x - offset,
			y: loc.y
		};
		if (this.#checkPos(this.focus.id, newSize)) return;

		profiles.setWidget(this.focus.id, (v) => ({
			...v,
			size: newSize
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
		if (
			this.#checkPos(this.focus.id, {
				...size,
				...newSize
			})
		)
			return;

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
					height: 1
				}
			}
		};
	}
	placeWidget(x: number, y: number) {
		this.focus;
		if (!this.dragging || this.dragMode !== 'place' || !this.focus) return;
		this.focus.widget.size = { ...this.focus.widget.size, x, y };
		profiles.profile.widgets[this.focus.id] = this.focus.widget;
		profiles.profile = {
			...profiles.profile
		};
		profiles.profile;
	}
	#getWidgetAreas(newWidgets?: typeof profiles.profile.widgets): `${number}.${number}`[][] {
		let widgetsIds = Object.keys(newWidgets ?? profiles.profile.widgets);
		let widgets = Object.values(newWidgets ?? profiles.profile.widgets);
		let widgetAreas: `${number}.${number}`[][] = [];
		for (let [widgetI, _] of widgetsIds.entries()) {
			const widget: Widget = widgets[widgetI];
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
		return widgetAreas;
	}
	isBlockOccupied(x: number, y: number): boolean {
		const widgetAreas = this.#getWidgetAreas();
		return widgetAreas.some((widgetArea) => widgetArea.some((v) => v === `${x}.${y}`));
	}
	#checkPos(id: string, newSize: Widget['size']): boolean {
		const gridSize = profiles.profile.gridSize;
		gridSize.rows, newSize.y + newSize.height;
		if (
			newSize.y + newSize.height -1 >= gridSize.rows ||
			newSize.x + newSize.width -1 >= gridSize.cols
		)
			return true;
		let newWidgets: typeof profiles.profile.widgets = {
			...profiles.profile.widgets,
			[id]: {
				...profiles.getWidget(id),
				size: newSize
			}
		};
		let widgetAreas = this.#getWidgetAreas(newWidgets);
		return widgetAreas.some((subArray, index) =>
			widgetAreas
				.slice(index + 1)
				.some((otherArray) => subArray.some((item) => otherArray.includes(item)))
		);
	}
}

export const edit = new Store();
