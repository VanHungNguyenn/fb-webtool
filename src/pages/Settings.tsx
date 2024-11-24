import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input'
import { Radio, RadioGroup } from '@/components/ui/radio'
import {
	RadioCardItem,
	RadioCardLabel,
	RadioCardRoot,
} from '@/components/ui/radio-card'
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'

const items = [
	{ value: 'all', title: 'All' },
	{ value: 'keyword', title: 'By keywords' },
	{ value: 'no', title: 'No' },
]

const Settings = () => {
	const [value, setValue] = useState('one')

	return (
		<Box bg='bg' p={4} borderRadius={'xl'}>
			<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={5}>
				Settings
			</Heading>
			<Stack>
				<RadioGroup
					colorPalette='colorPalette'
					value={value}
					onValueChange={(e) => setValue(e.value)}
					pb={2}
				>
					<Text fontWeight={500}>Mode:</Text>
					<HStack gap='6'>
						<Radio value='one'>One time</Radio>
						<Radio value='repeat'>
							<HStack>
								Repeat after{' '}
								<NumberInputRoot
									defaultValue='10'
									width='100px'
									disabled={value !== 'repeat'}
								>
									<NumberInputField />
								</NumberInputRoot>
								minutes
							</HStack>
						</Radio>
					</HStack>
				</RadioGroup>
				<RadioCardRoot defaultValue='all' maxW={600}>
					<RadioCardLabel fontSize={'16px'}>
						Notification:
					</RadioCardLabel>
					<HStack align='stretch'>
						{items.map((item) => (
							<RadioCardItem
								label={item.title}
								key={item.value}
								value={item.value}
							/>
						))}
					</HStack>
				</RadioCardRoot>
			</Stack>
		</Box>
	)
}

export default Settings
