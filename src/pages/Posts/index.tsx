import { getListPosts } from '@/api'
import { PostData } from '@/api/types'
import PaginationCustom from '@/components/custom/PaginationCustom'
import BoxLayout from '@/components/layout/BoxLayout'
import {
	formatTimestamp,
	getPageSizeDefault,
	transformToFacebookPostUrl,
	truncateText,
} from '@/utils'
import {
	Box,
	Button,
	Link as ChakraLink,
	Flex,
	Heading,
	Input,
	Stack,
	Table,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'

const Posts = () => {
	const [data, setData] = useState<PostData[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [isLoading, setIsLoading] = useState(false) // Trạng thái loading
	const [q, setQ] = useState('')

	const [pageSize, setPageSize] = useState(getPageSizeDefault())

	const startIndex = (currentPage - 1) * pageSize

	const fetchPosts = useCallback(
		async (page: number, q: string, group_id: string = '') => {
			try {
				setIsLoading(true)
				const res = await getListPosts(q, page, pageSize, group_id)
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
		fetchPosts(currentPage, '')
	}, [currentPage, fetchPosts])

	const handleSearchClick = () => {
		setCurrentPage(1)
		fetchPosts(currentPage, q)
	}

	return (
		<BoxLayout>
			<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
				Posts
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
				<Box p={1}>
					<Table.Root size='sm' showColumnBorder variant='outline'>
						<Table.Header background='#b1c5fa'>
							<Table.Row>
								<Table.ColumnHeader>#</Table.ColumnHeader>
								<Table.ColumnHeader>PostID</Table.ColumnHeader>
								<Table.ColumnHeader>
									Username
								</Table.ColumnHeader>
								<Table.ColumnHeader>Message</Table.ColumnHeader>
								<Table.ColumnHeader>
									UpdatedTime
								</Table.ColumnHeader>
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
											<Table.Cell>
												<ChakraLink
													asChild
													outline={'none'}
												>
													<Link
														to={transformToFacebookPostUrl(
															item.post_id
														)}
														target='blank'
													>
														{truncateText(
															item.post_id,
															20
														)}
													</Link>
												</ChakraLink>
											</Table.Cell>
											<Table.Cell>
												{item.from_user.name}
											</Table.Cell>
											<Table.Cell>
												{item.message}
											</Table.Cell>
											<Table.Cell>
												{formatTimestamp(
													item.updated_time
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

export default Posts
