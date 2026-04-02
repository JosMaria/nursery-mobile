import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { catalogService, PlantCardResponse } from '@/services/catalog';
import { useQuery } from '@tanstack/react-query';

export default function HomeScreen() {
  const { data: plantCards, isPending, error } = useQuery({
    queryKey: ['plantCards'],
    queryFn: () => catalogService.fetchPlantCards()
  });

  if (isPending) return (
    <View>
      <ActivityIndicator size="large" color="#0D5302" />
      <Text>Loading...</Text>
    </View>
  )
  
  if (error) return (
    <View>
      <Text style={{ color: 'red' }}>
        An error has occurred: {error.message}
      </Text>
    </View>
  )
  return (
    <View style={styles.container}>  
      <FlatList
        data={plantCards}
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
  <View style={styles.cardContainer}>
    <Image
      source={{ uri: `http://192.168.100.53:8080/api/v1/plants/${plant.id}/images`}}
      style={styles.image}
    />
    <Text numberOfLines={1} style={styles.commonName}>{plant.common_name}</Text>
    <Text numberOfLines={1} style={styles.scientificName}>{plant.scientific_name}</Text>
    <Text style={styles.price}>Bs. {plant.price}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a3b18a',
  },
  listContainer: {
    gap: 16
  },
  cardContainer: {
    width: '45%',
    backgroundColor: '#dad7cd',
    borderRadius: 6,
    padding: 6
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 6,
    marginBottom: 6
  },
  commonName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  scientificName: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  price: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600'
  },
});
