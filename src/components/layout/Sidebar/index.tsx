import { Box, Stack } from '@chakra-ui/react'
import SidebarOptions from './components/SidebarOptions'

interface SidebarProps {
	isShowSidebar: boolean
}

const Sidebar = ({ isShowSidebar }: SidebarProps) => {
	return (
		<Box
			w={isShowSidebar ? 250 : 0}
			h='100vh'
			overflowY='auto'
			shadow={isShowSidebar ? '4px 0 4px 0 rgba(0, 0, 0, .3)' : 'none'}
			position='relative'
			flexShrink={0}
			transition='width 0.3s ease'
			css={{
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				msOverflowStyle: 'none',
				scrollbarWidth: 'none',
			}}
		>
			<Stack>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					py={10}
				>
					<img src='/logo.svg' alt='avatar' width='80%' />
				</Box>
				<SidebarOptions />
			</Stack>
		</Box>
	)
}

export default Sidebar
