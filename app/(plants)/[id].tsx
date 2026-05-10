import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

import { Loading } from '@/components/Loading';
import { Colors } from '@/constants/theme';
import { axiosInstance } from '@/services/api';
import { catalogService } from '@/services/catalog';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useQuery } from '@tanstack/react-query';

const defaultImagePath: string = '@/assets/images/default_image.png';

const parsedPlantId = (id: string | string[]) => {
	const plantId = Array.isArray(id) ? id[0] : id;
	return Number.parseInt(plantId);
}

const obtainUri = (plantId: number, imageId: number) => `${axiosInstance.defaults.baseURL}/plants/${plantId}/images/${imageId}`;

const INVALID_IMAGE_ID = 0;

export default function PlantLayout() {
	const { id } = useLocalSearchParams();
	const plantId = parsedPlantId(id);
	
	const [selectedImageId, setSelectedImageId] = useState(INVALID_IMAGE_ID);

	const { data: plantDetails, isPending, error, isSuccess } = useQuery({
		queryKey: ['plantDetails', plantId],
		queryFn: () => catalogService.getPlantDetailsById(plantId),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (isSuccess) {
			const firstImageId = plantDetails.image_ids.length === 0
				? INVALID_IMAGE_ID 
				: plantDetails.image_ids[0];
			setSelectedImageId(firstImageId);
		}
	}, [isSuccess]);
	
	if (isPending) return <Loading />

	if (error) return (
		<View style={{}}>
			<ActivityIndicator color={Colors.green.darker} />
			<Text>error load Plant layout</Text>
		</View>
	);

	return (
		<View style={{ gap: 5, padding: 8 }}>
			<View style={styles.containerImage}>
				<FlatList 
					data={plantDetails.image_ids}
					style={{ maxWidth: 60 }}
					keyExtractor={image_id => image_id.toString()} 
					contentContainerStyle={{
						justifyContent: 'center',
						gap: 5,
						height: '100%',
					}}
					renderItem={({ item: imageId }) => (
						<SmallImage
							plantId={plantId}
							imageId={imageId}
							changeImage={() => setSelectedImageId(imageId)}
							isActive={selectedImageId === imageId}
						/>
					)}
				/>
				<MainImage plantId={plantId} imageId={selectedImageId} />
			</View>
			<View style={{ backgroundColor: 'white' }}>
				<SectionDate updatedAt={plantDetails.updated_at} />
			</View>
		</View>
	);
}

interface MainImageProps {
	plantId: number;
	imageId: number;
}

const MainImage = ({ plantId, imageId }: MainImageProps) => (
	<Image
		source={imageId ? { uri: obtainUri(plantId, imageId) } : require(defaultImagePath)}
		defaultSource={require(defaultImagePath)}
		resizeMode='stretch'
		style={mainImageStyle.image}
	/>
);

const mainImageStyle = StyleSheet.create({
	image: {
		flex: 1,
		height: 'auto',
		borderRadius: 4,
		borderColor: Colors.green.darker,
		borderWidth: 4,
	} 
});

interface SectionDateProps {
	updatedAt: string;
}

const SectionDate: React.FC<SectionDateProps> = ({ updatedAt }) => {
	const date = new Date(updatedAt);
	return (
		<View style={{ gap: 4 }}>
			<Text style={{ fontSize: 13, fontStyle: 'italic', color: 'gray' }}>Última actualización</Text>
			<View style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				gap: 8
			}}>
				<View style={{ 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					backgroundColor: Colors.green.lighter, 
					width: 40, 
					height: 40, 
					borderRadius: '50%'
				}}>
					<FontAwesome5 name='calendar-alt' color='black' size={24} />
				</View>
				<View style={{ flexDirection: 'column' }}>
					<Text>{date.getDate().toString().padStart(2, '0')} {date.toLocaleString('es', { month: 'short' })}, {date.getFullYear()}</Text>
					<Text>{date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</Text>
				</View>
			</View>
		</View>
	);
}

interface SmallImageProps {
	plantId: number;
	imageId: number;
	isActive: boolean
	changeImage: () => void;
}

const SmallImage = ({ plantId, imageId, isActive, changeImage }: SmallImageProps) => {
	return (
		<TouchableOpacity
			style={smallImageStyle.container}
			onPress={() => changeImage()}
		>
			<Image 
				source={{ uri: obtainUri(plantId, imageId) }}
				defaultSource={require(defaultImagePath)}
				resizeMode='stretch'
				style={[smallImageStyle.image, isActive && smallImageStyle.activedImage]}
			/>
		</TouchableOpacity>
	);
}

const smallImageStyle = StyleSheet.create({
	container: {
		height: 60,
	},
	image: {
		height: '100%',
	},
	activedImage: {
		opacity: .6,
		borderRadius: 1,
		borderColor: Colors.green.darker,
		borderWidth: 3,
	},
});

const styles = StyleSheet.create({
	containerImage: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		height: 280
	}
});
