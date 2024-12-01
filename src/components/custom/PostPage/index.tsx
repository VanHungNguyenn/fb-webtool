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
	Spinner,
	Stack,
	Table,
	Text,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { IoIosReturnLeft } from 'react-icons/io'
import { Link } from 'react-router'

interface PostPageProps {
	groupId?: string
	groupName?: string
}

const PostPage = ({ groupId = '', groupName = '' }: PostPageProps) => {
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
		fetchPosts(currentPage, '', groupId)
	}, [currentPage, fetchPosts, groupId, q])

	const handleSearchClick = () => {
		setCurrentPage(1)
		fetchPosts(currentPage, q, groupId)
	}

	return (
		<BoxLayout>
			{groupId && (
				<Flex pb={4}>
					<Link to='/groups'>
						<Button
							colorScheme='blue'
							variant='subtle'
							borderRadius={'full'}
						>
							<IoIosReturnLeft />
							BACK
						</Button>
					</Link>
				</Flex>
			)}

			<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
				{groupId ? `Posts of Group ${groupName || groupId}` : 'Posts'}
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
					<Table.Root
						size='sm'
						showColumnBorder
						variant='outline'
						interactive
					>
						<Table.Header background='blue.300'>
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
							{!isLoading && data.length === 0 && (
								<Table.Row>
									<Table.Cell colSpan={6} h={100}>
										<Text
											textAlign='center'
											color='gray.500'
											fontSize='lg'
										>
											No data found
										</Text>
									</Table.Cell>
								</Table.Row>
							)}
							{!isLoading ? (
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
								})
							) : (
								<Table.Row>
									<Table.Cell colSpan={6} h={100}>
										<Text
											textAlign='center'
											color='gray.500'
											fontSize='lg'
										>
											<Spinner />
										</Text>
									</Table.Cell>
								</Table.Row>
							)}
						</Table.Body>
					</Table.Root>
				</Box>
				{data.length > 0 && (
					<PaginationCustom
						totalItems={totalItems}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={(page) => setCurrentPage(page)}
						setPageSize={setPageSize}
					/>
				)}
			</Stack>
		</BoxLayout>
	)
}

export default PostPage
