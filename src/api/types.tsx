export interface LoginRequest {
	username: string
	password: string
}

export interface LoginResponse {
	access_token: string
	token_type: string
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
