export function DisplayByteSize({ value }) {
	const index = Math.floor(Math.log(value) / Math.log(1024));
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	return `${(value / Math.pow(1024, index)).toFixed(2) * 1} ${sizes[index]}`;
}
