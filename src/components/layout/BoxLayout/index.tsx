import { Stack, StackProps } from '@chakra-ui/react'

interface BoxLayoutProps extends StackProps {
	children: React.ReactNode
}

const BoxLayout = ({ children, ...props }: BoxLayoutProps) => {
	return (
		<Stack flex={1} bg='bg' p={4} borderRadius='xl' {...props}>
			{children}
		</Stack>
	)
}

export default BoxLayout
