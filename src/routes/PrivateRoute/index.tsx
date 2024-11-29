import { useAppSelector } from '@/lib/hooks'
import { selectUserIsLoggedIn } from '@/store/slices/authSlice'
import { Navigate } from 'react-router'
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const isLoggedIn = useAppSelector(selectUserIsLoggedIn)

	if (!isLoggedIn) {
		return <Navigate to='/sign-in' replace />
	}

	// Nếu đã đăng nhập, hiển thị nội dung con
	return <>{children}</>
}

export default PrivateRoute
