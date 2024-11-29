import { BiDollar, BiGroup } from 'react-icons/bi'
import { GrArticle } from 'react-icons/gr'
import { HiHome } from 'react-icons/hi'
import {
	MdOutlineLiveHelp,
	MdOutlineSupervisorAccount,
	MdSettings,
} from 'react-icons/md'

import Accounts from '@/pages/Accounts'
import Groups from '@/pages/Groups'
import Help from '@/pages/Help'
import Home from '@/pages/Home'
import Posts from '@/pages/Posts'
import Pricing from '@/pages/Pricing'
import Settings from '@/pages/Settings'
import Users from '@/pages/Users'

export const APP_PREFIX_PATH = ''

export interface NavTreeItem {
	key: string
	path: string
	title: string
	icon: JSX.Element
	element: React.ReactNode
	isAdmin: boolean
}

const appsNavTree: NavTreeItem[] = [
	{
		key: 'home',
		path: `${APP_PREFIX_PATH}/`,
		title: 'Home',
		icon: <HiHome />,
		element: <Home />,
		isAdmin: false,
	},
	{
		key: 'pricing',
		path: `${APP_PREFIX_PATH}/pricing`,
		title: 'Pricing',
		icon: <BiDollar />,
		element: <Pricing />,
		isAdmin: false,
	},
	{
		key: 'groups',
		path: `${APP_PREFIX_PATH}/groups`,
		title: 'Groups',
		icon: <BiGroup />,
		element: <Groups />,
		isAdmin: false,
	},
	{
		key: 'Posts',
		path: `${APP_PREFIX_PATH}/posts`,
		title: 'Posts',
		icon: <GrArticle />,
		element: <Posts />,
		isAdmin: false,
	},
	{
		key: 'accounts',
		path: `${APP_PREFIX_PATH}/accounts`,
		title: 'Accounts',
		icon: <MdOutlineSupervisorAccount />,
		element: <Accounts />,
		isAdmin: true,
	},
	{
		key: 'users',
		path: `${APP_PREFIX_PATH}/users`,
		title: 'Users',
		icon: <MdOutlineSupervisorAccount />,
		element: <Users />,
		isAdmin: true,
	},
	{
		key: 'settings',
		path: `${APP_PREFIX_PATH}/settings`,
		title: 'Settings',
		icon: <MdSettings />,
		element: <Settings />,
		isAdmin: false,
	},
	{
		key: 'helps',
		path: `${APP_PREFIX_PATH}/help`,
		title: 'Help',
		icon: <MdOutlineLiveHelp />,
		element: <Help />,
		isAdmin: false,
	},
]

const navigationConfig = [...appsNavTree]

export default navigationConfig
