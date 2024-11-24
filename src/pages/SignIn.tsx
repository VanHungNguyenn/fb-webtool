import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
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
	password: string
}

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()
	const onSubmit = handleSubmit((data) => console.log(data))
	return (
		<Flex minH='100vh' align='center' justify='center'>
			<Stack gap={8} mx='auto' maxW={410} w='100%' py={12} px={6}>
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
								})}
								placeholder='Min. 8 characters'
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
