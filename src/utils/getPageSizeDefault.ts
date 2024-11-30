export const getPageSizeDefault = () => {
	const pageSize = localStorage.getItem('size')

	if (pageSize) {
		return Number(pageSize)
	}

	return 10
}
