import 'react-native-reanimated';

import { Tabs } from 'expo-router';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#a3b18a',
          tabBarInactiveTintColor: '#dad7cd',
          tabBarStyle: {
            backgroundColor: '#344e41',
            height: 60,
            paddingBottom: 60,
            paddingTop: 5
          }      
        }}
        >
          <Tabs.Screen
            name='index'
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name='leaf' color={color} size={size} />
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
