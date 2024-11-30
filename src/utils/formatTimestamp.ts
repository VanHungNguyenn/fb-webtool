import { format } from 'date-fns'

/**
 * Format a timestamp into "HH:mm - dd/MM/yyyy"
 * @param {string | null} timestamp - The ISO date string to format
 * @returns {string} - Formatted string or "-" if timestamp is null
 */
export const formatTimestamp = (timestamp: string | null): string => {
	if (!timestamp) return '-'
	return format(new Date(timestamp), 'HH:mm - dd/MM/yyyy')
}
