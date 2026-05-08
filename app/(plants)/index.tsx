import { router } from 'expo-router';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Loading } from '@/components/Loading';
import { Colors } from '@/constants/theme';
import { axiosInstance } from '@/services/api';
import { plantService } from '@/services/plant';
import { PlantCardResponse } from '@/types/plantsTypes';
import { FontAwesome } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';

export default function IndexScreen() {
	const { data: pagePlantCards, isPending, error } = useQuery({
    queryKey: ['plantCards'],
    queryFn: () => plantService.getPaginatedPlantCards(),
  });

	if (isPending) return <Loading />

	if (error) return (
    <View>
      <Text style={{ color: 'red' }}>
        An error has occurred: {error.message}
      </Text>
    </View>
  );

	return (
		<View style={styles.container}>
			<FlatList
				data={pagePlantCards.content}
				keyExtractor={plantCard => plantCard.id.toString()}
				renderItem={({ item: plantCardResponse }) => <PlantCard plantCard={plantCardResponse} />}
				columnWrapperStyle={{ justifyContent: 'space-evenly' }}
				contentContainerStyle={styles.listContainer}
				numColumns={2}
			/>
			<View style={styles.pageButtonsContainer}>
				<TouchableOpacity onPress={() => console.log('first page')}>
					<MaterialIcons style={styles.pageButton} name='first-page' size={20} />
				</TouchableOpacity>
				
				<TouchableOpacity onPress={() => console.log('before')}>
					<MaterialIcons style={styles.pageButton} name='navigate-before' size={20} />
				</TouchableOpacity>

				<Text style={{ fontSize: 20 }}>6</Text>

				<TouchableOpacity onPress={() => console.log('after')}>
					<MaterialIcons style={styles.pageButton} name='navigate-next' size={20} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => console.log('last')}>
					<MaterialIcons style={styles.pageButton} name='last-page' size={20} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

interface PlantCardProps {
	plantCard: PlantCardResponse;
};

const urlSelectedImage = (plantId: number, selectedImageId: number) =>
	`${axiosInstance.defaults.baseURL}/plants/${plantId}/images/${selectedImageId}`;

const PlantCard = ({ plantCard }: PlantCardProps) => (
	<TouchableOpacity
		style={styles.cardContainer}
		onPress={() => router.push({
			pathname: '/[id]',
			params: { id: plantCard.id.toString() },
		})}
	>
		<ImageBackground
			source={{ uri: urlSelectedImage(plantCard.id, plantCard.selected_image_id) }}
			defaultSource={require('@/assets/images/default_image.png')}
			style={styles.image}
		>
			{plantCard.is_favorite && (
				<FontAwesome
					name='star'
					size={16}
					color='#EBE53B'
					style={{
						backgroundColor: Colors.green.darker,
						alignSelf: 'flex-end',
						borderRadius: 50,
						padding: 4,
						margin: 2,
					}}
				/>
			)}
		</ImageBackground>
		<Text numberOfLines={1} style={styles.commonName}>{plantCard.common_name}</Text>
		<Text numberOfLines={1} style={styles.scientificName}>{plantCard.scientific_name}</Text>
		<Text style={styles.price}>Bs. {plantCard.price}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: '.5rem',
		padding: 8,
	},
	listContainer: {
		gap: 12,
	},
	cardContainer: {
		width: '45%',
		backgroundColor: Colors.green.lighter,
		borderRadius: 6,
		padding: 6,
	},
	image: {
		width: '100%',
		height: 150,
		borderRadius: 6,
		marginBottom: 6,
	},
	commonName: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	scientificName: {
		fontSize: 12,
		color: 'gray',
		fontStyle: 'italic',
		fontWeight: 'bold',
	},
	price: {
		fontSize: 14,
		color: Colors.green.darker,
		fontWeight: '600',
	},
	pageButtonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '1rem',
	},
	pageButton: {
		backgroundColor: Colors.green.darker,
		color: Colors.green.lighter,
		paddingVertical: 4,
		paddingHorizontal: 6,
		borderRadius: 5,
	},
});
