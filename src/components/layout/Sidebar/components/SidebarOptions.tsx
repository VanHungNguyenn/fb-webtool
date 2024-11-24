import navigationConfig from '@/configs/NavigationConfig'
import { Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SidebarButton from './SidebarButton'

const SidebarOptions = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const location = useLocation()

	useEffect(() => {
		const activeNav = navigationConfig.findIndex(
			(nav) => nav.path === location.pathname
		)
		if (activeNav !== -1) setActiveIndex(activeNav)
	}, [location.pathname])

	return (
		<Stack>
			{navigationConfig.map((nav, index) => (
				<SidebarButton
					key={index}
					index={index}
					nav={nav}
					active={activeIndex === index}
					setActiveIndex={setActiveIndex}
				/>
			))}
		</Stack>
	)
}

export default SidebarOptions
