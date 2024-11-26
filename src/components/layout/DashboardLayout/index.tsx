import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'

const DashboardLayout = () => {
	const [isShowSidebar, setIsShowSidebar] = useState(true)
	console.log(isShowSidebar)

	return (
		<Box h='100vh' display='flex'>
			<Sidebar isShowSidebar={isShowSidebar} />
			<Box flex={1} display='flex' flexDirection='column'>
				<Header setIsShowSidebar={setIsShowSidebar} />
				<Box p={4} flex={1} overflowY='auto' bg='bgPrimary'>
					<Outlet />
				</Box>
			</Box>
		</Box>
	)
}

export default DashboardLayout
