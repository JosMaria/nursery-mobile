import { ActivityIndicator, Text, View } from 'react-native';

export const Loading = () => (
  <View style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 10 }}>
    <ActivityIndicator color='#344e41' size={'large'} />
    <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'semibold' }}>
      Cargando...
    </Text>
  </View>
);
