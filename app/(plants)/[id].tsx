import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

import { Loading } from '@/components/Loading';
import { DOMAIN } from '@/constants/enviroment';
import { catalogService } from '@/services/catalog';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
			const uri = `${DOMAIN}/api/v1/plants/${plantId}/images?image_name=${filename}`;
			changeUriImage(uri);
		}
	}, [isSuccess]);
	
	if (isPending) return <Loading />

	if (error) return (
		<View style={{}}>
			<ActivityIndicator color='#344e41' />
			<Text>error load Plant layout</Text>
		</View>
	);

	return (
		<View style={{ gap: 5 }}>
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
					resizeMode='stretch'
					style={{
						flex: 1,
						height: 'auto',
						borderRadius: 10,
						borderColor: '#344e41',
						borderWidth: 4
					}}
				/>
			</View>
			<View style={{ backgroundColor: 'white' }}>
				<SectionDate updatedAt={plantDetails.updated_at} />
			</View>
		</View>
	);
}

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
					backgroundColor: '#e9edc9', 
					width: 40, 
					height: 40, 
					borderRadius: '50%'
				}}>
					<FontAwesome5 name="calendar-alt" color="black" size={24}  />
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
	filename: string;
	changeUriImage: (uri: string) => void;
	activedUri: string | undefined;
}

const SmallImage: React.FC<SmallImageProps> = ({ plantId, filename, changeUriImage, activedUri }) => {
	const uri = `${DOMAIN}/api/v1/plants/${plantId}/images?image_name=${filename}`;
	return (
		<TouchableOpacity onPress={() => changeUriImage(uri)}
			style={{ height: 60 }}>
			<Image 
				source={{ uri }}
				defaultSource={require(defaultImagePath)}
				resizeMode='stretch'
				style={[{ height: '100%' }, activedUri === uri && {
					opacity: 0.8,
					borderRadius: 1,
					borderColor: '#344e41',
					borderWidth: 3
				}]}
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
		height: 280
	}
});
