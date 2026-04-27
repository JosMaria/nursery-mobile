import { router } from 'expo-router';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Loading } from '@/components/Loading';
import { Colors } from '@/constants/theme';
import { axiosInstance } from '@/services/api';
import { catalogService } from '@/services/catalog';
import { PlantCardResponse } from '@/services/types';
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

export default function IndexScreen() {
	const { data: plantCards, isPending, error } = useQuery({
    queryKey: ['plantCards'],
    queryFn: () => catalogService.getPlantCards()
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
		<View style={[styles.container]}>
			<FlatList
				data={plantCards.content}
				keyExtractor={(plantCard) => plantCard.id.toString()}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: 'space-evenly' }}
				contentContainerStyle={styles.listContainer}
				renderItem={({ item: plantCardResponse }) => <PlantCard plant={plantCardResponse} />}
			/>
		</View>
	);
}

interface PlantCardProps {
	plant: PlantCardResponse
}

const PlantCard = ({ plant }: PlantCardProps) => (
	<TouchableOpacity style={styles.cardContainer} onPress={() => router.push({
		pathname: '/[id]',
		params: { id: plant.id.toString() }
	})}>
		<ImageBackground
			source={{ uri: `${axiosInstance.defaults.baseURL}/plants/${plant.id}/images/selected` }}
			defaultSource={require('@/assets/images/default_image.png')}
			style={styles.image}
		>
			{plant.is_favorite && (
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
		<Text numberOfLines={1} style={styles.commonName}>{plant.common_name}</Text>
		<Text numberOfLines={1} style={styles.scientificName}>{plant.scientific_name}</Text>
		<Text style={styles.price}>Bs. {plant.price}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
});
