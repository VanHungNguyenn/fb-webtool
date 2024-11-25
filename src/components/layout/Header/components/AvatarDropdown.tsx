import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from '@/components/ui/menu'
import { Box, HStack, Separator, Stack, Text } from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const AvatarDropdown = () => {
	return (
		<MenuRoot>
			<MenuTrigger asChild>
				<Button variant='ghost' outline={'none'} bg='transparent'>
					<Avatar name='Jason Statham' />
				</Button>
			</MenuTrigger>
			<MenuContent>
				<MenuItem value='infor'>
					<HStack gap={3}>
						<Avatar size='sm' name='Jason Statham' />
						<Stack gap={0}>
							<Text fontSize='sm'>Jason Statham</Text>
							<Text fontSize='sm' color='fg.muted'>
								jason@example.com
							</Text>
						</Stack>
					</HStack>
				</MenuItem>
				<Separator />
				<MenuItem
					asChild
					value='settings'
					p={2}
					gap={3}
					cursor='pointer'
				>
					<Link to='/settings'>
						<FiSettings />
						<Box flex='1'>Settings</Box>
					</Link>
				</MenuItem>
				<MenuItem
					px={2}
					value='delete'
					color='fg.error'
					_hover={{ bg: 'bg.error', color: 'fg.error' }}
					gap={3}
					cursor='pointer'
				>
					<BiLogOut />
					<Box flex='1'>Logout</Box>
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	)
}

export default AvatarDropdown
