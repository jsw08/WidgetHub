export function stopPropagation<T extends (event: Event) => void>(
	fn: T
): (this: any, event: Event) => void {
	return function (this: any, event: Event): void {
		event.stopPropagation(); // Call stopPropagation on the event
		fn.call(this, event); // Call the original function with the correct context
	};
}
