import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from '@/components/ui/pagination'
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from '@/components/ui/select'
import { Box, createListCollection, HStack, Text } from '@chakra-ui/react'
import { useState } from 'react'

interface PaginationProps {
	totalItems: number
	pageSize: number
	currentPage: number
	onPageChange: (page: number) => void
	setPageSize: (pageSize: number) => void
}

const listPagesize = createListCollection({
	items: [
		{ label: '10', value: '10' },
		{ label: '20', value: '20' },
		{ label: '50', value: '50' },
	],
})

const Pagination: React.FC<PaginationProps> = ({
	totalItems,
	pageSize,
	currentPage,
	onPageChange,
	setPageSize,
}) => {
	const [value, setValue] = useState<string[]>([pageSize.toString()])

	return (
		<PaginationRoot
			count={totalItems}
			pageSize={pageSize}
			page={currentPage}
			onPageChange={(e) => {
				onPageChange(e.page)
			}}
			alignSelf='flex-end'
			size='sm'
			variant='solid'
		>
			<HStack wrap='wrap'>
				<PaginationPrevTrigger />
				<PaginationItems />
				<PaginationNextTrigger />
				<Box>
					<SelectRoot
						size='sm'
						width='70px'
						value={value}
						onValueChange={(e) => {
							setValue(e.value)
							setPageSize(Number(e.value))
							localStorage.setItem('size', e.value.toString())
						}}
						collection={listPagesize}
						positioning={{ placement: 'top' }}
					>
						<SelectTrigger>
							<SelectValueText placeholder='' />
						</SelectTrigger>
						<SelectContent>
							{listPagesize.items.map((item, index) => (
								<SelectItem key={index} item={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</SelectRoot>
				</Box>
				<Text>/page</Text>
			</HStack>
		</PaginationRoot>
	)
}

export default Pagination
