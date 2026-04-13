import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { catalogService } from '@/services/catalog';
import { useQuery } from '@tanstack/react-query';

const defaultImagePath: string = '@/assets/images/default_image.png';

export default function PlantLayout() {
	const { id } = useLocalSearchParams();
	const plantId = obtainPlantId(id);
	const [activedUriImage, setActivedUriImage] = useState<string | undefined>();

	const { data: plantDetails, isPending, error, isSuccess } = useQuery({
		queryKey: ['plantDetails'],
		queryFn: () => catalogService.fetchPlantDetailsById(plantId)
	});

	const changeUriImage = (uriImage: string) => {
		setActivedUriImage(uriImage);
	}

	useEffect(() => {
		const limit = plantDetails?.images_info.length;
		if (limit && limit > 0) {
			const elementSelected = Math.floor(Math.random() * limit);
			const { filename } = plantDetails.images_info[elementSelected];
			const uri = `http://192.168.100.57:8080/api/v1/plants/${plantId}/images?image_name=${filename}`;
			changeUriImage(uri);
		}
	}, [isSuccess]);

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
				style={{ maxWidth: 60 }}
				keyExtractor={(imageInfo) => imageInfo.filename} 
				contentContainerStyle={{
					justifyContent: 'center',					
					gap: 5,
					height: '100%',
				}}
				renderItem={({ item: image_info }) => (
					<SmallImage plantId={plantId} filename={image_info.filename} changeUriImage={changeUriImage} activedUri={activedUriImage} />
				)}
			/>
			<Image 
				source={activedUriImage ? { uri: activedUriImage } : require(defaultImagePath)}
				defaultSource={require(defaultImagePath)}
				style={{
					flex: 1,
					height: 'auto',
					borderRadius: 10,
					borderColor: '#344e41',
					borderWidth: 4
				}}
				resizeMode='stretch'
			/>
		</View>
	);
}

interface SmallImageProps {
	plantId: number;
	filename: string;
	changeUriImage: (uri: string) => void;
	activedUri: string | undefined;
}

const SmallImage: React.FC<SmallImageProps> = ({ plantId, filename, changeUriImage, activedUri }) => {
	const uri = `http://192.168.100.57:8080/api/v1/plants/${plantId}/images?image_name=${filename}`;
	return (
		<TouchableOpacity onPress={() => changeUriImage(uri)}
			style={{ height: 60 }}>
			<Image 
				source={{ uri }}
				defaultSource={require(defaultImagePath)}
				style={[{ height: '100%' }, activedUri === uri && {
					opacity: 0.8,
					borderRadius: 1,
					borderColor: '#344e41',
					borderWidth: 3
				}]}
				resizeMode='stretch'
			/>
		</TouchableOpacity>
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
		height: 300
	}
});
