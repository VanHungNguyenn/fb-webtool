import BoxLayout from '@/components/layout/BoxLayout'
import {
	Box,
	Button,
	Flex,
	Heading,
	List,
	Text,
	VStack,
} from '@chakra-ui/react'
import { BiCheckCircle } from 'react-icons/bi'

const Pricing = () => {
	return (
		<BoxLayout>
			<VStack gap={2} textAlign='center' py={10}>
				<Heading as='h1' fontSize='4xl' pb={3} fontWeight={700}>
					Plans that fit your need
				</Heading>
				<Text fontSize='lg' color={'gray.500'}>
					Start with 14-day free trial. No credit card needed. Cancel
					at anytime.
				</Text>
			</VStack>

			<Flex alignItems={'center'} justify={'center'} gap={4} pb={10}>
				{Array.from({ length: 3 }).map((_, index) => (
					<Box
						key={index}
						w={400}
						borderRadius='xl'
						overflow='hidden'
						boxShadow='0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)'
					>
						<Box bg='#F0EAFB' py={8} textAlign='center'>
							<Text fontWeight='extrabold' fontSize='xl' pb={2}>
								Premium PRO
							</Text>
							<Heading as='h3' fontSize={'6xl'} mt='4' pb={3}>
								$329
							</Heading>
							<Text
								color='gray.900'
								fontSize='md'
								fontWeight='medium'
								pb={5}
							>
								billed just once
							</Text>
							<Button colorScheme='purple' size='lg'>
								Get Started
							</Button>
						</Box>
						{/* Right Side */}
						<Box p={8} bg='bg'>
							<List.Root gap={4} variant='plain' align='center'>
								<List.Item>
									<List.Indicator
										display='flex'
										alignItems='center'
										color='green.500'
									>
										<BiCheckCircle />
									</List.Indicator>
									International calling and messaging API
								</List.Item>
								<List.Item>
									<List.Indicator
										display='flex'
										alignItems='center'
										color='green.500'
									>
										<BiCheckCircle />
									</List.Indicator>
									Additional phone numbers
								</List.Item>
								<List.Item>
									<List.Indicator
										display='flex'
										alignItems='center'
										color='green.500'
									>
										<BiCheckCircle />
									</List.Indicator>
									Automated messages via Zapier
								</List.Item>
								<List.Item>
									<List.Indicator
										display='flex'
										alignItems='center'
										color='green.500'
									>
										<BiCheckCircle />
									</List.Indicator>
									24/7 support and consulting
								</List.Item>
								<List.Item>
									<List.Indicator
										display='flex'
										alignItems='center'
										color='green.500'
									>
										<BiCheckCircle />
									</List.Indicator>
									International calling and messaging API
								</List.Item>
								<List.Item>
									<List.Indicator
										display='flex'
										alignItems='center'
										color='green.500'
									>
										<BiCheckCircle />
									</List.Indicator>
									Additional phone numbers
								</List.Item>
							</List.Root>
						</Box>
					</Box>
				))}
			</Flex>
		</BoxLayout>
	)
}

export default Pricing
