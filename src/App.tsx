import { Toaster } from '@/components/ui/toaster'
import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { getInfoUser } from './api'
import { router } from './configs/RouterConfig'
import { useAppDispatch, useAppSelector } from './lib/hooks'
import { authActions, selectIsLoading } from './store/slices/authSlice'
import AuthStorage from './utils/AuthStorage'

function App() {
	const isLoading = useAppSelector(selectIsLoading)

	const dispatch = useAppDispatch()

	useEffect(() => {
		const checkToken = async () => {
			const token = AuthStorage.getToken()

			if (token) {
				try {
					const response = await getInfoUser()

					if (response.success && response.data) {
						dispatch(
							authActions.actionLoginSuccess({
								token: token,
								user: response.data,
							})
						)
					}
				} catch (err) {
					dispatch(authActions.actionLoginFailed(err))
				}
			}

			dispatch(authActions.setIsLoading(false))
		}

		checkToken()
	}, [dispatch])

	if (isLoading) {
		return (
			<Flex justify={'center'} pt={5}>
				<Spinner />
			</Flex>
		)
	}

	return (
		<>
			<Toaster />
			<RouterProvider router={router} />
		</>
	)
}

export default App
