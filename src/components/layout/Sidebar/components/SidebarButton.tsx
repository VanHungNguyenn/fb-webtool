import { NavTreeItem } from '@/configs/NavigationConfig'
import { HStack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface SidebarButtonProps {
	active: boolean
	nav: NavTreeItem
	index: number
	setActiveIndex: (index: number) => void
}

const SidebarButton = ({
	active,
	nav,
	index,
	setActiveIndex,
}: SidebarButtonProps) => {
	const navigate = useNavigate()

	return (
		<HStack
			px={3}
			py={2}
			mx={2}
			alignItems='center'
			color='colorPalette'
			background={active ? 'colorPalette.400' : 'bg'}
			gap={4}
			cursor='pointer'
			borderRadius='md'
			_hover={!active ? { bg: 'colorPalette.subtle' } : undefined}
			onClick={() => {
				navigate(nav.path)
				setActiveIndex(index)
			}}
		>
			{nav.icon}
			<Text fontWeight={600}>{nav.title}</Text>
		</HStack>
	)
}

export default SidebarButton
