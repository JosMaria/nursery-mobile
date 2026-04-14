import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <MainLayout />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const MainLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <View style={{
          height: Platform.OS === 'android' ? insets.top : 0, 
          backgroundColor: '#3a5a40'
        }} 
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#dad7cd',
          tabBarStyle: {
            backgroundColor: '#3a5a40',
            height: Platform.OS === 'android' ? insets.bottom + 40 : 'auto'
          }
        }}
      >
        <Tabs.Screen
          name='(plants)'
          options={{
            headerShown: false,
            tabBarLabel: 'Plantas',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'leaf-sharp' : 'leaf-outline'} color={color} size={size} />
            )
          }}
        />
        <Tabs.Screen
          name='information'
          options={{
            tabBarLabel: 'Información',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='information-circle' color={color} size={size} />
            )
          }}
        />
      </Tabs>
    </View>
  );
}
