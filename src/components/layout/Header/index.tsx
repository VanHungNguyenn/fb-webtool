import { CloseButton } from '@/components/ui/close-button'
import { Box } from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa'
import AvatarDropdown from './components/AvatarDropdown'

interface HeaderProps {
	setIsShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ setIsShowSidebar }: HeaderProps) => {
	return (
		<Box
			py={4}
			px={6}
			bg='bgPrimary'
			display='flex'
			alignItems='center'
			justifyContent='space-between'
		>
			<CloseButton onClick={() => setIsShowSidebar((prev) => !prev)}>
				<FaBars />
			</CloseButton>
			<AvatarDropdown />
		</Box>
	)
}

export default Header
