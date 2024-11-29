import { useAppSelector } from '@/lib/hooks'
import { selectUser, selectUserIsLoggedIn } from '@/store/slices/authSlice'
import { Navigate } from 'react-router'

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
	const isLoggedIn = useAppSelector(selectUserIsLoggedIn)
	const user = useAppSelector(selectUser)
	const isAdmin = user?.is_superuser

	console.log({ isLoggedIn, user, isAdmin })

	return isLoggedIn && isAdmin ? <>{children}</> : <Navigate to='/' replace />
}

export default AdminRoute
