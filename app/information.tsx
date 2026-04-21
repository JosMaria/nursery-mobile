import { useEffect, useState } from 'react';
import {
	FlatList, ImageBackground, Text, TouchableOpacity, View
} from 'react-native';

import { Loading } from '@/components/Loading';
import { ApiConfig } from '@/constants/enviroment';
import { Colors } from '@/constants/theme';
import { plantService } from '@/services/plant';
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

const buildImageUrl = (plantId: number, filename: string) => `${ApiConfig.domain}/api/v1/plants/${plantId}/images?image_name=${filename}`;

export default function Information() {
	const plantId = 3;
	const [valuesImageId, setValuesImageId] = useState<{ initialValue: number; currentValue: number }>({ initialValue: 0, currentValue: 0 });

	const { data: plantImages, isLoading, error, isSuccess } = useQuery({
		queryKey: ['plantImages'],
		queryFn: () => plantService.fetchImagesToSelection(plantId),
	});

	const changeSelectedImage = (imageIdToSelect: number) => {
		if (valuesImageId.currentValue !== imageIdToSelect) {
			setValuesImageId(prev => ({ ...prev, currentValue: imageIdToSelect }));
		}
	}

	const canChangeSelectedImage = () => valuesImageId.initialValue !== valuesImageId.currentValue;

	useEffect(() => {
		if (isSuccess) {
			const selectedImage = plantImages.find(({ is_selected }) => is_selected);
			if (selectedImage) {
				setValuesImageId({
					initialValue: selectedImage.image_id,
					currentValue: selectedImage.image_id,
				});
			}
		}
	}, [isSuccess]);

	if (isLoading) return <Loading />

	if (error) return <View><Text>{error.message}</Text></View>

	return (
		<View style={{ flex: 1, padding: 8 }}>
			<FlatList
				contentContainerStyle={{
					flex: 1,
					justifyContent: 'center',
					rowGap: 20,
				}}
				columnWrapperStyle={{
					justifyContent: 'space-evenly',
					columnGap: 10,
				}}
				numColumns={2}
				keyExtractor={({ image_id: imageId }) => imageId.toString()}
				data={plantImages}
				renderItem={({ item: { filename, image_id: imageId } }) => (
					<ImageToSelect
						imageUrl={buildImageUrl(plantId, filename)}
						imageId={imageId}
						isSelected={valuesImageId.currentValue === imageId}
						changeSelectedImage={() => changeSelectedImage(imageId)}
					/>
				)}
			/>
			<TouchableOpacity
				style={{
					alignSelf: 'center',
					borderRadius: 4,
					backgroundColor: Colors.green.darker,
					width: 100,
					paddingVertical: 8,
				}}
				disabled={!canChangeSelectedImage()}
				onPress={() => {
					console.log("it's enabled")
				}}
			>
				{/* <ActivityIndicator color={Colors.green.lighter} /> */}

				<Text
					style={{
						color: Colors.green.lighter,
						fontSize: 16,
						fontWeight: '500',
						textAlign: 'center',
						opacity: canChangeSelectedImage() ? 1 : 0.5,
					}}
				>
					Guardar
				</Text>
			</TouchableOpacity>
		</View>
	);
}

interface ImageToSelectProps {
	imageUrl: string;
	imageId: number;
	isSelected: boolean;
	changeSelectedImage: (imageId: number) => void;
};

const ImageToSelect: React.FC<ImageToSelectProps> = ({ imageUrl, imageId, isSelected, changeSelectedImage }) => (
	<ImageBackground
		source={{ uri: imageUrl }}
		defaultSource={require('@/assets/images/default_image.png')}
		imageStyle={{ borderRadius: 10 }}
		style={{ width: 160, height: 160, padding: 4 }}
	>
		<TouchableOpacity
			style={{
				alignSelf: 'flex-end',
				backgroundColor: Colors.green.darker,
				padding: 6,
				borderRadius: 100,
			}}
			onPress={() => changeSelectedImage(imageId)}
		>
			<FontAwesome name={isSelected ? 'star' : 'star-o'} size={24} color='#EBE53B' />
		</TouchableOpacity>
	</ImageBackground>
);
