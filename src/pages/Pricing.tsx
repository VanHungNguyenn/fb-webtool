import { Box, Flex, Grid, Heading, Text, VStack } from '@chakra-ui/react'

const Pricing = () => {
	return (
		<Box py={12}>
			<VStack gap={2} textAlign='center' pb={5}>
				<Heading as='h1' fontSize='4xl' pb={3} fontWeight={700}>
					Plans that fit your need
				</Heading>
				<Text fontSize='lg' color={'gray.500'}>
					Start with 14-day free trial. No credit card needed. Cancel
					at anytime.
				</Text>
			</VStack>
			<Grid
				templateColumns='repeat(3, 1fr)'
				gap='6'
				maxW={1200}
				mx='auto'
			>
				<Flex
					p={6}
					borderWidth='1px'
					borderRadius='lg'
					bg='bg'
					flexDirection='column'
				></Flex>
				<Flex
					p={6}
					borderWidth='1px'
					borderRadius='lg'
					bg='bg'
					flexDirection='column'
				></Flex>
				<Flex
					p={6}
					borderWidth='1px'
					borderRadius='lg'
					bg='bg'
					flexDirection='column'
				></Flex>
			</Grid>
		</Box>
	)
}

export default Pricing
