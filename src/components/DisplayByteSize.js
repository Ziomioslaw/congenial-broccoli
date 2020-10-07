const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function DisplayByteSize({ value }) {
  if (value === 0) {
    return '0';
  }

	const index = Math.floor(Math.log(value) / Math.log(1024));

	return `${(value / Math.pow(1024, index)).toFixed(2) * 1} ${sizes[index]}`;
}
