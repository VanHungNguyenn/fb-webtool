import { postForgotPassword } from '@/api'
import { Field } from '@/components/ui/field'
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
import { Link } from 'react-router-dom'

interface FormValues {
	email: string
}

const ForgotPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()
	const onSubmit = handleSubmit(async (data) => {
		try {
			const response = await postForgotPassword(data.email)

			console.log(response)
		} catch (error) {
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
						Forgot Password
					</Heading>
					<Text fontSize={'sm'} color={'gray.600'} pb={6}>
						Enter your email address below and we’ll send you a link
						to reset your password.
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
								})}
								placeholder='mail@example.com'
							/>
						</Field>
						<Button type='submit' w='100%' borderRadius='xl'>
							Submit
						</Button>
						<Text color='gray.400' fontSize='sm'>
							Remember your password?{' '}
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

export default ForgotPassword
