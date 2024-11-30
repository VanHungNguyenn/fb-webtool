import DashboardLayout from '@/components/layout/DashboardLayout'
import ForgotPassword from '@/pages/ForgotPassword'
import Page404 from '@/pages/Page404'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import AdminRoute from '@/routes/AdminRoute'
import PrivateRoute from '@/routes/PrivateRoute'
import PublicRoute from '@/routes/PublicRoute'
import { createBrowserRouter } from 'react-router-dom'
import navigationConfig, { NavTreeItem } from './NavigationConfig'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
		children: navigationConfig.map((navItem: NavTreeItem) => ({
			path: navItem.path,
			element: navItem.isAdmin ? (
				<AdminRoute>{navItem.element}</AdminRoute>
			) : (
				navItem.element
			),
			index: navItem.key === 'home',
		})),
	},
	{
		path: '/sign-in',
		element: (
			<PublicRoute>
				<SignIn />
			</PublicRoute>
		),
	},
	{
		path: '/sign-up',
		element: (
			<PublicRoute>
				<SignUp />
			</PublicRoute>
		),
	},
	{
		path: 'forgot-password',
		element: (
			<PublicRoute>
				<ForgotPassword />
			</PublicRoute>
		),
	},
	{
		path: '*',
		element: <Page404 />,
	},
])
