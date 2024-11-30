import { IUser, LoginRequest } from '@/api/types'
import { RootState } from '@/lib/store'
import AuthStorage from '@/utils/AuthStorage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
	isLoading: boolean
	isLoggedIn: boolean
	token: string | ''
	user: IUser | null
}

const initialState: AuthState = {
	isLoading: true,
	isLoggedIn: false,
	token: '',
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		// @ts-expect-error: using in saga so it's not used in this file
		actionLogin(state, action: PayloadAction<LoginRequest>) {
			state.isLoading = true
		},
		actionLoginSuccess(
			state,
			action: PayloadAction<{
				token: string
				user: IUser
			}>
		) {
			state.isLoggedIn = true
			state.token = action.payload.token
			state.isLoading = false
			state.user = action.payload.user
			AuthStorage.setToken(action.payload.token)
		},
		actionGetUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload
			state.isLoading = false
		},
		actionLoginFailed(
			state,
			// @ts-expect-error: using in saga so it's not used in this file
			action: PayloadAction<AxiosError>
		) {
			state.isLoading = false
		},

		logout(state) {
			state.isLoggedIn = false
			state.token = ''
			state.user = null
			state.isLoading = false
			AuthStorage.removeToken()
		},
		setUser() {
			// do nothing
		},
		setUserSuccess(state, action: PayloadAction<IUser>) {
			state.user = action.payload
			state.isLoading = false
		},
		setUserFailed(state) {
			state.isLoading = false
		},
	},
})

export const authActions = authSlice.actions

export const selectUserIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectUserToken = (state: RootState) => state.auth.token
export const selectUser = (state: RootState) => state.auth.user
export const selectIsLoading = (state: RootState) => state.auth.isLoading
export const selectEmail = (state: RootState) => state.auth.user?.email
export const selectIsActive = (state: RootState) => state.auth.user?.is_active
export const selectIsSuperuser = (state: RootState) =>
	state.auth.user?.is_superuser
export const selectIsVerified = (state: RootState) =>
	state.auth.user?.is_verified
export const selectTelegram = (state: RootState) =>
	state.auth.user?.setting.telegram
export const selectSheet = (state: RootState) => state.auth.user?.setting.sheet
export const selectIsEnabledNotification = (state: RootState) =>
	state.auth.user?.setting?.is_enabled_notification
export const selectIsEnabledKeywords = (state: RootState) =>
	state.auth.user?.setting?.is_enabled_keywords
export const selectKeywords = (state: RootState) =>
	state.auth.user?.setting?.keywords
export const selectTelegramIsEnabled = (state: RootState) =>
	state.auth.user?.setting?.telegram.is_enabled
export const selectTelegramToken = (state: RootState) =>
	state.auth.user?.setting?.telegram.token
export const selectTelegramChatId = (state: RootState) =>
	state.auth.user?.setting?.telegram.chat_id
export const selectTelegramThreadId = (state: RootState) =>
	state.auth.user?.setting?.telegram.thread_id

export const authReducer = authSlice.reducer
