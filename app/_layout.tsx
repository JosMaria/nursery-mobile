import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TabNavigator />    
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

function TabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'android' ? insets.bottom : 0;
  console.log(bottomPadding);
 
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#dad7cd',
        tabBarStyle: {
          backgroundColor: '#344e41',
          height: 50 + bottomPadding
        },
        sceneStyle: {
          backgroundColor: '#a3b18a'
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
  );
}
