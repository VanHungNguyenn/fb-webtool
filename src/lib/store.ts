import { authReducer } from '@/store/slices/authSlice'
import { statusNotificationReducer } from '@/store/slices/statusNotificationSlice'
import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const rootReducer = combineReducers({
	auth: authReducer,
	statusNotification: statusNotificationReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			serializableCheck: false,
			immutableCheck: true,
		}).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
