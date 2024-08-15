import { profiles, Widgets, type Widget } from './Profiles.svelte';

export type MouseCoords = {
	x: number;
	y: number;
};
type dragMode = 'move' | 'resize' | 'place';
type WidgetAreas = `${number}.${number}`[] 

const hasDuplicates = (arr: Array<any>) => arr.length !== new Set(arr).size;
class Store {
	edit: boolean = $state(false);
	#dragging: boolean = $state(false);
	#dragMode: dragMode | undefined = $state();
	focus: undefined | { id: string; widget: Widget } = $state();
	mouseCoords: MouseCoords = $state({ x: 0, y: 0 });
	mouseCoordsOffset: number = $state(0);
	#widgetAreas: WidgetAreas = []; // contains all of the blocks that widgets are covering

	constructor() {
		if (profiles.isSetup) this.#updateWidgetAreas()	
	}

	// only getters to make sure these variables are being set by either 'startDrag' or 'startPlace'
	get dragging() {
		return this.#dragging;
	}
	get dragMode() {
		return this.#dragMode;
	}
	startDrag(dragMode: 'place', widget: string): void;
	startDrag(dragMode: dragMode, widget: Widget, id: string, offset: number): void;
	startDrag(dragMode: dragMode, widget: Widget | string, id?: string, offset?: number): void {
		if (dragMode === 'place') {
			if (typeof widget !== 'string') return;
			this.focus = {
				id: crypto.randomUUID(),
				widget: {
					component: widget,
					size: {
						x: 0,
						y: 0,
						width: Widgets[widget].size.minWidth,
						height: Widgets[widget].size.minHeight
					}
				}
			};
			this.#updateWidgetAreas()
		} else {
			if (!id || offset === undefined || typeof widget === 'string')
				throw new Error('Missing parameters.');
			this.focus = { id, widget };
			this.mouseCoordsOffset = offset;
		}

		this.#dragging = true;
		this.#dragMode = dragMode;
	}
	stopDrag() {
		this.focus;
		this.#dragMode;
		this.#dragging = false;
	}

	deleteWidget(id: string) {
		delete profiles.profile.widgets[id]
		profiles.profile = {
			...profiles.profile
		}
		this.#updateWidgetAreas()
	}
	moveWidget(loc: MouseCoords) {
		if (!this.dragging || this.dragMode !== 'move' || !this.focus) return;

		const newSize = {
			...this.focus.widget.size,
			x: loc.x - this.mouseCoordsOffset,
			y: loc.y
		};
		if (!this.#checkPos(this.focus.id, newSize)) return;

		profiles.setWidget(this.focus.id, (v) => ({
			...v,
			size: newSize
		}));
	}
	resizeWidget(loc: MouseCoords) {
		if (!this.dragging || this.dragMode !== 'resize' || !this.focus) return;

		const size = this.focus.widget.size;
		const minSize = Widgets[this.focus.widget.component].size;
		let newSize: { width: number; height: number } = {
			height: loc.y - size.y + 1,
			width: loc.x - size.x + 1
		};
		newSize = {
			height: newSize.height >= minSize.minHeight ? newSize.height : minSize.minHeight,
			width: newSize.width >= minSize.minWidth ? newSize.width : minSize.minWidth,
		};

		if (
			!this.#checkPos(this.focus.id, {
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
	placeWidget(x: number, y: number) {
		if (!this.dragging || this.dragMode !== 'place' || !this.focus) return;

		this.focus.widget.size = { ...this.focus.widget.size, x, y };
		profiles.profile.widgets[this.focus.id] = this.focus.widget;

		profiles.profile = {
			// trigger setter
			...profiles.profile
		};

		this.#updateWidgetAreas(); // only update widgetAreas if item is going to be placed or moved (see checkPos)
		this.stopDrag()
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
				for (let [h, _] of new Array(size.height).entries()) occupiedAreas.push(`${w + size.x}.${h + size.y}`);
		}

		return occupiedAreas;
	}
	#checkPos(id: string, newSize: Widget['size']): boolean {
		const gridSize = profiles.profile.gridSize;
		if (newSize.y + newSize.height > gridSize.rows || newSize.x + newSize.width > gridSize.cols)
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
		if (!isMovable) this.#updateWidgetAreas(widgetAreas)
		// only update widgetAreas if item is going to be moved or if item is going to be placed (check placeItem)
		return isMovable;
	}
	#updateWidgetAreas(override?: WidgetAreas) {
		this.#widgetAreas = override ?? this.#getWidgetAreas();
	}
}

export const edit = new Store();
