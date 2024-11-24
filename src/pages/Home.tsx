import {
	StatHelpText,
	StatLabel,
	StatRoot,
	StatUpTrend,
	StatValueText,
} from '@/components/ui/stat'
import { Box, Grid, HStack } from '@chakra-ui/react'

const Home = () => {
	return (
		<Grid
			templateColumns={{
				base: 'repeat(1, 1fr)',
				md: 'repeat(2, 1fr)',
				lg: 'repeat(4, 1fr)',
			}}
			gap='6'
		>
			<Box p={5} bg='bg' borderRadius={'xl'}>
				<StatRoot>
					<StatLabel>Unique </StatLabel>
					<HStack>
						<StatValueText
							value={8456.4}
							formatOptions={{
								style: 'currency',
								currency: 'USD',
							}}
						/>
						<StatUpTrend>12%</StatUpTrend>
					</HStack>
					<StatHelpText>since last month</StatHelpText>
				</StatRoot>
			</Box>
			<Box p={5} bg='bg' borderRadius={'xl'}>
				<StatRoot>
					<StatLabel>Unique </StatLabel>
					<HStack>
						<StatValueText
							value={8456.4}
							formatOptions={{
								style: 'currency',
								currency: 'USD',
							}}
						/>
						<StatUpTrend>12%</StatUpTrend>
					</HStack>
					<StatHelpText>since last month</StatHelpText>
				</StatRoot>
			</Box>
			<Box p={5} bg='bg' borderRadius={'xl'}>
				<StatRoot>
					<StatLabel>Unique </StatLabel>
					<HStack>
						<StatValueText
							value={8456.4}
							formatOptions={{
								style: 'currency',
								currency: 'USD',
							}}
						/>
						<StatUpTrend>12%</StatUpTrend>
					</HStack>
					<StatHelpText>since last month</StatHelpText>
				</StatRoot>
			</Box>
			<Box p={5} bg='bg' borderRadius={'xl'}>
				<StatRoot>
					<StatLabel>Unique </StatLabel>
					<HStack>
						<StatValueText
							value={8456.4}
							formatOptions={{
								style: 'currency',
								currency: 'USD',
							}}
						/>
						<StatUpTrend>12%</StatUpTrend>
					</HStack>
					<StatHelpText>since last month</StatHelpText>
				</StatRoot>
			</Box>
		</Grid>
	)
}

export default Home