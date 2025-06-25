// screens/GameUploader.tsx
import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

const sampleGames = [
  {
    id: "330684",
    title: "Nightmare Kart: The Old Karts",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co9d8y.jpg"
  },
  {
    id: "177310",
    title: "The Undying Beast",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co5hwv.jpg"
  },
  {
    id: "43460",
    title: "Sengoku Anthology",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/bvbun2zofisapzrjlk71.jpg"
  },
  {
    id: "282079",
    title: "Rockman X: New Year 2023",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co7lie.jpg"
  },
  {
    id: "63844",
    title: "Ace wo Nerae!",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co2kux.jpg"
  },
  {
    id: "338541",
    title: "Mario Kart Tour: Vancouver Tour",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co9mk2.jpg"
  },
  {
    id: "157761",
    title: "Microsoft Flight Simulator X: Steam Edition - Cessna C208B Grand Caravan",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co85tp.jpg"
  },
  {
    id: "335661",
    title: "Everlasting Tower",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co9jbc.jpg"
  },
  {
    id: "347317",
    title: "Cat Cosmic Puzzle",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co9z6c.jpg"
  },
  {
    id: "2329",
    title: "Mario Party 3",
    cover_url: "https://images.igdb.com/igdb/image/upload/t_thumb/co21yu.jpg"
  }
];

export default function GameUploader() {
  const uploadGames = async () => {
    const { data, error } = await supabase.from('Games').insert(sampleGames);

    if (error) {
      Alert.alert("Hata", error.message);
    } else {
      Alert.alert("Başarılı", "Oyunlar eklendi!");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>IGDB Oyunlarını Yükle</Text>
      <Button title="Oyunları Supabase'e Ekle" onPress={uploadGames} />
    </View>
  );
}
