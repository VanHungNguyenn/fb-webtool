import { BiDollar, BiGroup, BiWallet } from 'react-icons/bi'
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
import Recharge from '@/pages/Recharge'
import Settings from '@/pages/Settings'

export const APP_PREFIX_PATH = ''

export interface NavTreeItem {
	key: string
	path: string
	title: string
	icon: JSX.Element
	element: React.ReactNode
}

const appsNavTree: NavTreeItem[] = [
	{
		key: 'home',
		path: `${APP_PREFIX_PATH}/`,
		title: 'Home',
		icon: <HiHome />,
		element: <Home />,
	},
	{
		key: 'pricing',
		path: `${APP_PREFIX_PATH}/pricing`,
		title: 'Pricing',
		icon: <BiDollar />,
		element: <Pricing />,
	},
	{
		key: 'groups',
		path: `${APP_PREFIX_PATH}/groups`,
		title: 'Groups',
		icon: <BiGroup />,
		element: <Groups />,
	},
	{
		key: 'Posts',
		path: `${APP_PREFIX_PATH}/posts`,
		title: 'Posts',
		icon: <GrArticle />,
		element: <Posts />,
	},
	{
		key: 'recharge',
		path: `${APP_PREFIX_PATH}/recharge`,
		title: 'Wallet Recharge',
		icon: <BiWallet />,
		element: <Recharge />,
	},
	{
		key: 'accounts',
		path: `${APP_PREFIX_PATH}/accounts`,
		title: 'Accounts',
		icon: <MdOutlineSupervisorAccount />,
		element: <Accounts />,
	},
	{
		key: 'settings',
		path: `${APP_PREFIX_PATH}/settings`,
		title: 'Settings',
		icon: <MdSettings />,
		element: <Settings />,
	},
	{
		key: 'helps',
		path: `${APP_PREFIX_PATH}/help`,
		title: 'Help',
		icon: <MdOutlineLiveHelp />,
		element: <Help />,
	},
]

const navigationConfig = [...appsNavTree]

export default navigationConfig
