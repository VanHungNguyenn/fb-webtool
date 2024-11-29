export interface RegisterRequest {
	email: string
	password: string
}

export interface RegisterResponse {
	success: boolean
	data?: IUser
	error?: string
}

export interface LoginRequest {
	username: string
	password: string
}

export interface LoginResponse {
	success: boolean
	data?: {
		access_token: string
		token_type: string
	}
	error?: string
}

export interface ForgotPasswordResponse {
	success: boolean
	error?: string
}

export interface LogoutResponse {
	success: boolean
	error?: string
	data?: unknown
}

export interface UserSetting {
	telegram: {
		is_enabled: boolean
		token: string
		chat_id: string
		thread_id: string
	}
	sheet: {
		is_enabled: boolean
		sheet_id: string
	}
}

export interface IUser {
	id: string
	email: string
	is_active: boolean
	is_superuser: boolean
	is_verified: boolean
	setting: UserSetting
}

export interface GetInfoUserResponse {
	success: boolean
	data?: IUser
	error?: string
}
