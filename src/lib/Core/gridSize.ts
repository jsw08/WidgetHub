export type GridSize = { rows: number; cols: number; boxSize: number };
export function calcGridSize(width: number, height: number, boxSize: number): GridSize {
	const rows = Math.floor(height / boxSize);
	const cols = Math.floor(width / boxSize);
	return {
		rows,
		cols,
		boxSize
	};
}
export const calcBoxSize = (width: number, height: number, rows: number, cols: number): number =>
	Math.min(Math.floor(height / rows), Math.floor(width / cols));
