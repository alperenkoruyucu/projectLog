import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

interface Game {
  id: string;
  title: string;
  cover_url?: string;
  description?: string; 
}

export default function GameDetailScreen() {
  const route = useRoute<RouteProp<{ params: { game: Game } }, 'params'>>();
  const { game } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {game.cover_url && (
        <Image
          source={{ uri: game.cover_url }}
          style={styles.cover}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.description}>{game.description || 'Açıklama bulunamadı.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', backgroundColor: '#fff' },
  cover: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  description: { fontSize: 16, color: '#333' },
});
