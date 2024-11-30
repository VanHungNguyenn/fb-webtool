import { getInfoUser, postLogin } from '@/api'
import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import useToast from '@/hooks/useToast'
import { useAppDispatch } from '@/lib/hooks'
import { authActions } from '@/store/slices/authSlice'
import AuthStorage from '@/utils/AuthStorage'
import { handleAxiosError } from '@/utils/AxiosErrorHandler'
import {
	Button,
	Link as ChakraLink,
	Flex,
	Heading,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

interface FormValues {
	email: string
	password: string
}

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { showToast } = useToast()

	const onSubmit = handleSubmit(async (data) => {
		try {
			const response = await postLogin({
				username: data.email,
				password: data.password,
			})

			if (response.status === 200 && response.data?.access_token) {
				const token = response.data.access_token
				AuthStorage.setToken(token)

				const infoUser = await getInfoUser()

				if (infoUser.success && infoUser.data) {
					dispatch(
						authActions.actionLoginSuccess({
							token: token,
							user: infoUser.data,
						})
					)

					showToast({
						description: 'Sign in successfully',
						type: 'success',
					})

					navigate('/')
				} else {
					showToast({
						description: infoUser?.error || '',
						type: 'error',
					})
				}
			} else {
				showToast({
					description: 'Email or password is incorrect',
					type: 'error',
				})
			}
		} catch (error: unknown) {
			handleAxiosError(error)
		}
	})
	return (
		<Flex minH='100vh' align='center' justify='center' bg='bgPrimary'>
			<Stack
				gap={8}
				mx='auto'
				maxW={410}
				w='100%'
				py={12}
				px={6}
				bg='white'
				borderRadius='2xl'
			>
				<Stack>
					<Heading
						fontSize={28}
						fontWeight={700}
						pb={3}
						color='gray.700'
					>
						Sign In
					</Heading>
					<Text fontSize={'sm'} color={'gray.600'} pb={6}>
						Enter your email and password to sign in!
					</Text>
				</Stack>

				<form onSubmit={onSubmit}>
					<Stack gap='4' align='flex-start' maxW='sm'>
						<Field
							label='Email'
							invalid={!!errors.email}
							errorText={errors.email?.message}
						>
							<Input
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: 'Invalid email address',
									},
								})}
								placeholder='mail@example.com'
							/>
						</Field>
						<Field
							label='Password'
							invalid={!!errors.password}
							errorText={errors.password?.message}
						>
							<PasswordInput
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 1,
										message:
											'Password must be at least 6 characters',
									},
								})}
								placeholder='Min. 6 characters'
							/>
						</Field>
						<Text alignSelf={'end'} fontSize='sm'>
							<ChakraLink asChild outline={'none'}>
								<Link to='/forgot-password'>
									Forgot password?
								</Link>
							</ChakraLink>
						</Text>
						<Button type='submit' w='100%' borderRadius='xl'>
							Sign In
						</Button>
						<Text color='gray.400' fontSize='sm'>
							Not register yet?{' '}
							<ChakraLink asChild outline={'none'}>
								<Link to='/sign-up'>Create an Account</Link>
							</ChakraLink>
						</Text>
					</Stack>
				</form>
			</Stack>
		</Flex>
	)
}

export default SignIn
