import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'

const DashboardLayout = () => {
	const [isShowSidebar, setIsShowSidebar] = useState(true)

	return (
		<Box h='100vh' display='flex' maxH='100vh' overflow='hidden'>
			<Sidebar isShowSidebar={isShowSidebar} />
			<Box
				flex={1}
				display='flex'
				flexDirection='column'
				overflowY='auto'
			>
				<Header setIsShowSidebar={setIsShowSidebar} />
				<Flex p={4} flex={1} bg='bgPrimary'>
					<Outlet />
				</Flex>
			</Box>
		</Box>
	)
}

export default DashboardLayout
