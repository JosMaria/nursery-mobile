import { useLocalSearchParams } from 'expo-router';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { catalogService } from '@/services/catalog';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const { width: windowWidth } = Dimensions.get('screen')

export default function PlantLayout() {
	const { id } = useLocalSearchParams();
	const plantId = obtainPlantId(id);
	const [activeIndex, setActiveIndex] = useState(0);
	const { data: plantDetails, isPending, error } = useQuery({
		queryKey: ['plantDetails'],
		queryFn: () => catalogService.fetchPlantDetailsById(plantId)
	});

	if (isPending) return (
		<Text>Pending...</Text>
	);

	if (error) return (
		<Text>error load Plant layout</Text>
	);

	return (
		<View style={styles.containerImage}>
			<FlatList 
				data={plantDetails.images_info}
				style={{ backgroundColor: 'pink', flex: 1 }}
				keyExtractor={(imageInfo) => imageInfo.filename} 
				contentContainerStyle={{ gap: 5 }}
				renderItem={({ item: image_info }) => (
					<Image 
						source={{ uri: `http://192.168.100.57:8080/api/v1/plants/${plantId}/images?image_name=${image_info.filename}`}}
						style={styles.image}
						resizeMode='stretch'
					/>
				)}
			/>
			<Image 
				source={{ uri: `http://192.168.100.57:8080/api/v1/plants/${plantId}/images?image_name=1d7ba99e-e7ae-4b13-8a3c-803ecd24c15a.png` }}
				style={{ flex: 4 }}
			/>
		</View>
	);
}

function obtainPlantId(id: string | string[]) {
	const plantId = Array.isArray(id) ? id[0] : id;
	return Number.parseInt(plantId);
}

const styles = StyleSheet.create({
	containerImage: {
		height: 250,
		display: 'flex',
		flexDirection: 'row',
		gap: 10
	},
	image: {
		height: 55,
		borderColor: '#344e41',
		borderWidth: 2
	}
});