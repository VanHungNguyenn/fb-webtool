import { getInfoUser } from '@/api'
import { GetInfoUserResponse } from '@/api/types'
import { call, put, takeLatest } from 'redux-saga/effects'
import { authActions } from '../slices/authSlice'

function* yieldSetUser() {
	try {
		const response: GetInfoUserResponse = yield call(getInfoUser)
		if (response.data) {
			yield put(authActions.setUserSuccess(response?.data))
		}
	} catch (err) {
		yield put(authActions.setUserFailed())
	}
}

export default function* authSaga() {
	yield takeLatest(authActions.setUser.type, yieldSetUser)
}
