export function truncateText(
	text: string | null,
	maxLength: number = 30
): string {
	if (text === null) return ''

	if (text.length <= maxLength) return text
	return text.slice(0, maxLength) + '...'
}
