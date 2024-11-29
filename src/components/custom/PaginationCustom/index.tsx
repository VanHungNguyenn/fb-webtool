import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from '@/components/ui/pagination'
import { HStack } from '@chakra-ui/react'

interface PaginationProps {
	totalItems: number
	pageSize: number
	currentPage: number
	onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	totalItems,
	pageSize,
	currentPage,
	onPageChange,
}) => {
	return (
		<PaginationRoot
			count={totalItems}
			pageSize={pageSize}
			page={currentPage}
			onPageChange={(e) => onPageChange(e.page)}
			alignSelf='flex-end'
		>
			<HStack wrap='wrap'>
				<PaginationPrevTrigger />
				<PaginationItems />
				<PaginationNextTrigger />
			</HStack>
		</PaginationRoot>
	)
}

export default Pagination
