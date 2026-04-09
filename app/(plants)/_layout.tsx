import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack 
			screenOptions={{
				headerShown: true,
				contentStyle: { backgroundColor: '#a3b18a' }
			}}
		>
			<Stack.Screen 
				name='index'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen 
				name='[id]'
				options={{
					
				}}
			/>
		</Stack>
	);
}
