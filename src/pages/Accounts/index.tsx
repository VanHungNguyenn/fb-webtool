import { createListAccounts, getListAccounts } from '@/api'
import { AccountData } from '@/api/types'
import PaginationCustom from '@/components/custom/PaginationCustom'
import BoxLayout from '@/components/layout/BoxLayout'
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-upload'
import useToast from '@/hooks/useToast'
import { getPageSizeDefault, truncateText } from '@/utils'
import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Stack,
	Table,
	Text,
	Textarea,
} from '@chakra-ui/react'
import { FileAcceptDetails } from '@zag-js/file-upload'
import { useCallback, useEffect, useState } from 'react'
import { HiUpload } from 'react-icons/hi'

const Accounts = () => {
	const [data, setData] = useState<AccountData[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false) // Trạng thái loading
	const [q, setQ] = useState('')
	const [accountValues, setAccountValues] = useState('')
	const [errorAddMessage, setErrorAddMessage] = useState('')
	const [pageSize, setPageSize] = useState(getPageSizeDefault())

	const { showToast } = useToast()

	const startIndex = (currentPage - 1) * pageSize

	const fetchAccounts = useCallback(
		async (page: number, q: string) => {
			try {
				setIsLoading(true)
				const res = await getListAccounts(q, page, pageSize)
				setData(res.data)
				setTotalItems(res.total)
			} catch (error) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		},
		[pageSize]
	)

	useEffect(() => {
		fetchAccounts(currentPage, '')
	}, [currentPage, fetchAccounts])

	const handleSearchClick = () => {
		setCurrentPage(1)
		fetchAccounts(currentPage, q)
	}

	const handleAddAccountValueFromTxt = async (details: FileAcceptDetails) => {
		try {
			const file = details.files[0]

			if (!file) {
				setErrorAddMessage('No file selected.')
				return
			}

			const fileContent = await file.text()

			const accounts = fileContent
				.split('\n')
				.map((line) => line.trim())
				.filter((line) => line)

			const parsedAccounts = accounts.map((line) => {
				const [uid, password, tfa, cookie, token, proxy] =
					line.split('|')
				return { uid, password, tfa, cookie, token, proxy }
			})

			if (parsedAccounts.some((acc) => !acc.uid || !acc.password)) {
				setErrorAddMessage('Each account must have a UID and Password.')
				return
			}

			const accountsText = parsedAccounts
				.map(
					(account) =>
						`${account.uid}|${account.password}|${account.tfa}|${account.cookie}|${account.token}|${account.proxy}`
				)
				.join('\n')

			setErrorAddMessage('')
			setAccountValues(accountsText)
		} catch (error) {
			console.error(error)
			setErrorAddMessage('An error occurred while adding accounts.')
		}
	}

	const handleAddAccountValue = async () => {
		try {
			const accounts = accountValues
				.split('\n')
				.map((line) => line.trim())
				.filter((line) => line)

			const parsedAccounts = accounts.map((line) => {
				const [uid, password, tfa, cookie, token, proxy] =
					line.split('|')
				return { uid, password, tfa, cookie, token, proxy }
			})

			// Kiểm tra nếu thiếu UID hoặc Password
			if (parsedAccounts.some((acc) => !acc.uid || !acc.password)) {
				setErrorAddMessage('Each account must have a UID and Password.')
				return
			}

			const requestData = { data: parsedAccounts }
			const response = await createListAccounts(requestData)

			if (response.success) {
				showToast({
					description: `Created ${response.data.created} of ${response.data.total} accounts successfully.`,
					type: 'success',
				})

				// Làm mới danh sách tài khoản (nếu cần)
				fetchAccounts(currentPage, q)

				// Đóng dialog và xóa dữ liệu nhập
				setAccountValues('')
				setIsDialogOpen(false)
			} else {
				setErrorAddMessage('Failed to create accounts.')
			}
		} catch (error) {
			console.error(error)
			setErrorAddMessage('An error occurred while adding accounts.')
		}
	}

	return (
		<BoxLayout>
			<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
				Accounts
			</Heading>
			<Flex
				alignItems={{
					base: 'flex-start',
					md: 'center',
				}}
				justify={{
					base: 'center',
					md: 'space-between',
				}}
				pb={5}
				gap={2}
				flexDirection={{ base: 'column', md: 'row' }}
			>
				<Flex alignItems={'center'} justify={'end'} gap={2}>
					<Input
						w={400}
						placeholder='Search...'
						value={q}
						onChange={(e) => setQ(e.target.value)}
					/>
					<Button onClick={handleSearchClick}>Search</Button>
				</Flex>

				<DialogRoot
					open={isDialogOpen}
					onOpenChange={(details) => setIsDialogOpen(details.open)}
					placement='center'
					motionPreset='slide-in-bottom'
					size='xl'
				>
					<DialogTrigger asChild>
						<Button>Add accounts</Button>
					</DialogTrigger>
					<DialogContent w={1000}>
						<DialogHeader>
							<DialogTitle>Add Accounts</DialogTitle>
						</DialogHeader>
						<DialogBody pb='8'>
							<FileUploadRoot
								maxFiles={1}
								accept={['.txt']}
								onFileAccept={(details) => {
									handleAddAccountValueFromTxt(details)
								}}
							>
								<FileUploadTrigger asChild>
									<Button variant={'subtle'} size='sm'>
										<HiUpload /> Upload file txt
									</Button>
								</FileUploadTrigger>
							</FileUploadRoot>

							<Textarea
								placeholder='Enter accounts... (uid|password|2fa|cookie|token|proxy)'
								mt='2'
								rows={4}
								value={accountValues}
								onChange={(e) => {
									setAccountValues(e.target.value)
									setErrorAddMessage('')
								}}
							/>
							{errorAddMessage && (
								<Text color='red.500' mt={2} fontSize='sm'>
									{errorAddMessage}
								</Text>
							)}
							<Flex justify={'flex-end'}>
								<Button
									onClick={handleAddAccountValue}
									mt={4}
									disabled={!accountValues}
								>
									Add accounts
								</Button>
							</Flex>
						</DialogBody>
						<DialogCloseTrigger />
					</DialogContent>
				</DialogRoot>
			</Flex>
			<Stack>
				<Box overflowX='auto' p={1}>
					<Table.Root size='sm' showColumnBorder variant='outline'>
						<Table.Header background='#b1c5fa'>
							<Table.Row>
								<Table.ColumnHeader>#</Table.ColumnHeader>
								<Table.ColumnHeader>UID</Table.ColumnHeader>
								<Table.ColumnHeader>
									Password
								</Table.ColumnHeader>
								<Table.ColumnHeader>2FA</Table.ColumnHeader>
								<Table.ColumnHeader>Email</Table.ColumnHeader>
								<Table.ColumnHeader>Cookie</Table.ColumnHeader>
								<Table.ColumnHeader>Token</Table.ColumnHeader>
								<Table.ColumnHeader>State</Table.ColumnHeader>
								<Table.ColumnHeader>Proxy</Table.ColumnHeader>
								<Table.ColumnHeader>LastRun</Table.ColumnHeader>
								<Table.ColumnHeader>State</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{!isLoading &&
								data?.map((item, index) => {
									return (
										<Table.Row key={index}>
											<Table.Cell>
												{startIndex + index + 1}
											</Table.Cell>
											<Table.Cell>{item.uid}</Table.Cell>
											<Table.Cell>
												{item.password}
											</Table.Cell>
											<Table.Cell>{item.tfa}</Table.Cell>
											<Table.Cell>
												{item.email}
											</Table.Cell>
											<Table.Cell>
												{truncateText(item.cookie)}
											</Table.Cell>
											<Table.Cell>
												{truncateText(item.token)}
											</Table.Cell>
											<Table.Cell>
												{item.state}
											</Table.Cell>
											<Table.Cell>
												{item.proxy}
											</Table.Cell>
											<Table.Cell>
												{item.last_run}
											</Table.Cell>
											<Table.Cell>
												{item.state}
											</Table.Cell>
										</Table.Row>
									)
								})}
						</Table.Body>
					</Table.Root>
				</Box>
				<PaginationCustom
					totalItems={totalItems}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={(page) => setCurrentPage(page)}
					setPageSize={setPageSize}
				/>
			</Stack>
		</BoxLayout>
	)
}

export default Accounts
