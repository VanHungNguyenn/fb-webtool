import DashboardLayout from '@/components/layout/DashboardLayout'
import ForgotPassword from '@/pages/ForgotPassword'
import Page404 from '@/pages/Page404'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import { createBrowserRouter } from 'react-router-dom'
import navigationConfig, { NavTreeItem } from './NavigationConfig'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <DashboardLayout />,
		children: navigationConfig.map((navItem: NavTreeItem) => ({
			path: navItem.path,
			element: navItem.element,
			index: navItem.key === 'home',
		})),
	},
	{
		path: '/sign-in',
		element: <SignIn />,
	},
	{
		path: '/sign-up',
		element: <SignUp />,
	},
	{
		path: 'forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: '*',
		element: <Page404 />,
	},
])
