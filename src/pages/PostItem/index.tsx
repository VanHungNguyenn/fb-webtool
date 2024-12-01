import { getGroupInfo } from '@/api'
import PostPage from '@/components/custom/PostPage'
import { Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const PostItem = () => {
	const params = useParams<{ id: string }>()
	const [groupName, setGroupName] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchGroupInfo = async () => {
			try {
				const groupInfo = await getGroupInfo(params.id!)
				setGroupName(groupInfo?.data?.name)
			} catch (error) {
				console.error('Failed to fetch group info:', error)
			} finally {
				setLoading(false)
			}
		}

		if (params.id) {
			fetchGroupInfo()
		}
	}, [params.id])

	// Hiển thị spinner khi đang tải
	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<Spinner size='lg' />
			</div>
		)
	}

	// Nếu không lấy được thông tin nhóm
	if (!groupName) {
		return <div>Group not found</div>
	}

	return <PostPage groupId={params.id} groupName={groupName} />
}

export default PostItem
