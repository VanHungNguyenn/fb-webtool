import { createListGroups, getListGroups } from '@/api'
import { GroupData } from '@/api/types'
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from '@/components/ui/pagination'
import useToast from '@/hooks/useToast'
import { isValidUrl, renderTag, truncateText } from '@/utils'
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Input,
	Stack,
	Table,
	Text,
	Textarea,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { formatTimestamp } from '../../utils/formatTimestamp'

const Groups = () => {
	const [data, setData] = useState<GroupData[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false) // Trạng thái loading
	const [q, setQ] = useState('')
	const [groupValues, setGroupValues] = useState('')
	const [errorAddMessage, setErrorAddMessage] = useState('')
	const pageSize = 10

	const { showToast } = useToast()

	const startIndex = (currentPage - 1) * pageSize

	const fetchGroups = async (page: number, q: string) => {
		try {
			setIsLoading(true)
			const res = await getListGroups(q, page, pageSize)
			setData(res.data)
			setTotalItems(res.total)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchGroups(currentPage, '')
	}, [currentPage])

	const handleSearchClick = () => {
		fetchGroups(currentPage, q)
	}

	const handleAddGroupValue = async () => {
		const urls = groupValues.split('\n').map((url) => url.trim())

		const invalidUrls = urls.filter((url) => !isValidUrl(url))

		if (invalidUrls.length > 0) {
			setErrorAddMessage(
				`Invalid URLs: ${truncateText(invalidUrls.join(', '), 300)}`
			)
			return
		}

		try {
			const response = await createListGroups({ urls })
			if (response.success) {
				setErrorAddMessage('')
				showToast({
					description: `Groups added successfully. Created: ${response.data.created}, Updated: ${response.data.updated}`,
					type: 'success',
				})
				setGroupValues('')
				setIsDialogOpen(false)
				fetchGroups(currentPage, q)
			} else {
				setErrorAddMessage('Failed to add groups. Please try again.')
			}
		} catch (error) {
			setErrorAddMessage(
				'An error occurred while adding groups. Please try again.'
			)
		}
	}

	return (
		<>
			<Box bg='bg' p={4} borderRadius={'xl'}>
				<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
					Groups
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
						onOpenChange={(details) =>
							setIsDialogOpen(details.open)
						}
					>
						<DialogTrigger asChild>
							<Button>Add groups</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Groups</DialogTitle>
							</DialogHeader>
							<DialogBody pb='8'>
								<Textarea
									placeholder='Enter groups url...'
									mt='2'
									rows={4}
									value={groupValues}
									onChange={(e) =>
										setGroupValues(e.target.value)
									}
								/>
								{errorAddMessage && (
									<Text color='red.500' mt={2} fontSize='sm'>
										{errorAddMessage}
									</Text>
								)}
								<Flex justify={'flex-end'}>
									<Button
										onClick={handleAddGroupValue}
										mt={4}
									>
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
						<Table.Root
							size='sm'
							showColumnBorder
							variant='outline'
						>
							<Table.Header background='#b1c5fa'>
								<Table.Row>
									<Table.ColumnHeader>#</Table.ColumnHeader>
									<Table.ColumnHeader>
										GroupID
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										GroupName
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										GroupURL
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										Privacy
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										LastRun
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										Status
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
													{item.group_id}
												</Table.Cell>
												<Table.Cell>
													{item.name}
												</Table.Cell>
												<Table.Cell>
													{item.url}
												</Table.Cell>
												<Table.Cell>
													{renderTag(item.privacy, {
														open: 'green',
													})}
												</Table.Cell>
												<Table.Cell>
													{formatTimestamp(
														item.last_run
													)}
												</Table.Cell>
												<Table.Cell></Table.Cell>
											</Table.Row>
										)
									})}
							</Table.Body>
						</Table.Root>
					</Box>

					<PaginationRoot
						count={totalItems}
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
		</>
	)
}

export default Groups
