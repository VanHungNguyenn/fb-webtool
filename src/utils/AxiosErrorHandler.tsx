import { toaster } from '@/components/ui/toaster'
import axios from 'axios'
// Điều chỉnh đường dẫn nếu cần

// Hàm xử lý lỗi từ Axios và hiển thị Toast
export const handleAxiosError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		// Kiểm tra nếu có lỗi phản hồi từ server (4xx, 5xx)
		if (error.response) {
			toaster.create({
				description:
					error.response.data?.message ||
					error.response.data?.detail ||
					'Server error',
				type: 'error',
			})
		} else {
			// Trường hợp không nhận được phản hồi (ví dụ: lỗi mạng)
			toaster.create({
				description: error.message || 'Unknown error',
				type: 'error',
			})
		}
	} else {
		// Lỗi không phải từ Axios (ví dụ: lỗi trong JavaScript)
		toaster.create({
			description: 'An unexpected error occurred',
			type: 'error',
		})
	}
}
