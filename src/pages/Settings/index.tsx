import BoxLayout from '@/components/layout/BoxLayout'
import { Heading, Tabs } from '@chakra-ui/react'
import { LuCheckSquare, LuFolder, LuUser } from 'react-icons/lu'
import GeneralSetting from './components/GeneralSetting'

const Settings = () => {
	return (
		<BoxLayout>
			<Heading as='h3' fontSize='2xl' fontWeight='bold' pb={7}>
				Settings
			</Heading>
			<Tabs.Root defaultValue='general'>
				<Tabs.List>
					<Tabs.Trigger value='general'>
						<LuCheckSquare />
						General
					</Tabs.Trigger>
					<Tabs.Trigger value='plan'>
						<LuFolder />
						Plan
					</Tabs.Trigger>
					<Tabs.Trigger value='profile'>
						<LuUser />
						Profile
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value='general'>
					<GeneralSetting />
				</Tabs.Content>
				<Tabs.Content value='plan'>Manage your projects</Tabs.Content>
				<Tabs.Content value='profile'>
					Manage your tasks for freelancers
				</Tabs.Content>
			</Tabs.Root>
		</BoxLayout>
	)
}

export default Settings