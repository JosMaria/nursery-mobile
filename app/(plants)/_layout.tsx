import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack 
			screenOptions={{
				headerShown: true,
				headerTintColor: 'white',
				headerTitleAlign: 'center',
				headerStyle: { backgroundColor: '#344e41' },
				contentStyle: { backgroundColor: '#a3b18a', padding: 8 }
			}}
		>
			<Stack.Screen 
				name='index'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='[id]'
				options={{
					title: 'Detalles'
				}}
			/>
		</Stack>
	);
}
