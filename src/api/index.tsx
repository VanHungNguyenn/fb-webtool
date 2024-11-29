import axios, { AxiosResponse } from 'axios'
import { axiosPrivate, axiosPublic } from './axiosClient'
import {
	ForgotPasswordResponse,
	GetInfoUserResponse,
	LoginRequest,
	RegisterRequest,
} from './types'

export const postLogin = async (data: LoginRequest): Promise<AxiosResponse> => {
	const url = '/auth/jwt/login'

	const params = new URLSearchParams()
	Object.entries(data).forEach(([key, value]) => {
		params.append(key, String(value))
	})

	const response = await axios.post(url, params, {
		baseURL: import.meta.env.VITE_APP_API_BASE_URL,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Access-Control-Allow-Origin': '*',
		},
	})

	return response
}

export const postRegister = async (
	data: RegisterRequest
): Promise<AxiosResponse> => {
	const url = '/auth/register'

	const response = await axiosPublic.post(url, data)

	return response
}

export const postForgotPassword = async (
	email: string
): Promise<ForgotPasswordResponse> => {
	const url = '/auth/forgot-password'

	const response = await axiosPublic.post(url, { email })

	return response.data
}

export const postLogout = async (): Promise<AxiosResponse> => {
	const url = '/auth/jwt/logout'

	const response = await axiosPrivate.post(url)

	return response
}

// users
export const getInfoUser = async (): Promise<GetInfoUserResponse> => {
	const url = '/api/users/me'

	const response = await axiosPrivate.get(url)

	return response.data
}
