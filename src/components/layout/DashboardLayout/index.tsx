import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'

const DashboardLayout = () => {
	return (
		<Box h='100vh' display='flex'>
			<Sidebar />
			<Box flex={1} display='flex' flexDirection='column'>
				<Header />
				<Box p={4} flex={1} overflowY='auto' bg='bgPrimary'>
					<Outlet />
				</Box>
			</Box>
		</Box>
	)
}

export default DashboardLayout
