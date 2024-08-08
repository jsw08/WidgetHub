export type GridSize = { rows: number; cols: number; };
export function calcGridSize(width: number, height: number, itemSize: number): GridSize {
	const rows = Math.floor(height / itemSize);
	const cols = Math.floor(width / itemSize);
	return {
		rows,
		cols,
	};
}