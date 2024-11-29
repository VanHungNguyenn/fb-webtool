import { toaster } from '@/components/ui/toaster'

interface ToastOptions {
	description: string
	type?: 'info' | 'success' | 'error' | 'warning'
	duration?: number // Optional, thời gian tồn tại của toast
}

const useToast = () => {
	const showToast = ({
		description,
		type = 'info',
		duration = 3000,
	}: ToastOptions) => {
		toaster.create({
			description,
			type,
			duration,
		})
	}

	return { showToast }
}

export default useToast
