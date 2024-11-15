export type Widget = {
	component: string;
	size: {
		width: number;
		height: number;
		x: number;
		y: number;
	};
	options?: any;
};
export type WidgetProps = { id: string; widget: Widget };