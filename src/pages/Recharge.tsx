import { Box, Heading, Text, VStack } from '@chakra-ui/react'

const Recharge = () => {
	return (
		<Box py={12}>
			<VStack gap={2} textAlign='center'>
				<Heading as='h1' fontSize='4xl' pb={3} fontWeight={700}>
					Plans that fit your need
				</Heading>
				<Text fontSize='lg' color={'gray.500'}>
					Start with 14-day free trial. No credit card needed. Cancel
					at anytime.
				</Text>
			</VStack>
		</Box>
	)
}

export default Recharge
