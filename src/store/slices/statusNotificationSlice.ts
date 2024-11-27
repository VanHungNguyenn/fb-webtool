import { RootState } from '@/lib/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'

export interface StatusNotificationState {
	isOpen: boolean
	error: AxiosError | null
	response: AxiosResponse | null
}

const initialState: StatusNotificationState = {
	isOpen: false,
	error: null,
	response: null,
}

const statusNotificationSlice = createSlice({
	name: 'errorNotification',
	initialState,
	reducers: {
		setError(state, action: PayloadAction<AxiosError>) {
			state.isOpen = true
			state.error = action.payload
			state.response = null
		},
		setResponse(state, action: PayloadAction<AxiosResponse>) {
			state.isOpen = true
			state.error = null
			state.response = action.payload
		},
		clearStatus(state) {
			state.isOpen = false
			state.error = null
			state.response = null
		},
	},
})

export const statusNotificationActions = statusNotificationSlice.actions

export const selectStatusNotificationIsOpen = (state: RootState) =>
	state.statusNotification.isOpen
export const selectStatusNotificationError = (state: RootState) =>
	state.statusNotification.error
export const selectStatusNotificationResponse = (state: RootState) =>
	state.statusNotification.response

export const statusNotificationReducer = statusNotificationSlice.reducer
