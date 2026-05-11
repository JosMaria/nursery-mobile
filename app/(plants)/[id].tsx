import { useLocalSearchParams } from 'expo-router';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
	FlatList, Image, StyleSheet, Text, TouchableOpacity, View
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

interface SelectedImageContextType {
	plantId: number;
	imageId: number;
	changeImageId: (newImageId: number) => void;
}

const SelectedImageContext = createContext({} as SelectedImageContextType);

interface SelectedImageProviderProps {
	children: ReactNode;
	plantId: number;
	imageId: number;
}

const SelectedImageProvider = ({ plantId, imageId, children }: SelectedImageProviderProps) => {
	const [selectedImageId, setSelectedImageId] = useState(imageId);

	const value: SelectedImageContextType = {
		plantId,
		imageId: selectedImageId,
		changeImageId: (newSelectedImageId: number) => setSelectedImageId(newSelectedImageId),
	}

	return (
		<SelectedImageContext.Provider value={value}>
			{children}
		</SelectedImageContext.Provider>
	);
}

export default function PlantLayout() {
	const { id } = useLocalSearchParams();
	const plantId = parsedPlantId(id);

	const { data: plantDetails, isPending, error, isSuccess } = useQuery({
		queryKey: ['plantDetails', plantId],
		queryFn: () => catalogService.getPlantDetailsById(plantId),
	});

	return (
		<View style={plantLayoutStyles.container}>
			{isPending && <Loading />}
			{error && (
				<View>
					<Text>error obtain plant details used react query</Text>
				</View>
			)}
			{isSuccess && (
				<View style={{ gap: 5 }}>
					<Images plantId={plantId} imageIds={plantDetails.image_ids} />
					<View style={{ backgroundColor: 'white' }}>
						<SectionDate updatedAt={plantDetails.updated_at} />
					</View>
				</View>
			)}
		</View>
	);
}

interface ImagesProps {
	plantId: number;
	imageIds: number[];
}

const Images = ({ plantId, imageIds }: ImagesProps) => {
	const currentSelectedImageId = imageIds.length === 0 ? 0 : imageIds[0];
	return (
		<View style={imagesStyles.containerImage}>
			<SelectedImageProvider plantId={plantId} imageId={currentSelectedImageId}>
				<FlatList
					data={imageIds}
					style={{ maxWidth: 60 }}
					keyExtractor={image_id => image_id.toString()} 
					contentContainerStyle={{
						justifyContent: 'center',
						gap: 5,
						height: '100%',
					}}
					renderItem={({ item: imageId }) => (
						<SmallImage imageId={imageId} />
					)}
					/>
				<MainImage />
			</SelectedImageProvider>
		</View>
	);
}

const imagesStyles = StyleSheet.create({
	containerImage: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		height: 280
	}
});

const plantLayoutStyles = StyleSheet.create({
	container: {
		padding: 8,
	}
});

const MainImage = () => {
	const { imageId, plantId } = useContext(SelectedImageContext);
	return (
		<Image
			source={imageId ? { uri: obtainUri(plantId, imageId) } : require(defaultImagePath)}
			defaultSource={require(defaultImagePath)}
			resizeMode='stretch'
			style={mainImageStyle.image}
		/>
	);
}

const mainImageStyle = StyleSheet.create({
	image: {
		flex: 1,
		height: 'auto',
		borderRadius: 4,
		borderColor: Colors.green.darker,
		borderWidth: 4,
	},
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
	imageId: number;
}

const SmallImage = ({ imageId }: SmallImageProps) => {
	const { plantId, imageId: selectedImageId, changeImageId } = useContext(SelectedImageContext);
	const isActive = selectedImageId === imageId;

	return (
		<TouchableOpacity style={smallImageStyle.container} onPress={() => changeImageId(imageId)}>
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
