import axios, { AxiosResponse } from 'axios'
import { axiosPrivate, axiosPublic } from './axiosClient'
import {
	CreateListAccountsRequest,
	CreateListAccountsResponse,
	CreateListGroupsRequest,
	CreateListGroupsResponse,
	ForgotPasswordResponse,
	GetInfoUserResponse,
	GetListAccountResponse,
	GetListGroupsResponse,
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

// groups
export const getListGroups = async (
	q: string,
	page: number = 1,
	limit: number = 10
): Promise<GetListGroupsResponse> => {
	const url = `/api/groups/?page=${page}&limit=${limit}&q=${q}`

	const response = await axiosPrivate.get(url)

	return response.data
}

export const createListGroups = async (
	data: CreateListGroupsRequest
): Promise<CreateListGroupsResponse> => {
	const url = '/api/groups/bulk'

	const response = await axiosPrivate.post(url, data)

	return response.data
}

// accounts
export const getListAccounts = async (
	q: string,
	page: number = 1,
	limit: number = 10
): Promise<GetListAccountResponse> => {
	const url = `/api/accounts/?page=${page}&limit=${limit}&q=${q}`

	const response = await axiosPrivate.get(url)

	return response.data
}

export const createListAccounts = async (
	data: CreateListAccountsRequest
): Promise<CreateListAccountsResponse> => {
	const url = '/api/accounts/bulk'

	const response = await axiosPrivate.post(url, data)

	return response.data
}
