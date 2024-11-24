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
	name: string
	email: string
	password: string
	confirmPassword: string
}

const SignUp = () => {
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
						Sign Up
					</Heading>
					<Text fontSize={'sm'} color={'gray.600'} pb={6}>
						Join us and start your journey today!
					</Text>
				</Stack>

				<form onSubmit={onSubmit}>
					<Stack gap='4' align='flex-start' maxW='sm'>
						<Field
							label='Name'
							invalid={!!errors.name}
							errorText={errors.name?.message}
						>
							<Input
								{...register('name', {
									required: 'Name is required',
								})}
								placeholder='Your name'
							/>
						</Field>
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
						<Field
							label='Confirm Password'
							invalid={!!errors.confirmPassword}
							errorText={errors.confirmPassword?.message}
						>
							<Input
								{...register('confirmPassword', {
									required: 'Confirm Password is required',
								})}
								placeholder='Min. 8 characters'
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
