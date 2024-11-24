import { Box, Stack } from '@chakra-ui/react'
import SidebarOptions from './components/SidebarOptions'

const Sidebar = () => {
	return (
		<Box
			w={250}
			h='100vh'
			overflowY='auto'
			shadow='4px 0 4px 0 rgba(0, 0, 0, .3)'
			position='relative'
			flexShrink={0}
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
