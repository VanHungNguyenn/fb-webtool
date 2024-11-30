import { Tag } from '@/components/ui/tag'

export const renderTag = (
	value: string | null,
	colorMapping: Record<string, string>
): JSX.Element => {
	const normalizedValue = value?.toLowerCase() || 'unknown'
	const colorPalette = colorMapping[normalizedValue] || 'red' // Default to red for unknown values.

	return (
		<Tag colorPalette={colorPalette} textTransform='capitalize'>
			{normalizedValue}
		</Tag>
	)
}
