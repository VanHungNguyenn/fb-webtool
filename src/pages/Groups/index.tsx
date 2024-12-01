import { createListGroups, deleteGroup, getListGroups } from '@/api'
import { GroupData } from '@/api/types'
import PaginationCustom from '@/components/custom/PaginationCustom'
import BoxLayout from '@/components/layout/BoxLayout'
import {
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Tooltip } from '@/components/ui/tooltip'
import useToast from '@/hooks/useToast'
import {
	getPageSizeDefault,
	isValidUrl,
	renderTag,
	truncateText,
} from '@/utils'
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
import { useCallback, useEffect, useState } from 'react'
import { FaList } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
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
	const [pageSize, setPageSize] = useState(getPageSizeDefault())
	const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false)
	const [deleteItemId, setDeleteItemId] = useState<string | null>(null)

	const { showToast } = useToast()

	const startIndex = (currentPage - 1) * pageSize

	const fetchGroups = useCallback(
		async (page: number, q: string) => {
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
		},
		[pageSize]
	)
	useEffect(() => {
		fetchGroups(currentPage, '')
	}, [currentPage, fetchGroups])

	const handleSearchClick = () => {
		setCurrentPage(1)
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

	const handleDeleteItem = async () => {
		if (!deleteItemId) return

		try {
			// Gửi yêu cầu xóa
			const response = await deleteGroup(deleteItemId)

			if (response.success) {
				showToast({
					description: 'Item deleted successfully.',
					type: 'success',
				})
				fetchGroups(currentPage, q)
			} else {
				showToast({
					description: 'Failed to delete item. Please try again.',
					type: 'error',
				})
			}
			setIsShowDeleteDialog(false)
		} catch (error) {
			showToast({
				description: 'Failed to delete item. Please try again.',
				type: 'error',
			})
		}
	}

	return (
		<>
			<BoxLayout>
				<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
					Groups
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
						onOpenChange={(details) =>
							setIsDialogOpen(details.open)
						}
						motionPreset='slide-in-bottom'
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
										disabled={!groupValues}
									>
										Add groups
									</Button>
								</Flex>
							</DialogBody>
							<DialogCloseTrigger />
						</DialogContent>
					</DialogRoot>
				</Flex>
				<Stack flex={1}>
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
									<Table.ColumnHeader>
										Action
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
												<Table.Cell>
													<HStack>
														<Tooltip
															content='View detail'
															showArrow
															openDelay={100}
															closeDelay={100}
														>
															<Link
																to={`/groups/${item.id}`}
															>
																<Button
																	size='sm'
																	variant={
																		'outline'
																	}
																>
																	<FaList />
																</Button>
															</Link>
														</Tooltip>
														<Tooltip
															content='Delete'
															showArrow
															openDelay={100}
															closeDelay={100}
														>
															<Button
																size='sm'
																variant={
																	'outline'
																}
																color='red.500'
																onClick={() => {
																	setDeleteItemId(
																		item.id
																	)
																	setIsShowDeleteDialog(
																		true
																	)
																}}
															>
																<MdDelete />
															</Button>
														</Tooltip>
													</HStack>
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
			<DialogRoot
				role='alertdialog'
				open={isShowDeleteDialog}
				onOpenChange={(details) => setIsShowDeleteDialog(details.open)}
				motionPreset='slide-in-bottom'
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Are you want to delete this item?
						</DialogTitle>
					</DialogHeader>
					<DialogBody>
						<p>
							This action cannot be undone. The item will be
							permanently deleted from your system.
						</p>
					</DialogBody>
					<DialogFooter>
						<DialogActionTrigger asChild>
							<Button
								variant='outline'
								onClick={() => {
									setDeleteItemId(null)
								}}
							>
								Cancel
							</Button>
						</DialogActionTrigger>
						<Button colorPalette='red' onClick={handleDeleteItem}>
							Delete
						</Button>
					</DialogFooter>
					<DialogCloseTrigger />
				</DialogContent>
			</DialogRoot>
		</>
	)
}

export default Groups
