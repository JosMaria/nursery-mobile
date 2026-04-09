import 'react-native-reanimated';

import { Tabs } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#dad7cd',
          tabBarStyle: {
            backgroundColor: '#344e41',
            height: 60,
            paddingBottom: 60,
            paddingTop: 5
          },
          sceneStyle: {
            padding: 4,
            backgroundColor: '#a3b18a'
          }
        }}
        >
          <Tabs.Screen
            name='(plants)'
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'leaf-sharp' : 'leaf-outline'} color={color} size={size} />
              )
            }}
          />
          <Tabs.Screen
            name='information'
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name='information-circle' color={color} size={size} />
              )
            }}
          />
      </Tabs>
    </QueryClientProvider>
  );
}
