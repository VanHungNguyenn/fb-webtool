import AuthStorage from '@/utils/AuthStorage'
import axios from 'axios'

const axiosPublic = axios.create({
	baseURL: import.meta.env.VITE_APP_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

const axiosPrivate = axios.create({
	baseURL: import.meta.env.VITE_APP_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

axiosPrivate.interceptors.request.use(
	(config) => {
		const token = AuthStorage.getToken()

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosPrivate.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		// Check if error is an authorization issue or a specific error
		if (error.response && error.response.status === 401) {
			// Unauthorized, redirect to home page ("/")
			window.location.href = '/' // Redirect to home page
		}

		// Optional: handle other errors
		if (error.response && error.response.status >= 500) {
			// Handle server errors, you can log them or show a notification here
			console.error('Server Error:', error.response.data)
		}

		return Promise.reject(error)
	}
)

axiosPublic.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		// Handle errors for public requests
		if (error.response && error.response.status >= 400) {
			// Optional: Show a user-friendly error message or redirect
			console.error('Public request error:', error.response.data)
		}
		return Promise.reject(error)
	}
)

export { axiosPrivate, axiosPublic }
