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
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload
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

export const authReducer = authSlice.reducer
