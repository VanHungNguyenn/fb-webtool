export function transformToFacebookPostUrl(data: string | null) {
	if (!data || !data.includes('_')) {
		return data || ''
	}

	const [groupId, postId] = data.split('_')
	return `https://www.facebook.com/groups/${groupId}/posts/${postId}/`
}
