import { useLocalSearchParams } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { catalogService } from '@/services/catalog';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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
				style={styles.containerSmallImages}
				keyExtractor={(imageInfo) => imageInfo.filename} 
				contentContainerStyle={{
					flex: 1,
					display: 'flex',
					justifyContent: 'center', 
					gap: 5
				}}
				scrollEnabled
				renderItem={({ item: image_info }) => (
					<Image 
						source={{ uri: `http://192.168.100.57:8080/api/v1/plants/${plantId}/images?image_name=${image_info.filename}` }}
						defaultSource={require('@/assets/images/default_image.png')}
						style={styles.smallImage}
						resizeMode='stretch'
					/>
				)}
			/>
			<Image 
				source={{ uri: `http://192.168.100.57:8080/api/v1/plants/${plantId}/images?image_name=1d7ba99e-e7ae-4b13-8a3c-803ecd24c15a.png` }}
				defaultSource={require('@/assets/images/default_image.png')}
				style={styles.mainImage}
				resizeMode='stretch'
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
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		height: 300,
		backgroundColor: 'white'
	},
	containerSmallImages: {
		minWidth: 55
	},
	smallImage: {
		width: 'auto',
		height: 55,
		borderRadius: 1,
		borderColor: '#344e41',
		borderWidth: 2
	},
	mainImage: {
		flex: 4,
		height: 'auto',
		borderRadius: 10,
		borderColor: '#344e41',
		borderWidth: 4
	}
});
