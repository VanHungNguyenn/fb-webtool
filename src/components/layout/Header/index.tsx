import { Box } from '@chakra-ui/react'
import AvatarDropdown from './components/AvatarDropdown'

const Header = () => {
	return (
		<Box
			py={4}
			px={6}
			bg='bgPrimary'
			display='flex'
			alignItems='center'
			justifyContent='end'
		>
			<AvatarDropdown />
		</Box>
	)
}

export default Header
