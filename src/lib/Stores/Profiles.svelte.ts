import type { Component } from 'svelte';
import Test from '../Widgets/Test.svelte';

type Profile = {
	gridSize: {
		rows: number;
		cols: number;
		boxSize: number;
	};
	widgets: {
		[x: string]: Widget;
	};
};
export type Widget = {
	component: string;
	size: {
		width: number;
		height: number;
		x: number;
		y: number;
	};
};
export type WidgetProps = { id: string; widget: Widget };
export const Widgets: { [x: string]: Component<WidgetProps> } = {
	Test: Test
};

class Store {
	profiles: { [x: string]: Profile } = $state({
		default: {
			gridSize: {
				rows: 12,
				cols: 15,
				boxSize: 50
			},
			widgets: {
				'b33f3923-6b04-4179-b205-5c23dbdd0e43': {
					component: 'Test',
					size: {
						width: 5,
						height: 5,
						x: 1,
						y: 1
					}
				}
			}
		}
	});
	activeProfile: string = $state('default');

	get profile() {
		const profile: Profile = this.profiles[this.activeProfile];
		if (!profile) throw new Error('Profile not found.');
		return this.profiles[this.activeProfile];
	}
	getWidget(id: string): Widget | undefined {
		return this.profile.widgets[id];
	}
	setWidget(id: string, value: (v: Widget) => Widget) {
		const widget = this.getWidget(id);
		if (!widget) throw new Error('Widget not found.');

		this.profile.widgets[id] = value(widget);
	}
}

export const profiles = new Store();
