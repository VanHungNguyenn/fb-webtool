import { Box, BoxProps } from '@chakra-ui/react'

interface BoxLayoutProps extends BoxProps {
	children: React.ReactNode
}

const BoxLayout = ({ children, ...props }: BoxLayoutProps) => {
	return (
		<Box bg='bg' p={4} borderRadius='xl' {...props}>
			{children}
		</Box>
	)
}

export default BoxLayout
