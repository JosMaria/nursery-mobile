import { Stack } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout() {
	return (
		<Stack 
			screenOptions={{
				headerShown: true,
				headerTitleAlign: 'center',
				contentStyle: { backgroundColor: '#a3b18a' }
			}}
		>
			<Stack.Screen 
				name='index'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='[id]'
				options={{
					title: 'Detalles',
					header: ({ navigation, options }) => (
						<View style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingVertical: 14,
							paddingHorizontal: 5,
							backgroundColor: '#344e41'
						}}>
							<TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('index')}>
								<Ionicons name='chevron-back-outline' size={20} color='#dad7cd' />
							</TouchableOpacity>
							<Text style={{ color: '#dad7cd', fontSize: 20 }}>{options.title}</Text>
							<View style={{ width: 22 }}  />
						</View>
					)
				}}
			/>
		</Stack>
	);
}
