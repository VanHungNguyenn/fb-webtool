import { getListUsers } from '@/api'
import { UserData } from '@/api/types'
import PaginationCustom from '@/components/custom/PaginationCustom'
import BoxLayout from '@/components/layout/BoxLayout'
import { getPageSizeDefault, renderTagBoolean } from '@/utils'
import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Stack,
	Table,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

const Users = () => {
	const [data, setData] = useState<UserData[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [isLoading, setIsLoading] = useState(false) // Trạng thái loading
	const [q, setQ] = useState('')

	const [pageSize, setPageSize] = useState(getPageSizeDefault())

	const startIndex = (currentPage - 1) * pageSize

	const fetchUsers = useCallback(
		async (page: number, q: string) => {
			try {
				setIsLoading(true)
				const res = await getListUsers(q, page, pageSize)
				console.log(res)
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
		fetchUsers(currentPage, '')
	}, [currentPage, fetchUsers])

	const handleSearchClick = () => {
		setCurrentPage(1)
		fetchUsers(currentPage, q)
	}

	return (
		<BoxLayout>
			<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
				Users
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
			</Flex>
			<Stack>
				<Box overflowX='auto' p={1}>
					<Table.Root size='sm' showColumnBorder variant='outline'>
						<Table.Header background='#b1c5fa'>
							<Table.Row>
								<Table.ColumnHeader>#</Table.ColumnHeader>
								<Table.ColumnHeader>ID</Table.ColumnHeader>
								<Table.ColumnHeader>email</Table.ColumnHeader>
								<Table.ColumnHeader>Role</Table.ColumnHeader>
								<Table.ColumnHeader>Actived</Table.ColumnHeader>
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

											<Table.Cell>{item.id}</Table.Cell>
											<Table.Cell>
												{item.email}
											</Table.Cell>
											<Table.Cell>
												{renderTagBoolean(
													item.is_superuser,
													{
														trueLabel: 'Admin',
														falseLabel: 'User',
													}
												)}
											</Table.Cell>
											<Table.Cell>
												{renderTagBoolean(
													item.is_active
												)}
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

export default Users
