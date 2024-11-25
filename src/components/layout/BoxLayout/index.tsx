import { Box } from '@chakra-ui/react'

interface BoxLayoutProps {
	children: React.ReactNode
}

const BoxLayout = ({ children }: BoxLayoutProps) => {
	return (
		<Box bg='bg' p={4} borderRadius={'xl'}>
			{children}
		</Box>
	)
}

export default BoxLayout
