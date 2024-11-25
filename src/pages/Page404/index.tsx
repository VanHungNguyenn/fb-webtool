import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { BiHome } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Page404 = () => {
	return (
		<Stack p={5} h='100vh' justifyContent='center' alignItems='center'>
			<Heading as='h1' size='2xl'>
				Sorry, Page not Found
			</Heading>
			<Text fontSize='xs' color='gray.500' pb={5}>
				The page you are looking for not available!
			</Text>
			<Link to='/'>
				<Button>
					<BiHome />
					Back to home
				</Button>
			</Link>
		</Stack>
	)
}

export default Page404
