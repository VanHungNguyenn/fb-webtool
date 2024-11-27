import { TOKEN_KEY } from '@/constants'

const AuthStorage = {
	getToken: () => {
		const storage = localStorage.getItem(TOKEN_KEY)

		return storage || ''
	},
	setToken: (token: string) => {
		localStorage.setItem(TOKEN_KEY, token)
	},
	removeToken: () => {
		localStorage.removeItem(TOKEN_KEY)
	},
}

export default AuthStorage
