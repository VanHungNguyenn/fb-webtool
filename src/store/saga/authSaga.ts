import { postLogin } from '@/api'
import { LoginRequest } from '@/api/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { authActions } from '../slices/authSlice'

function* yieldLogin(action: PayloadAction<LoginRequest>) {
	try {
		console.log(action.payload)
		const response: AxiosResponse = yield call(postLogin, action.payload)
		console.log(response)
	} catch (err) {
		yield put(authActions.actionLoginFailed(err as AxiosError))
	}
}

export default function* authSaga() {
	yield takeLatest(authActions.actionLogin.type, yieldLogin)
}
