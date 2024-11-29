import { getListAccounts } from '@/api'
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
import useToast from '@/hooks/useToast'
import { truncateText } from '@/utils'
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
import { useEffect, useState } from 'react'

const Accounts = () => {
	const [data, setData] = useState<AccountData[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false) // Trạng thái loading
	const [q, setQ] = useState('')
	const [accountValues, setAccountValues] = useState('')
	const [errorAddMessage, setErrorAddMessage] = useState('')
	const pageSize = 10

	const { showToast } = useToast()

	const startIndex = (currentPage - 1) * pageSize

	const fetchAccounts = async (page: number, q: string) => {
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
	}

	useEffect(() => {
		fetchAccounts(currentPage, '')
	}, [currentPage])

	const handleSearchClick = () => {
		fetchAccounts(currentPage, q)
	}

	const handleAddAccountValue = async () => {
		//
	}

	return (
		<BoxLayout>
			<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
				Accounts
			</Heading>
			<Flex alignItems={'center'} justify='space-between' pb={5}>
				<Flex alignItems={'center'} justify={'end'} gap={2}>
					<Input
						w={500}
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
							<Textarea
								placeholder='Enter accounts...'
								mt='2'
								rows={4}
								value={accountValues}
								onChange={(e) =>
									setAccountValues(e.target.value)
								}
							/>
							{errorAddMessage && (
								<Text color='red.500' mt={2} fontSize='sm'>
									{errorAddMessage}
								</Text>
							)}
							<Flex justify={'flex-end'}>
								<Button onClick={handleAddAccountValue} mt={4}>
									Add groups
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
				/>
			</Stack>
		</BoxLayout>
	)
}

export default Accounts
