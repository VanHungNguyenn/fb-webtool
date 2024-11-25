import { Checkbox } from '@/components/ui/checkbox'
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input'
import { Radio, RadioGroup } from '@/components/ui/radio'
import {
	RadioCardItem,
	RadioCardLabel,
	RadioCardRoot,
} from '@/components/ui/radio-card'
import { Switch } from '@/components/ui/switch'
import {
	Button,
	CheckboxGroup,
	Fieldset,
	Flex,
	HStack,
	Input,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'

const items = [
	{ value: 'all', title: 'All' },
	{ value: 'keyword', title: 'By keywords' },
	{ value: 'no', title: 'No' },
]

const GeneralSetting = () => {
	const [modeValue, setModeValue] = useState('one')
	const [checked, setChecked] = useState(false)
	const [notiValue, setNotiValue] = useState('all')
	const [keywords, setKeywords] = useState('')
	const [selectedServices, setSelectedServices] = useState<string[]>([])

	return (
		<Stack gap={3}>
			<RadioGroup
				colorPalette='colorPalette'
				value={modeValue}
				onValueChange={(e) => setModeValue(e.value)}
			>
				<Text fontWeight={600}>Mode:</Text>
				<HStack gap='6'>
					<Radio value='one'>One time</Radio>
					<Radio value='repeat'>
						<HStack>
							Repeat after{' '}
							<NumberInputRoot
								defaultValue='10'
								width='70px'
								disabled={modeValue !== 'repeat'}
							>
								<NumberInputField />
							</NumberInputRoot>
							minutes
						</HStack>
					</Radio>
				</HStack>
			</RadioGroup>
			<RadioCardRoot
				value={notiValue}
				onValueChange={(e) => setNotiValue(e.value)}
				maxW={600}
			>
				<RadioCardLabel fontSize={'16px'} fontWeight={600}>
					Notification:
				</RadioCardLabel>
				<HStack align='stretch' pb={2}>
					{items.map((item) => (
						<RadioCardItem
							label={item.title}
							key={item.value}
							value={item.value}
						/>
					))}
				</HStack>
				{notiValue === 'keyword' && (
					<>
						<Switch
							checked={checked}
							onCheckedChange={(e) => setChecked(e.checked)}
						>
							Differentiate between uppercase and lowercase
							letters.
						</Switch>
						<Textarea
							placeholder='Keyword...'
							rows={4}
							value={keywords}
							onChange={(e) => setKeywords(e.target.value)}
						/>
					</>
				)}
			</RadioCardRoot>
			<Fieldset.Root pb={5}>
				<CheckboxGroup
					value={selectedServices}
					onValueChange={(value) => setSelectedServices(value)}
					pb={3}
				>
					<Fieldset.Legend fontWeight={600} fontSize={16} pb={2}>
						Notification Service:
					</Fieldset.Legend>
					<Fieldset.Content flexDirection={'row'}>
						<Checkbox value='telegram'>Telegram</Checkbox>
						<Checkbox value='google-sheet'>Google sheet</Checkbox>
					</Fieldset.Content>
				</CheckboxGroup>
				{selectedServices.includes('telegram') && (
					<Flex gap={3}>
						<HStack maxW={400}>
							<Text fontSize={'sm'} whiteSpace={'nowrap'}>
								Bot token:
							</Text>
							<Input />
						</HStack>
						<HStack maxW={300}>
							<Text fontSize={'sm'}>ChatID:</Text>
							<Input />
						</HStack>
						<HStack maxW={300}>
							<Text fontSize={'sm'}>ThreadID:</Text>
							<Input />
						</HStack>

						<Button>Test</Button>
					</Flex>
				)}
			</Fieldset.Root>
			<Button w={200}>Save</Button>
		</Stack>
	)
}

export default GeneralSetting
