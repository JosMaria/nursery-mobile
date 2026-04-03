import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarStyle: {
          backgroundColor: '#132a13',
          height: 55 + (Platform.OS === 'android' ? insets.bottom : 0),
          paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
          paddingTop: 4
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Plantas',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="leaf" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Informacion',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="information-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
