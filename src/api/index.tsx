import { axiosPrivate, axiosPublic } from './axiosClient'
import { LoginRequest, LoginResponse } from './types'

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
	const url = '/auth/jwt/login'

	const response = await axiosPublic.post(url, data)

	return response.data
}

export const postLogout = async (): Promise<void> => {
	const url = '/auth/jwt/logout'

	const response = await axiosPrivate.post(url)

	return response.data
}
