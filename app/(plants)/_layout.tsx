import { Stack } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout() {
	return (
		<Stack 
			screenOptions={{
				headerShown: true,
				headerTitleAlign: 'center',
				contentStyle: { backgroundColor: Colors.green.light }
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
							backgroundColor: Colors.green.darker
						}}>
							<TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('index')}>
								<Ionicons name='chevron-back-outline' size={20} color={Colors.green.lighter} />
							</TouchableOpacity>
							<Text style={{ color: Colors.green.lighter, fontSize: 20, }}>{options.title}</Text>
							<View style={{ width: 22 }}  />
						</View>
					)
				}}
			/>
		</Stack>
	);
}
