import { statusNotificationActions } from '@/store/slices/statusNotificationSlice'
import { AxiosError, AxiosResponse } from 'axios'
import { all, put } from 'redux-saga/effects'

export function* handleHttpError(e: AxiosError) {
	yield put(statusNotificationActions.setError(e))
}

export function* handleHttpResponse(data: AxiosResponse) {
	yield put(statusNotificationActions.setResponse(data))
}

export default function* rootSaga() {
	yield all([])
}
