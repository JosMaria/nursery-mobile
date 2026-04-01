import { catalogService } from '@/services/catalog';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  console.log("esta ahora mismo")
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
    <View style={styles.centerContainer}>
      <Text style={{ color: 'red' }}>
        An error has occurred: {error.message} Cause: {error.stack}
      </Text>
    </View>
  )
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      <View style={styles.plantCardsContainer}>
        {plantCards.map(plantCard => 
          <View key={plantCard.id} style={styles.cardContainer}>
            <Image
              source={{ uri: `http://192.168.70.167:8080/api/v1/plants/${plantCard.id}/images`}}
              style={styles.image}
            />
            <Text style={styles.commonName}>{plantCard.common_name}</Text>
            <Text style={styles.scientificName}>{plantCard.scientific_name}</Text>
            <Text style={styles.price}>{plantCard.price}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cardContainer: {
    width: '48%',              // ~50% menos un pequeño margen
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    padding: 12, 
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    
    marginBottom: 10,
  },
  commonName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
  },
  plantCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '1em'
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
