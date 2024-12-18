import { profiles, Widgets } from './Profiles.svelte';
import { type Widget } from './WidgetProps';

export type MouseCoords = {
	x: number;
	y: number;
};
type dragMode = 'move' | 'resize' | 'place';
type WidgetAreas = `${number}.${number}`[];

const hasDuplicates = (arr: Array<any>) => arr.length !== new Set(arr).size;
class Store {
	#dragMode: dragMode | undefined = $state();
	#dragging: boolean = $state(false);
	#widgetAreas: WidgetAreas = []; // contains all of the blocks that widgets are covering
	edit: boolean = $state(false);
	focus: undefined | { id: string; widget: Widget } = $state();
	mouseCoords: MouseCoords = $state({ x: 0, y: 0 });
	mouseCoordsOffset: number = $state(0);

	// only getters to make sure these variables are being set by either 'startDrag' or 'startPlace'
	get dragging() {
		return this.#dragging;
	}
	get dragMode() {
		return this.#dragMode;
	}
	startDrag(dragMode: 'place', widget: string): void;
	startDrag(dragMode: dragMode, widget: Widget, id: string): void;
	startDrag(dragMode: dragMode, widget: Widget | string, id?: string): void {
		if (dragMode === 'place') {
			if (typeof widget !== 'string') return;
			const boxSize = profiles.profile.gridSize.boxSize;
			this.focus = {
				id: crypto.randomUUID(),
				widget: {
					component: widget,
					size: {
						x: 0,
						y: 0,
						width: Math.ceil((Widgets[widget].size.minWidth * 40) / boxSize),
						height: Math.ceil((Widgets[widget].size.minHeight * 40) / boxSize)
					}
				}
			};
			this.#updateWidgetAreas();
		} else {
			if (!id || typeof widget === 'string')
				throw new Error('Missing parameters.');
			this.focus = { id, widget };
			this.mouseCoordsOffset = 0
		}

		this.#dragging = true;
		this.#dragMode = dragMode;
	}
	stopDrag() {
		this.focus = undefined;
		this.#dragMode = undefined;
		this.#dragging = false;
	}

	deleteWidget(id: string) {
		delete profiles.profile.widgets[id];
		profiles.profile = {
			...profiles.profile
		};
	}
	moveWidget(loc: MouseCoords) {
		if (!this.dragging || this.dragMode !== 'move' || !this.focus) return;
		const size = this.focus.widget.size;

		const newSize = {
			...size,
			x: loc.x - Math.round(size.width / 2) - 1,
			y: loc.y - Math.round(size.width / 2) - 1
		};
		if (!this.#checkPos(this.focus.id, newSize)) return;

		profiles.setWidget(this.focus.id, (v) => ({
			...v,
			size: newSize
		}));
	}
	resizeWidget(loc: MouseCoords) {
		if (!this.dragging || this.dragMode !== 'resize' || !this.focus) return;
		const size: Widget['size'] = this.focus.widget.size;
		if (loc.x < size.x || loc.y < size.y) return;

		const minSize = Widgets[this.focus.widget.component].size;
		const boxSize = profiles.profile.gridSize.boxSize;
		let calcSize: { width: number; height: number } = {
			height: loc.y - size.y + 1,
			width: loc.x - size.x + 1
		};
		if (calcSize.width * boxSize < minSize.minWidth * minBoxSize)
			calcSize.width = minSize.minWidth * minBoxSize;
		if (calcSize.height * boxSize < minSize.minHeight * minBoxSize)
			calcSize.height = minSize.minHeight * minBoxSize;

		const newSize: Widget['size'] = {
			...size,
			...calcSize
		};
		if (!this.#checkPos(this.focus.id, newSize)) return;

		this.focus.widget.size = newSize;
		profiles.setWidget(this.focus.id, (v) => ({
			...v,
			size: newSize
		}));
	}
	placeWidget(x: number, y: number) {
		if (!this.dragging || this.dragMode !== 'place' || !this.focus) return;

		this.focus.widget.size = { ...this.focus.widget.size, x, y };
		profiles.profile.widgets[this.focus.id] = this.focus.widget;

		profiles.profile = {
			// trigger setter
			...profiles.profile
		};

		this.stopDrag();
	}
	// Functions to calculate where widgets are and if they are overlapping
	isPlaceable(x: number, y: number): boolean {
		if (!this.dragging || this.dragMode !== 'place' || !this.focus) throw new Error(`Not placing.`);
		const gridSize = profiles.profile.gridSize;
		const size = this.focus.widget.size;

		if (y + size.height > gridSize.rows || x + size.width > gridSize.cols) return false;

		let totalArea: WidgetAreas = [];
		for (let [w, _] of new Array(size.width).entries())
			for (let [h, _] of new Array(size.height).entries()) totalArea.push(`${x + w}.${y + h}`);

		return !hasDuplicates(totalArea.concat(this.#widgetAreas));
	}
	#getWidgetAreas(newWidgets?: typeof profiles.profile.widgets): WidgetAreas {
		const widgets = Object.values(newWidgets ?? profiles.profile.widgets);
		const occupiedAreas: WidgetAreas = [];

		for (const widget of widgets) {
			const size = widget.size;
			for (let [w, _] of new Array(size.width).entries())
				for (let [h, _] of new Array(size.height).entries())
					occupiedAreas.push(`${w + size.x}.${h + size.y}`);
		}

		return occupiedAreas;
	}
	#checkPos(id: string, newSize: Widget['size']): boolean {
		const gridSize = profiles.profile.gridSize;
		if (
			newSize.y + newSize.height > gridSize.rows ||
			newSize.x + newSize.width > gridSize.cols ||
			newSize.x < 0 ||
			newSize.y < 0
		)
			return false;

		let newWidgets: typeof profiles.profile.widgets = {
			...profiles.profile.widgets,
			[id]: {
				...profiles.getWidget(id),
				size: newSize
			}
		};

		let widgetAreas = this.#getWidgetAreas(newWidgets);
		const isMovable = !hasDuplicates(widgetAreas);
		if (!isMovable) this.#updateWidgetAreas(widgetAreas);
		// only update widgetAreas if it's calculated anyway or when it's needed.
		return isMovable;
	}
	#updateWidgetAreas(override?: WidgetAreas) {
		this.#widgetAreas = override ?? this.#getWidgetAreas();
	}
}

export const edit = new Store();
export const minBoxSize: number = 40;
