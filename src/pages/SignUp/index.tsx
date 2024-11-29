import { postRegister } from '@/api'
import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import useToast from '@/hooks/useToast'
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
	confirmPassword: string
}

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormValues>()

	const passwordValue = watch('password')
	const navigate = useNavigate()
	const { showToast } = useToast()

	const onSubmit = handleSubmit(async (data) => {
		try {
			const response = await postRegister({
				email: data.email,
				password: data.password,
			})

			if (response.status === 201) {
				showToast({
					description: 'Sign up successfully',
					type: 'success',
				})

				navigate('/sign-in')
			} else {
				showToast({
					description: 'Email is already taken',
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
						Sign Up
					</Heading>
					<Text fontSize={'sm'} color={'gray.600'} pb={6}>
						Join us and start your journey today!
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
										value: 6,
										message:
											'Password must be at least 6 characters',
									},
								})}
								placeholder='Min. 6 characters'
							/>
						</Field>
						<Field
							label='Confirm Password'
							invalid={!!errors.confirmPassword}
							errorText={errors.confirmPassword?.message}
						>
							<PasswordInput
								{...register('confirmPassword', {
									required: 'Confirm Password is required',
									validate: (value) =>
										value === passwordValue ||
										'Passwords do not match',
								})}
								placeholder='Min. 6 characters'
							/>
						</Field>
						<Button type='submit' w='100%' borderRadius='xl'>
							Sign Up
						</Button>
						<Text color='gray.400' fontSize='sm'>
							Already have an account?{' '}
							<ChakraLink asChild outline={'none'}>
								<Link to='/sign-in'>Let's Sign in</Link>
							</ChakraLink>
						</Text>
					</Stack>
				</form>
			</Stack>
		</Flex>
	)
}

export default SignUp
