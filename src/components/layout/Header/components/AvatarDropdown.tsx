import { postLogout } from '@/api'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from '@/components/ui/menu'
import useToast from '@/hooks/useToast'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { authActions, selectEmail } from '@/store/slices/authSlice'
import { handleAxiosError } from '@/utils/AxiosErrorHandler'
import { Box, HStack, Separator, Stack, Text } from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

const AvatarDropdown = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { showToast } = useToast()

	const email = useAppSelector(selectEmail)

	const handleLogout = async () => {
		try {
			const response = await postLogout()

			if (response.status === 204) {
				dispatch(authActions.logout())
				navigate('/sign-in')
			} else {
				showToast({
					description:
						response?.data?.message || 'Something went wrong',
					type: 'error',
				})
			}
		} catch (error: unknown) {
			handleAxiosError(error)
		}
	}

	return (
		<MenuRoot>
			<MenuTrigger asChild>
				<Button variant='ghost' outline={'none'} bg='transparent'>
					<Avatar name={email} />
				</Button>
			</MenuTrigger>
			<MenuContent>
				<MenuItem value='infor'>
					<HStack gap={3}>
						<Avatar size='sm' name={email} />
						<Stack gap={0}>
							<Text fontSize='sm' color='fg.muted'>
								{email}
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
					onClick={handleLogout}
				>
					<BiLogOut />
					<Box flex='1'>Logout</Box>
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	)
}

export default AvatarDropdown
