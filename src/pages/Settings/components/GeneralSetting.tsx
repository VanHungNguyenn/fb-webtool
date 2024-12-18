import { patchInfoUser } from '@/api'
import { SheetSetting, TelegramSetting } from '@/api/types'
import { Checkbox } from '@/components/ui/checkbox'
import {
	RadioCardItem,
	RadioCardLabel,
	RadioCardRoot,
} from '@/components/ui/radio-card'
import { Switch } from '@/components/ui/switch'
import useToast from '@/hooks/useToast'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
	authActions,
	selectIsEnabledKeywords,
	selectIsEnabledNotification,
	selectKeywords,
	selectSheet,
	selectTelegram,
} from '@/store/slices/authSlice'
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
	{ value: 'keyword', title: 'By keywords' },
	{ value: 'no', title: 'No' },
]

const GeneralSetting = () => {
	const { showToast } = useToast()
	const dispatch = useAppDispatch()

	const isEnabledNotification = useAppSelector(selectIsEnabledNotification)
	const isEnabledKeyWords = useAppSelector(selectIsEnabledKeywords)
	const listKeyWords = useAppSelector(selectKeywords)
	const telegramInfo = useAppSelector(selectTelegram)
	const sheetInfo = useAppSelector(selectSheet)

	const [notificationValue, setNotificationValue] = useState<boolean>(
		isEnabledNotification || false
	)
	const [checked, setChecked] = useState(isEnabledKeyWords || false)
	const [keyWords, setKeywords] = useState<string>(
		listKeyWords?.join(', ') || ''
	)
	const [telegramSetting, setTelegramSetting] = useState<TelegramSetting>(
		telegramInfo || {
			is_enabled: false,
			token: null,
			chat_id: null,
			thread_id: null,
		}
	)
	const [sheetSetting, setSheetSetting] = useState<SheetSetting>(
		sheetInfo || {
			is_enabled: false,
			sheet_id: null,
		}
	)

	const handleTelegramChange = (
		field: keyof TelegramSetting,
		value: string | boolean
	) => {
		setTelegramSetting((prev) => ({ ...prev, [field]: value }))
	}

	const handleSheetChange = (value: string) => {
		setSheetSetting((prev) => ({ ...prev, sheet_id: value }))
	}

	const handleSaveSettingChange = async () => {
		const data = {
			setting: {
				is_enabled_notification: notificationValue,
				is_enabled_keywords: checked,
				keywords: keyWords.split(',').map((item) => item.trim()),
				telegram: telegramSetting,
				sheet: sheetSetting,
			},
		}

		try {
			const response = await patchInfoUser(data)

			if (response.success) {
				showToast({
					description: 'Setting saved',
					type: 'success',
				})

				dispatch(authActions.setUser())
			} else {
				showToast({
					description: 'Failed to save setting',
					type: 'error',
				})
			}
		} catch (err) {
			showToast({
				description: 'Failed to save setting',
				type: 'error',
			})
		}
	}

	return (
		<Stack gap={3}>
			<RadioCardRoot
				value={notificationValue === false ? 'no' : 'keyword'}
				onValueChange={(e) => {
					setNotificationValue(e.value === 'keyword')
				}}
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
				{notificationValue && (
					<>
						<Switch
							checked={checked}
							onCheckedChange={(e) => setChecked(e.checked)}
							py={2}
						>
							<Text fontSize='md' fontWeight='normal'>
								Differentiate between uppercase and lowercase
								letters.
							</Text>
						</Switch>
						<Textarea
							placeholder='Keyword...'
							rows={4}
							value={keyWords}
							onChange={(e) => setKeywords(e.target.value)}
						/>
					</>
				)}
			</RadioCardRoot>
			<Fieldset.Root pb={5}>
				<CheckboxGroup
					value={[
						telegramSetting.is_enabled ? 'telegram' : '',
						sheetSetting.is_enabled ? 'google-sheet' : '',
					]}
					onValueChange={(values) => {
						setTelegramSetting((prev) => ({
							...prev,
							is_enabled: values.includes('telegram'),
						}))
						setSheetSetting((prev) => ({
							...prev,
							is_enabled: values.includes('google-sheet'),
						}))
					}}
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
				{telegramSetting.is_enabled && (
					<Flex gap={3}>
						<HStack maxW={400}>
							<Text fontSize={'sm'} whiteSpace={'nowrap'}>
								Bot token:
							</Text>
							<Input
								value={telegramSetting.token || ''}
								onChange={(e) =>
									handleTelegramChange(
										'token',
										e.target.value
									)
								}
							/>
						</HStack>
						<HStack maxW={300}>
							<Text fontSize={'sm'}>ChatID:</Text>
							<Input
								value={telegramSetting.chat_id || ''}
								onChange={(e) =>
									handleTelegramChange(
										'chat_id',
										e.target.value
									)
								}
							/>
						</HStack>
						<HStack maxW={300}>
							<Text fontSize={'sm'}>ThreadID:</Text>
							<Input
								value={telegramSetting.thread_id || ''}
								onChange={(e) =>
									handleTelegramChange(
										'thread_id',
										e.target.value
									)
								}
							/>
						</HStack>

						<Button>Check telegram</Button>
					</Flex>
				)}
				{sheetSetting.is_enabled && (
					<Flex gap={3}>
						<HStack>
							<Text fontSize={'sm'} whiteSpace={'nowrap'}>
								Sheet ID:
							</Text>
							<Input
								value={sheetSetting.sheet_id || ''}
								onChange={(e) =>
									handleSheetChange(e.target.value)
								}
							/>
						</HStack>
						<Button disabled>Check GGsheet</Button>
					</Flex>
				)}
			</Fieldset.Root>
			<Button w={200} onClick={handleSaveSettingChange}>
				Save
			</Button>
		</Stack>
	)
}

export default GeneralSetting
