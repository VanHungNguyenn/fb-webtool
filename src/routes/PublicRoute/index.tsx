import { useAppSelector } from '@/lib/hooks'
import { selectUserIsLoggedIn } from '@/store/slices/authSlice'
import { Navigate } from 'react-router'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
	const isLoggedIn = useAppSelector(selectUserIsLoggedIn)

	if (isLoggedIn) {
		return <Navigate to='/' replace />
	}

	return <>{children}</>
}

export default PublicRoute
