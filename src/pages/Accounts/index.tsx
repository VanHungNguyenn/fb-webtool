import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from '@/components/ui/pagination'
import { Tag } from '@/components/ui/tag'
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Input,
	Stack,
	Table,
} from '@chakra-ui/react'
import { useState } from 'react'
import { data } from './data'

function truncateText(text: string, maxLength: number = 30): string {
	if (text.length <= maxLength) return text
	return text.slice(0, maxLength) + '...'
}

const Accounts = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 10
	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize
	const paginatedData = data.slice(startIndex, endIndex)

	return (
		<Box bg='bg' p={4} borderRadius={'xl'}>
			<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
				Settings
			</Heading>
			<Flex alignItems={'center'} justify='space-between' pb={5}>
				<Flex alignItems={'center'} justify={'end'} gap={2}>
					<Input w={500} placeholder='Search...' />
					<Button>Search</Button>
				</Flex>
				<Button>Add accounts</Button>
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
								<Table.ColumnHeader>Email</Table.ColumnHeader>
								<Table.ColumnHeader>Cookie</Table.ColumnHeader>
								<Table.ColumnHeader>Token</Table.ColumnHeader>
								<Table.ColumnHeader>State</Table.ColumnHeader>
								<Table.ColumnHeader>Status</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{paginatedData.map((item, index) => (
								<Table.Row key={item.uid}>
									{/* so thu tu */}
									<Table.Cell>
										{startIndex + index + 1}
									</Table.Cell>
									<Table.Cell>
										{truncateText(item.uid, 15)}
									</Table.Cell>
									<Table.Cell>{item.password}</Table.Cell>
									<Table.Cell>{item.email}</Table.Cell>
									<Table.Cell>
										{truncateText(item.cookie)}
									</Table.Cell>
									<Table.Cell>
										{truncateText(item.token)}
									</Table.Cell>
									<Table.Cell>
										<Tag
											colorPalette={
												item.state === 'live'
													? 'green'
													: 'red'
											}
											textTransform='capitalize'
										>
											{item.state}
										</Tag>
									</Table.Cell>
									<Table.Cell>
										<Tag
											colorPalette={
												item.status === 'done'
													? 'green'
													: 'red'
											}
											textTransform='capitalize'
										>
											{item.status}
										</Tag>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</Box>

				<PaginationRoot
					count={data.length}
					pageSize={pageSize}
					page={currentPage}
					onPageChange={(e) => setCurrentPage(e.page)}
					alignSelf={'flex-end'}
				>
					<HStack wrap='wrap'>
						<PaginationPrevTrigger />
						<PaginationItems />
						<PaginationNextTrigger />
					</HStack>
				</PaginationRoot>
			</Stack>
		</Box>
	)
}

export default Accounts
