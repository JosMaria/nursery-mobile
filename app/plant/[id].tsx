import { router, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function PlantDetailsView() {
    const { id } = useLocalSearchParams();
    
    return (
        <View>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Volver</Text>
            </TouchableOpacity>
            <Text style={{backgroundColor: 'white'}}>Detalle de la planta</Text>
            <Text style={{backgroundColor: 'white'}}>ID: {id}</Text>
        </View>
    );
}
