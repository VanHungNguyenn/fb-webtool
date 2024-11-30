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
	is_enabled_notification: boolean
	is_enabled_keywords: boolean
	keywords: string[] | null
	telegram: TelegramSetting
	sheet: SheetSetting
}

export interface TelegramSetting {
	is_enabled: boolean
	token: string | null
	chat_id: string | null
	thread_id: string | null
}

export interface SheetSetting {
	is_enabled: boolean
	sheet_id: string | null
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

export interface PatchInfoUserRequest {
	password?: string
	is_active?: boolean
	is_superuser?: boolean
	is_verified?: boolean
	setting: Partial<UserSetting>
}

export interface PatchInfoUserResponse {
	success: boolean
	data?: IUser
}

export interface UserData {
	id: string
	email: string
	is_active: boolean
	is_superuser: boolean
	is_verified: boolean
	setting: UserSetting
}

export interface GetListUsersResponse {
	success: boolean
	total: number
	data: UserData[]
}

export interface GroupData {
	created_at: string
	updated_at: string | null
	_id: string
	url: string
	group_id: string | null
	name: string | null
	privacy: string | null
	last_run: string | null
	users: {
		id: string
		collection: string
	}[]
}

export interface GetListGroupsResponse {
	success: boolean
	data: GroupData[]
	total: number
}

export interface CreateListGroupsRequest {
	urls: string[]
}

export interface CreateListGroupsResponse {
	success: boolean
	data: {
		created: number
		updated: number
		total: number
	}
}

export interface AccountData {
	created_at: string
	updated_at: string | null
	uid: string
	password: string
	tfa: string
	email: string
	cookie: string | null
	token: string | null
	proxy: string | null
	user_agent: string
	_id: string
	state: string
	last_run: string | null
	created_token_time: string | null
	query_count: number
}

export interface GetListAccountResponse {
	success: boolean
	total: number
	data: AccountData[]
}

export interface AccountDataRequest {
	uid: string
	password: string
	tfa: string
	cookie?: string
	token?: string
	proxy?: string
	email?: string
	user_agent?: string
}

export interface CreateListAccountsRequest {
	data: AccountDataRequest[]
}

export interface CreateListAccountsResponse {
	success: boolean
	data: {
		created: number
		total: number
	}
}

export interface PostData {
	_id: string
	post_id: string
	message: string
	group: {
		id: string
		collection: string
	}
	created_time: string // ISO format date string
	updated_time: string // ISO format date string
	from_user: {
		id: string
		name: string
	}
}

export interface GetListPostsResponse {
	success: boolean
	total: number
	data: PostData[]
}
