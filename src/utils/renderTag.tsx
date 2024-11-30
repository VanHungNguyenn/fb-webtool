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

export const renderTagBoolean = (
	value: boolean,
	labels?: { trueLabel: string; falseLabel: string }
): JSX.Element => {
	const colorPalette = value ? 'green' : 'red'
	const text = value
		? labels?.trueLabel || 'True'
		: labels?.falseLabel || 'False'

	return (
		<Tag colorPalette={colorPalette} textTransform='capitalize'>
			{text}
		</Tag>
	)
}
