import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import { ApiConfig } from '@/constants/enviroment';
import { Colors } from '@/constants/theme';
import { FontAwesome } from '@expo/vector-icons';

interface ImageInfo {
	imageId: number;
	filename: string;
	plantId: number;
	isSelected: boolean;
};

const imageInfos: ImageInfo[] = [
	{
		imageId: 1,
		filename: '1d7ba99e-e7ae-4b13-8a3c-803ecd24c15a.png',
		plantId: 1,
		isSelected: false,
	},
	{
		imageId: 2,
		filename: '1f4d319e-847c-4e37-8b94-1669270ca01c.png',
		plantId: 1,
		isSelected: false,
	},
	{
		imageId: 3,
		filename: 'eec48e90-c038-4b05-85c2-db4ed6f9932c.png',
		plantId: 1,
		isSelected: true,
	},
	{
		imageId: 4,
		filename: '879d4779-6706-4b60-8591-3f9bd8329364.png',
		plantId: 1,
		isSelected: false,
	},
];

const buildImageUrl = (plantId: number, filename: string) => `${ApiConfig.domain}/api/v1/plants/${plantId}/images?image_name=${filename}`;

export default function Information() {
	const scientificName = 'Anthurium andraeanum';

	return (
		<View style={{ flex: 1, padding: 8 }}>
			<Text style={{ fontWeight: '700' }}>Nombre cientifico:{' '}
				<Text style={{ fontStyle: 'italic', fontWeight: '400' }}>{scientificName}</Text>
			</Text>
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
				keyExtractor={(imageInfo) => imageInfo.imageId.toString()}
				data={imageInfos}
				renderItem={({ item: { plantId, filename, isSelected } }) => (
					<View style={{  }}>
						<ImageBackground
							source={{ uri: buildImageUrl(plantId, filename) }}
							defaultSource={require('@/assets/images/default_image.png')}
						 	imageStyle={{ borderRadius: 10 }} style={{ width: 160, height: 160, padding: 4 }}
						>
							<TouchableOpacity style={{ alignSelf: 'flex-end', backgroundColor: Colors.green.darker, padding: 4, borderRadius: 100 }} onPress={() => console.log('you pressed')}>
								<FontAwesome name={isSelected ? 'star' : 'star-o'} size={20} color='#EBE53B' />
							</TouchableOpacity>
						</ImageBackground>
					</View>
				)}
			/>
			<TouchableOpacity style={{ borderRadius: 4, backgroundColor: Colors.green.darker, paddingHorizontal: 14, paddingVertical: 8, alignSelf: 'center' }}>
				<Text style={{ color: Colors.green.lighter, fontSize: 16, fontWeight: '500' }}>Guardar Cambios</Text>
			</TouchableOpacity>
		</View>
	);
}
